import request from "supertest";
import app from "../../../app";
import jwt from "jsonwebtoken";
import { clearDb } from "../../db";
import { createProvider } from "../../factories/provider";
import { Provider } from "../../../models/provider";
import { NoteTemplate } from "../../../models/note_template";
import { createNoteTemplate } from "../../factories/note_template";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

describe("Templates Controller", () => {
  let provider: Provider, token: string, otherTemplate: NoteTemplate;

  beforeAll(async () => {
    await clearDb();
    provider = await createProvider();

    // For sanity check, should not return on fetches
    const provider2 = await createProvider();
    otherTemplate = await createNoteTemplate({ providerId: provider2.id });
    token = jwt.sign({ id: provider.userId }, JWT_SECRET);
  });

  describe("createTemplate", () => {
    it("should create a valid note template with parameters", async () => {
      const response = await request(app)
        .post(`/api/provider/templates`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "template 1", value: "value 1" })
        .expect(200);
      const template = await NoteTemplate.query().findById(response.body.id);
      expect(template.name).toEqual("template 1");
      expect(template.value).toEqual("value 1");
    });

    it("should throw an error in case of empty value", async () => {
      await request(app)
        .post(`/api/provider/templates`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "template 1", value: "" })
        .expect(400);
    });
  });

  describe("updateTemplate", () => {
    it("should update the template's fields", async () => {
      const template = await NoteTemplate.query()
        .where({ providerId: provider.id })
        .first();
      await request(app)
        .put(`/api/provider/templates/${template.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "template updated", value: "value updated" })
        .expect(200);
      const updatedTemplate = await NoteTemplate.query().findById(template.id);
      expect(updatedTemplate.name).toEqual("template updated");
      expect(updatedTemplate.value).toEqual("value updated");
    });

    it("should throw not found error in case of wrong id", async () => {
      await request(app)
        .put(`/api/provider/templates/9999`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "template updated", value: "value updated" })
        .expect(404);
    });

    it("should prevent a template update from another provider", async () => {
      await request(app)
        .put(`/api/provider/templates/${otherTemplate.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "template updated", value: "value updated" })
        .expect(403);
    });
  });

  describe("getTemplates", () => {
    it("should return a list of provider templates", async () => {
      await createNoteTemplate({
        providerId: provider.id,
        name: "template 2",
        value: "value 2",
      });
      const { body } = await request(app)
        .get(`/api/provider/templates`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(body.results.length).toEqual(2);
      expect(body.results[0].providerId).toEqual(provider.id);
      expect(body.results[1].providerId).toEqual(provider.id);
    });
  });
});
