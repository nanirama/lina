import request from "supertest";
import app from "../../app";
import { clearDb } from "../db";
import { createUser } from "../factories/user";
import { AccountType, User } from "../../models/user";
import jwt from "jsonwebtoken";
import {checkPassword, hashPassword} from "../../logic/auth";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

describe("User Controller", () => {
  let token: string, userId: number;
  beforeAll(async () => {
    await clearDb();
    const user = await createUser({
      accountType: AccountType.PROVIDER,
      email: "provider@email.com",
      password: await hashPassword("1234"),
    });
    userId = user.id;
    await createUser({
      accountType: AccountType.PROVIDER,
      email: "provider2@email.com",
    });
    token = jwt.sign({ id: user.id }, JWT_SECRET);
  });

  describe("Update email", () => {
    it("should prevent duplicate email", async () => {
      await request(app)
        .post(`/api/provider/update_email`)
        .set("Authorization", `Bearer ${token}`)
        .send({ email: "provider2@email.com" })
        .expect(400);
    });

    it("should update the provider email correctly", async () => {
      await request(app)
        .post(`/api/provider/update_email`)
        .set("Authorization", `Bearer ${token}`)
        .send({ email: "newprovider@email.com" })
        .expect(200);
      const user = await User.query().findById(userId);
      expect(user.email).toEqual("newprovider@email.com");
    });
  });

  describe("Update Phone", () => {
    it("should update the provider phone correctly", async () => {
      await request(app)
        .post(`/api/provider/update_phone`)
        .set("Authorization", `Bearer ${token}`)
        .send({ phone: "3053638883" })
        .expect(200);
      const user = await User.query().findById(userId);
      expect(user.phone).toEqual("3053638883");
    });
  });

  describe("Update Password", () => {
    it("should throw error on wrong password", async () => {
      await request(app)
        .post(`/api/provider/update_password`)
        .set("Authorization", `Bearer ${token}`)
        .send({ currentPassword: "5555" })
        .expect(400);
    });

    it("should update user password", async () => {
      await request(app)
        .post(`/api/provider/update_password`)
        .set("Authorization", `Bearer ${token}`)
        .send({ currentPassword: "1234", newPassword: "5555" })
        .expect(200);
      const user = await User.query().findById(userId);
      const check = await checkPassword("5555", user.password);
      expect(check).toEqual(true);
    });
  });
});
