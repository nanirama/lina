import request from "supertest";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  authenticatePatient,
  authenticateProvider,
  authenticateRetool,
  authenticateSuperuser,
  authenticateUser,
} from "../../middleware/jwt_auth";
import { createUser } from "../factories/user";
import { clearDb } from "../db";
import { AccountType, User } from "../../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

const successResponse = async (req: Request, res: Response) => {
  res.json({ success: true });
};

const generateApp = (router: express.Router) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(router);
  return app;
};

describe("Jwt Auth", () => {
  let patient: User, provider: User, superuser: User, admin: User;

  beforeAll(async () => {
    await clearDb();
    patient = await createUser({
      accountType: AccountType.PATIENT,
      email: "patient@email.com",
    });
    provider = await createUser({
      accountType: AccountType.PROVIDER,
      email: "provider@email.com",
    });
    admin = await createUser({
      accountType: AccountType.ADMIN,
      email: "admin@email.com",
    });
    superuser = await createUser({
      accountType: AccountType.SUPERUSER,
      email: "superuser@email.com",
    });
  });

  describe("Authenticate patient", () => {
    const routerPatient = express.Router();
    routerPatient.use(authenticatePatient);
    routerPatient.get("/patient", successResponse);
    const app = generateApp(routerPatient);

    it("should prevent unauthenticated user", async () => {
      await request(app).get("/patient").expect(401);
    });

    it("should prevent unauthorized user", async () => {
      const token = jwt.sign({ id: admin.id }, JWT_SECRET);
      await request(app)
        .get("/patient")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
    });

    it("should allow authorized patient", async () => {
      const token = jwt.sign({ id: patient.id }, JWT_SECRET);
      await request(app)
        .get("/patient")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  describe("Authenticate provider", () => {
    const routerProvider = express.Router();
    routerProvider.use(authenticateProvider);
    routerProvider.get("/provider", successResponse);
    const app = generateApp(routerProvider);

    it("should prevent unauthenticated user", async () => {
      await request(app).get("/provider").expect(401);
    });

    it("should prevent unauthorized user", async () => {
      const token = jwt.sign(
        { id: patient.id },
        JWT_SECRET
      );
      await request(app)
        .get("/provider")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
    });

    it("should %p allow authorized provider", async () => {
      const token = jwt.sign(
        { id: provider.id },
        JWT_SECRET
      );
      await request(app)
        .get("/provider")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  describe("Authenticate superuser", () => {
    const routerSuperuser = express.Router();
    routerSuperuser.use(authenticateSuperuser);
    routerSuperuser.get("/superuser", successResponse);
    const app = generateApp(routerSuperuser);

    it("should prevent unauthenticated user", async () => {
      await request(app).get("/superuser").expect(401);
    });

    it("should prevent unauthorized user", async () => {
      const token = jwt.sign({ id: admin.id }, JWT_SECRET);
      await request(app)
        .get("/superuser")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
    });

    it("should allow authorized superuser", async () => {
      const token = jwt.sign(
        { id: superuser.id },
        JWT_SECRET
      );
      await request(app)
        .get("/superuser")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  describe("Authenticate user", () => {
    const routerUser = express.Router();
    routerUser.use(authenticateUser);
    routerUser.get("/user", successResponse);
    const app = generateApp(routerUser);

    it("should prevent unauthenticated user", async () => {
      await request(app).get("/user").expect(401);
    });

    it("should allow authorized user", async () => {
      const token = jwt.sign(
        { id: patient.id },
        JWT_SECRET
      );
      await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  describe("Authenticate retool", () => {
    const routerRetool = express.Router();
    routerRetool.use(authenticateRetool);
    routerRetool.get("/retool", successResponse);
    const app = generateApp(routerRetool);

    it("should prevent unauthenticated user", async () => {
      await request(app).get("/retool").expect(401);
    });

    it("should prevent unauthorized user", async () => {
      const token = jwt.sign(
        { id: admin.id },
        JWT_SECRET
      );
      await request(app)
        .get("/retool")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
    });

    it("should allow authorized retool admin", async () => {
      const token = jwt.sign(
        { id: admin.id, adminType: "retool" },
        JWT_SECRET
      );
      await request(app)
        .get("/retool")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });
});
