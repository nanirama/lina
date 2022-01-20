import request from "supertest";
import app from "../../../app";
import jwt from "jsonwebtoken";
import { clearDb } from "../../db";
import { createProvider } from "../../factories/provider";
import { createPatient } from "../../factories/patient";
import { Provider } from "../../../models/provider";
import { Patient } from "../../../models/patient";
import { Note } from "../../../models/note";
import { createNote } from "../../factories/note";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

describe("Notes Controller", () => {
  let provider: Provider,
    patient: Patient,
    patient2: Patient,
    otherNote: Note,
    token: string;

  beforeAll(async () => {
    await clearDb();
    provider = await createProvider();
    patient = await createPatient();

    const provider2 = await createProvider();
    patient2 = await createPatient();
    otherNote = await createNote({
      providerId: provider2.id,
      patientId: patient2.id,
    });
    token = jwt.sign({ id: provider.userId }, JWT_SECRET);
  });

  describe("createNote", () => {
    it("should create a valid note with parameters", async () => {
      const response = await request(app)
        .post(`/api/provider/patient/${patient.id}/notes`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      const note = await Note.query().findById(response.body.noteId);
      expect(note.providerId).toEqual(provider.id);
      expect(note.patientId).toEqual(patient.id);
      expect(note.editable).toEqual(false);
    });
  });

  describe("updateNote", () => {
    it("should update some of the note's fields", async () => {
      const note = await Note.query()
        .where({ providerId: provider.id })
        .first();
      await request(app)
        .post(`/api/provider/notes/${note.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          data: {
            content: "take more meds",
          },
        })
        .expect(200);
      const updatedNote = await Note.query().findById(note.id);
      expect(updatedNote.data.content).toEqual("take more meds");
    });

    it("should lock a note", async () => {
      const note = await Note.query()
        .where({ providerId: provider.id })
        .first();
      await request(app)
        .post(`/api/provider/notes/${note.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          lock: true,
          data: {
            content: "take more meds again",
          },
        })
        .expect(200);
      const updatedNote = await Note.query().findById(note.id);
      expect(updatedNote.data.content).toEqual("take more meds again");
      expect(updatedNote.locked).toEqual(true);
      expect(updatedNote.lockTime).not.toBeNull();
    });

    it("should prevent a note update from another provider", async () => {
      await request(app)
        .post(`/api/provider/notes/${otherNote.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          data: {
            content: "forbidden",
          },
        })
        .expect(403);
    });
  });

  describe("getNote", () => {
    it("should return details of a specific note", async () => {
      const note = await Note.query()
        .where({ providerId: provider.id })
        .first();
      const response = await request(app)
        .get(`/api/provider/notes/${note.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.providerId).toEqual(provider.id);
      expect(response.body.patientId).toEqual(patient.id);
      expect(response.body.editable).toEqual(false);
    });

    it("should throw not found on fetch note from another provider", async () => {
      await request(app)
        .get(`/api/provider/notes/${otherNote.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("getNotes", () => {
    it("should return a list of notes for the provider", async () => {
      await createNote({
        providerId: provider.id,
        patientId: patient2.id,
        data: {
          content: "list note",
        },
      });
      const { body } = await request(app)
        .get(`/api/provider/patient/${patient2.id}/notes`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(body.notes.length).toEqual(1);
      expect(body.notes[0].data.content).toEqual("list note");
    });
  });
});
