/**
 * Logic for the user messaging components
 */
import { Message } from "../models/messaging/message";
import { ThreadParticipant } from "../models/messaging/participant";
import { Thread, ThreadType } from "../models/messaging/thread";
import { Patient } from "../models/patient";
import { User } from "../models/user";
import { getProviderForPatient } from "./patient";
import { format } from "date-fns";
import { ForbiddenError } from "../utils/errors";
import { sendPatientPortalMessageNotification } from "./notifications";

/**
 *
 * @param thread Thread model
 * @param user User model
 * @returns whether the user is a valid participant in the thread
 */
const isParticipant = (thread: Thread, user: User) => {
  return thread.participants.find((p) => p.userId === user.id) !== undefined;
};

/**
 *
 * Updates the last read time for a user on a thread
 */
const updateReadTime = async (thread: Thread, user: User) => {
  await ThreadParticipant.query()
    .where({
      threadId: thread.id,
      userId: user.id,
    })
    .patch({ lastRead: new Date() });
};

/**
 *
 * Notify all conversation participants that `user` sent a message
 */
const notifyParticipants = async (thread: Thread, fromUser: User) => {
  const participants = await ThreadParticipant.query().where({
    threadId: thread.id,
  });
  participants.map((p) => {
    if (p.userId !== fromUser.id) {
      User.query()
        .findById(p.userId)
        .then((toUser) => {
          sendPatientPortalMessageNotification(toUser, fromUser);
        });
    }
  });
};

/**
 *
 * returns number of unread messages for the user on a thread.
 * Note: this is one of the few instances that raw SQL is used
 * in the codebase. Knex will still sanitize inputs, and `user.id`
 * is provided by the server.
 */
export const getUnreadMessageCountForUser = async (
  user: User
): Promise<number> => {
  const knex = ThreadParticipant.knex();
  const res = await knex.raw(
    `SELECT count(*) from thread_participants
    join messages on thread_participants.thread_id = messages.thread_id
    where user_id = ${user.id} and (last_read is null or last_read < messages.created_at)`
  );
  return res.rows[0].count;
};

export const getThreadsForUser = async (user: User) => {
  return Thread.query()
    .joinRelated({ participants: true })
    .where("participants.userId", user.id)
    .withGraphFetched({ messages: { sender: true }, participants: true })
    .orderBy("updatedAt");
};

export const getThread = async (user: User, threadId: string) => {
  const thread = await Thread.query()
    .findById(threadId)
    .withGraphFetched({ messages: { sender: true }, participants: true });
  if (!isParticipant(thread, user)) {
    throw new ForbiddenError("Invalid thread for user");
  }
  updateReadTime(thread, user);
  return thread;
};

export const createMessage = async (
  user: User,
  threadId: number,
  content: string
) => {
  const thread = await Thread.query()
    .findById(threadId)
    .withGraphFetched({ participants: true })
    .first();
  const senderId = user.id;
  if (!isParticipant(thread, user)) {
    throw new ForbiddenError("Invalid thread for user");
  }
  updateReadTime(thread, user);
  notifyParticipants(thread, user);
  return Message.query()
    .insert({ threadId: thread.id, content, senderId })
    .returning("*");
};

const createThread = async (
  threadType: ThreadType,
  subject: string,
  participantIds: Array<number>
) => {
  const participants = participantIds.map((userId) => ({
    userId,
  }));
  return Thread.query()
    .insertGraph({
      threadType,
      subject,
      participants,
    })
    .returning("*");
};

/**
 *
 * @param user Patient creating the thread
 * @param threadType treatment question, refill request, etc
 * @param content The content of the first message
 */
export const patientCreateThread = async (
  user: User,
  threadType: ThreadType,
  content: string
) => {
  const patient = user?.patient as Patient;
  // If it's a medical question, get the provider and start a new thread
  const provider = await getProviderForPatient(patient);
  let subject = "";
  const formattedDate = format(new Date(), "MM/dd/yyyy");
  if (threadType === "TREATMENT_QUESTION") {
    subject = `Treatment Question - ${formattedDate}`;
  } else if (threadType === "PRESCRIPTION_REFILL") {
    subject = `Prescription Refill - ${formattedDate}`;
  } else {
    subject = `Question - ${formattedDate}`;
  }
  const thread = await createThread(threadType, subject, [
    patient.userId,
    provider.userId,
  ]);
  await createMessage(user, thread.id, content);
  updateReadTime(thread, user);
  notifyParticipants(thread, user);
  return thread;
};
