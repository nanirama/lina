/**
 * Basic example of an integration test.
 * Tests the waitlist feature on the backend
 */
import request from "supertest";
import app from "../../app";
import { clearDb } from "../db";

describe("Waitlist Controller", () => {
  beforeAll(() => {
    return clearDb();
  });

  it("should add to the waitlist", async () => {
    await request(app)
      .post("/api/join_waitlist")
      .send({ email: "patient@gmail.com", state: "TX" })
      .expect(200);
  });

  it("should require both an email and a state", async () => {
    await request(app)
      .post("/api/join_waitlist")
      .send({ email: "patient@gmail.com" })
      .expect(400);

    await request(app)
      .post("/api/join_waitlist")
      .send({ state: "tx" })
      .expect(400);
  });
});
