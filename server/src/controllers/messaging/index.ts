/**
 * All messaging related controllers. Note that these controllers can be
 * used by all user types (patient, provider, etc).
 */
import { Request, Response } from "express";
import {
  createMessage,
  getThread as getThreadLogic,
  getThreadsForUser,
  getUnreadMessageCountForUser,
  patientCreateThread,
} from "../../logic/messages";
import { Thread, Inbox, SendMessageResponse } from "../../lib/api_types";
import { Thread as ThreadModel } from "../../models/messaging/thread";
import { ThreadParticipant } from "../../models/messaging/participant";
import { User } from "../../models/user";
import { BadRequestError } from "../../utils/errors";
import { Patient } from "../../models/patient";

const toBase64 = (s: string) => Buffer.from(s).toString("base64");

const threadToResponse = async (
  thread: ThreadModel,
  user: User
): Promise<Thread> => {
  const other = thread.messages.find((m) => m.sender.id !== user.id);
  const otherSender = other?.sender;
  const otherParticipant = thread.participants.find(
    (p) => p.userId !== user.id
  ) as ThreadParticipant;

  // TODO(sbb): Do this in SQL
  const userParticipant = thread.participants.find(
    (p) => p.userId === user.id
  ) as ThreadParticipant;
  const unreadMessages = thread.messages
    .map((m) => (m.createdAt > userParticipant?.lastRead ? 1 : 0))
    .reduce((a, b) => a + b, 0 as number);

  const previewMessage = thread.messages.reduce((prev, current) =>
    prev.createdAt > current.createdAt ? prev : current
  );
  const isProvider = user.accountType === "PROVIDER";
  let patientId = "";
  if (isProvider) {
    patientId = await Patient.query()
      .where({ userId: otherParticipant.userId })
      .first()
      .then((p) => p.id);
  }
  const lastMessageTime = Math.max(
    ...thread.messages.map((m) => m.createdAt.getTime())
  );
  return {
    id: thread.id + "",
    subject: thread.subject,
    unreadMessages,
    title: isProvider
      ? `${otherSender?.firstName} ${otherSender?.lastName} - ${thread.subject}`
      : thread.subject,
    messagePreview: previewMessage.content,
    patientId,
    lastMessageTime,
    messages: thread.messages.map((m) => ({
      id: toBase64(`${m.id}`),
      content: m.content,
      timestamp: m.createdAt.getTime(),
      inbound: m.sender.id !== user.id,
      sender: {
        id: m.senderId + "",
        displayName:
          m.senderId === user.id
            ? "You"
            : `${m.sender.firstName} ${m.sender.lastName}`,
      },
    })),
  };
};

export const getMessages = async (req: Request, res: Response<Inbox>) => {
  const threads = await getThreadsForUser(req.context.user);
  const threadResponse = await Promise.all(
    threads.map((t) => threadToResponse(t, req.context.user))
  );
  threadResponse.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
  const hasUnreadMessages = threadResponse.some((t) => t.unreadMessages > 0);
  const inbox = {
    threads: threadResponse,
    hasUnreadMessages,
  };
  res.json(inbox);
};

export const getUnreadMessageCount = async (req: Request, res: Response) => {
  const unreadMessages = await getUnreadMessageCountForUser(req.context.user);
  res.json({ unreadMessages });
};

export const getThread = async (req: Request, res: Response<Thread>) => {
  const thread = await getThreadLogic(req.context.user, req.params.threadId);
  const response = await threadToResponse(thread, req.context.user);
  res.json(response);
};

export const sendMessage = async (
  req: Request,
  res: Response<SendMessageResponse>
) => {
  const { content } = req.body;
  if (!content) {
    throw new BadRequestError("Must provide message content");
  }
  const msg = await createMessage(
    req.context.user,
    parseInt(req.params.threadId),
    content
  );
  res.json({ id: msg.id });
};

export const createThread = async (req: Request, res: Response) => {
  // TODO(sbb): Should change this to allow doctors / ops to initiate threads
  if (req.context.user.accountType !== "PATIENT") {
    throw new BadRequestError("Invalid request");
  }
  const { content, threadType } = req.body;
  const thread = await patientCreateThread(
    req.context.user,
    threadType,
    content
  );
  res.json({ success: true, threadId: thread.id });
};
