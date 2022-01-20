import request from "supertest";
import app from "../../app";
import { clearDb } from "../db";
import { createProvider } from "../factories/provider";
import jwt from "jsonwebtoken";
import { createPatient } from "../factories/patient";
import { Patient } from "../../models/patient";
import { Provider } from "../../models/provider";
import { Thread } from "../../models/messaging/thread";
import { ProviderPatientMap } from "../../models/provider_patient_map";
import { format } from "date-fns";
import { Message } from "../../models/messaging/message";
import { expect } from "@jest/globals";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

describe("Messaging Controller", () => {
  let patient: Patient, provider: Provider;
  let token: string, tokenProvider: string;
  beforeAll(async () => {
    await clearDb();
    patient = await createPatient();
    provider = await createProvider();
    await ProviderPatientMap.query()
      .insert({
        patientId: patient.id,
        providerId: provider.id,
      })
      .returning("*");
    token = jwt.sign({ id: patient.userId }, JWT_SECRET);
    tokenProvider = jwt.sign({ id: provider.userId }, JWT_SECRET);
  });

  describe("createThread", () => {
    it("should only allow patient to create a thread", async () => {
      await request(app)
        .post(`/api/create_thread`)
        .set("Authorization", `Bearer ${tokenProvider}`)
        .send({ content: "Hello world", threadType: "TREATMENT_QUESTION" })
        .expect(400);
    });

    it("should create a thread successfully", async () => {
      const resp = await request(app)
        .post(`/api/create_thread`)
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Hello world", threadType: "TREATMENT_QUESTION" });
      const thread = await Thread.query()
        .withGraphFetched({ participants: true, messages: true })
        .findById(resp.body.threadId);
      expect(thread.threadType).toEqual("TREATMENT_QUESTION");
      const dateFormatted = format(new Date(), "MM/dd/yyyy");
      expect(thread.subject).toEqual(`Treatment Question - ${dateFormatted}`);
      expect(thread.participants.length).toEqual(2);
      const participants = [
        thread.participants[0].userId + "",
        thread.participants[1].userId + "",
      ];
      expect(participants).toContain(patient.userId);
      expect(participants).toContain(provider.userId);
      expect(thread.messages.length).toEqual(1);
      expect(thread.messages[0].content).toEqual("Hello world");
      expect(thread.messages[0].senderId).toEqual(patient.userId);
    });
  });

  describe("getThread", () => {
    it("should return a thread to the provider with one unread message", async () => {
      const thread = await Thread.query().first();
      const { body } = await request(app)
        .get(`/api/thread/${thread.id}`)
        .set("Authorization", `Bearer ${tokenProvider}`)
        .expect(200);
      expect(body.messagePreview).toEqual("Hello world");
      expect(body.unreadMessages).toEqual(1);
      expect(body.messages.length).toEqual(1);
      const dateFormatted = format(new Date(), "MM/dd/yyyy");
      expect(body.title).toEqual(
        `Max Muller - Treatment Question - ${dateFormatted}`
      );
    });
  });

  describe("sendMessage", () => {
    it("should reject empty content", async () => {
      const thread = await Thread.query().first();
      await request(app)
        .post(`/api/thread/${thread.id}`)
        .set("Authorization", `Bearer ${tokenProvider}`)
        .send({ content: "" })
        .expect(400);
    });

    it("should post a new message", async () => {
      const thread = await Thread.query().first();
      const { body } = await request(app)
        .post(`/api/thread/${thread.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "Hello everyone" })
        .expect(200);
      const message = await Message.query().findById(body.id);
      expect(message.content).toEqual("Hello everyone");
      expect(message.threadId).toEqual(thread.id + "");
      expect(message.senderId).toEqual(patient.userId);
    });
  });

  describe("getMessages", () => {
    it("should return threads and unread messages", async () => {
      const { body } = await request(app)
        .get(`/api/messages`)
        .set("Authorization", `Bearer ${tokenProvider}`)
        .expect(200);
      expect(body.hasUnreadMessages).toEqual(true);
      expect(body.threads.length).toEqual(1);
    });
  });

  describe("getUnreadMessageCount", () => {
    it("should return number of unread messages", async () => {
      const { body } = await request(app)
        .get(`/api/messages/unread`)
        .set("Authorization", `Bearer ${tokenProvider}`)
        .expect(200);
      expect(body.unreadMessages).toEqual("1");
    });
  });
});
