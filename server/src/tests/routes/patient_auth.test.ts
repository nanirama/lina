import request from "supertest";
import * as sinon from "sinon";
import * as twillio from "../../lib/twilio";
import * as assessment from "../../logic/assessment/index";
import app from "../../app";
import { clearDb } from "../db";
import { createIntake } from "../../logic/intake";
import { IntakeResponse } from "../../models/intake";
import { User } from "../../models/user";

describe("Patient Auth Controller", () => {
  let intake: IntakeResponse,
    twillioStub: sinon.SinonStub,
    assessmentStub: sinon.SinonStub;

  beforeAll(async () => {
    await clearDb();
    intake = await createIntake([]);
    twillioStub = sinon.stub(twillio, "formatPhone").resolves("(305) 364-9302");
    assessmentStub = sinon.stub(assessment, "createAssessmentRecord");
  });

  afterAll(async () => {
    twillioStub.restore();
    assessmentStub.restore();
  });

  it("Should create a patient with correct birthdate regardless of timezone offset", async () => {
    const response = await request(app)
      .post("/api/signup")
      .send({
        birthdate: "1990-02-01T00:00:00.000Z",
        email: "henrique.rusca+3@email.com",
        firstName: "Henrique",
        intakeId: intake.id,
        lastName: "Moraes",
        password: "Henrique123",
        phone: "(305) 364-9302",
        residenceState: "",
        timezone: "Asia/Samarkand",
      })
      .expect(200);
    expect(response.body.email).toEqual("henrique.rusca+3@email.com");
    const user = await User.query().findOne({
      email: "henrique.rusca+3@email.com",
    });
    expect(user.phone).toEqual("(305) 364-9302");
    expect(user.birthdate.toLocaleDateString("en-US")).toEqual("2/1/1990");
  });
});
