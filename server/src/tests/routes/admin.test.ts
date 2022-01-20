import request from "supertest";
import app from "../../app";
import { clearDb } from "../db";
import { signAdminToken, verifyToken } from "../../logic/auth";
import { createUser } from "../factories/user";
import { AccountType, User } from "../../models/user";

describe("Admin Routes", () => {
  let provider: User;

  beforeAll(async () => {
    await clearDb();
    provider = await createUser({
      accountType: AccountType.PROVIDER,
      email: "provider-admin-routes@email.com",
    });
  });

  describe("/providers/:providerId/token", () => {
    it("should prevent unauthenticated user", async () => {
      await request(app)
        .post(`/api/admin/providers/${provider.id}/token`)
        .expect(401);
    });

    it("should generate a token for a valid authenticated user", async () => {
      const token = signAdminToken("retool", 1200);
      await request(app)
        .post(`/api/admin/providers/${provider.id}/token`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect(async (response) => {
          const content = await verifyToken(response.body.token);
          expect(content.id).toEqual(provider.id);
        });
    });
  });
});
