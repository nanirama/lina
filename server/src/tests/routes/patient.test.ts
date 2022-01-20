import request from "supertest";
import app from "../../app";

describe("Patient", () => {
  const check = async (req: request.Test) => {
    await req.set("authorization", `Bearer bad_token`).send({}).expect(403);
  };
  const checkWithoutHeader = async (req: request.Test) => {
    await req.send({}).expect(401);
  };
  const g = (endpoint: string) => ({
    e: `/${endpoint}`,
    r: request(app).post(`/api/patient/${endpoint}`),
  });
  const postEndpoints = [
    "update_address",
    "update_phone",
    "update_email",
    "update_birthdate",
    "consent",
    "emergency_contact",
    "update_intake",
    "onboarding_complete",
    "pharmacy",
    "update_pcp",
    "upodate_therapist",
  ];
  const cases = [
    ...postEndpoints.map(g),
    { e: "me", r: request(app).get("/api/patient/me") },
  ];
  describe("403's", () => {
    test.each(cases)(
      "Should return 403 when user is unauthenticated for $e",
      async ({ e, r }) => {
        await check(r);
      }
    );
  });
  describe("401's", () => {
    test.each(cases)(
      "Should return 401 when called without auth header for $e",
      async ({ e, r }) => {
        await checkWithoutHeader(r);
      }
    );
  });
});
