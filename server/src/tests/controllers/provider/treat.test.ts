process.env.TREAT_CLIENT_ID = "some client id";
process.env.TREAT_CLIENT_SECRET = "some client secret";
process.env.TREAT_BASE_URL = "https://treat.com";

import request from "supertest";
import app from "../../../app";
import sinon from "sinon";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import { clearDb } from "../../db";
import { createProvider } from "../../factories/provider";
import { Provider } from "../../../models/provider";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

describe("Treat Controller", () => {
  let provider: Provider, token: string, stub: sinon.SinonStub;

  beforeAll(async () => {
    await clearDb();
    provider = await createProvider();
    token = jwt.sign({ id: provider.userId }, JWT_SECRET);
  });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stub = sinon.stub(fetch, "Promise").resolves({
      ok: true,
      json: () => ({
        refreshToken: { tokenString: "refresh token" },
        accessToken: { tokenString: "access token" },
      }),
    });
  });

  afterEach(() => {
    stub.restore();
  });

  describe("treatLogin", () => {
    it("should return auth credentials and update refresh token", async () => {
      const response = await request(app)
        .post(`/api/provider/treat_auth`)
        .set("Authorization", `Bearer ${token}`)
        .send({ authCode: "some auth" })
        .expect(200);
      const updatedProvider = await Provider.query().findById(provider.id);
      expect(updatedProvider.treatRefreshToken).toEqual("refresh token");
      expect(response.body.authToken).toEqual("access token");
      expect(stub.calledOnce).toBe(true);
    });
  });

  describe("getToken", () => {
    it("should return the auth token", async () => {
      const response = await request(app)
        .get(`/api/provider/treat_token`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.authToken).toEqual("access token");
    });

    it("should return not found in case of no refresh token", async () => {
      await provider.$query().patch({ treatRefreshToken: null });
      await request(app)
        .get(`/api/provider/treat_token`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });
});
