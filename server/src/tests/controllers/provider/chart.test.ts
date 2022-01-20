import request from "supertest";
import app from "../../../app";
import jwt from "jsonwebtoken";
import { clearDb } from "../../db";
import { createProvider } from "../../factories/provider";
import { Provider } from "../../../models/provider";
import { Patient } from "../../../models/patient";
import { createPatient } from "../../factories/patient";
import Medication from "../../../models/chart/medication";
import { createMedication } from "../../factories/medication";
import Allergy from "../../../models/chart/allergy";
import { createAllergy } from "../../factories/allergy";
import { createEmergencyContact } from "../../factories/emergency_contant";
import { createAddress } from "../../factories/address";
import {createIntakeResponse} from "../../factories/intake";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

describe("Chart Controller", () => {
  let provider: Provider, patient: Patient, patient2: Patient, token: string;

  beforeAll(async () => {
    await clearDb();
    provider = await createProvider();
    patient = await createPatient();
    patient2 = await createPatient();
    token = jwt.sign({ id: provider.userId }, JWT_SECRET);
  });

  describe("updatePatientChart", () => {
    it("should update allergies and medications", async () => {
      await request(app)
        .put(`/api/provider/patient/${patient2.id}/chart`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          allergies: [
            {
              name: "lactose",
              reaction: "milky",
              severity: "low",
            },
          ],
          medications: [
            {
              name: "chart med",
              dosage: "200mg",
              frequency: "12h",
              active: true,
            },
          ],
        })
        .expect(200);
      const updatedPatient = await Patient.query()
        .withGraphFetched("[allergies,medications]")
        .findById(patient2.id);
      expect(updatedPatient.medications[0]).toEqual(
        expect.objectContaining({
          name: "chart med",
          dosage: "200mg",
          frequency: "12h",
          active: true,
        })
      );
      expect(updatedPatient.allergies[0]).toEqual(
        expect.objectContaining({
          name: "lactose",
          reaction: "milky",
          severity: "low",
        })
      );
    });
  });

  describe("getPatientChart", () => {
    it("should create a valid note template with parameters", async () => {
      await createIntakeResponse({ patientId: patient2.id });
      const { body } = await request(app)
        .get(`/api/provider/patient/${patient2.id}/chart`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(body.success).toEqual(true);
      expect(body.name).toEqual("Max Muller");
      expect(body.gender).toEqual("Female");
      expect(body.adminNote).toEqual("none");
      expect(body.intakePhqScore).toEqual(12);
      expect(body.intakeGadScore).toEqual(130);
      expect(body.medications.length).toEqual(1);
      expect(body.allergies.length).toEqual(1);
    });
  });

  describe("addMedication", () => {
    it("should create a new medication for the patient", async () => {
      const { body } = await request(app)
        .post(`/api/provider/patient/${patient.id}/medications`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "med 1",
          dosage: "2mg",
          frequency: "9h",
          active: false,
        })
        .expect(200);
      const medication = await Medication.query().findById(body.id);
      expect(medication.name).toEqual("med 1");
      expect(medication.dosage).toEqual("2mg");
      expect(medication.frequency).toEqual("9h");
      expect(medication.active).toEqual(false);
      expect(medication.patientId).toEqual(patient.id);
    });
  });

  describe("getMedications", () => {
    it("should return a list of patient medication", async () => {
      await createMedication({
        patientId: patient.id,
      });
      const { body } = await request(app)
        .get(`/api/provider/patient/${patient.id}/medications`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(body.medications.length).toEqual(2);
      expect(body.medications[0].patientId).toEqual(patient.id);
      expect(body.medications[1].patientId).toEqual(patient.id);
    });
  });

  describe("updateMedications", () => {
    it("should update a patient's medication", async () => {
      const medication = await Medication.query()
        .where({ patientId: patient.id })
        .first();
      const { body } = await request(app)
        .put(`/api/provider/patient/${patient.id}/medications/${medication.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Rivotril",
          homeMedication: false,
          dosage: "50mg",
          frequency: "40h",
          active: false,
        })
        .expect(200);
      const updatedMedication = await Medication.query().findById(
        medication.id
      );
      expect(updatedMedication.name).toEqual("Rivotril");
      expect(updatedMedication.homeMedication).toEqual(false);
      expect(updatedMedication.dosage).toEqual("50mg");
      expect(updatedMedication.frequency).toEqual("40h");
      expect(updatedMedication.active).toEqual(false);
    });
  });

  describe("addAllergy", () => {
    it("should add an allergy to the patient", async () => {
      const { body } = await request(app)
        .post(`/api/provider/patient/${patient.id}/allergies`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "cough",
          reaction: "bad",
          severity: "highest",
        })
        .expect(200);
      const allergy = await Allergy.query().findById(body.id);
      expect(allergy.name).toEqual("cough");
      expect(allergy.reaction).toEqual("bad");
      expect(allergy.severity).toEqual("highest");
    });
  });

  describe("getAllergies", () => {
    it("should return a list of patient's allergies", async () => {
      await createAllergy({
        patientId: patient.id,
      });
      const { body } = await request(app)
        .get(`/api/provider/patient/${patient.id}/allergies`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(body.allergies.length).toEqual(2);
      expect(body.allergies[0].patientId).toEqual(patient.id);
      expect(body.allergies[1].patientId).toEqual(patient.id);
    });
  });

  describe("updateAllergy", () => {
    it("should update a patient's allergies", async () => {
      const allergy = await Allergy.query()
        .where({ patientId: patient.id })
        .first();
      await request(app)
        .put(`/api/provider/patient/${patient.id}/allergies/${allergy.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "rash",
          reaction: "ugly",
          severity: "high",
        })
        .expect(200);
      const updatedAllergy = await Allergy.query().findById(allergy.id);
      expect(updatedAllergy.name).toEqual("rash");
      expect(updatedAllergy.reaction).toEqual("ugly");
      expect(updatedAllergy.severity).toEqual("high");
    });
  });

  describe("getPatientInfo", () => {
    it("should return patient address and emergency contact", async () => {
      const patientInfo = await createPatient();
      await createEmergencyContact({
        patientId: patientInfo.id,
      });
      await createAddress({ userId: patientInfo.userId });
      const { body } = await request(app)
        .get(`/api/provider/patient/${patientInfo.id}/info`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(body.emergencyContact.firstName).toEqual("Aguinaldo");
      expect(body.emergencyContact.lastName).toEqual("Faccio");
      expect(body.emergencyContact.relationship).toEqual("Father");
      expect(body.emergencyContact.phoneNumber).toEqual("305673820349");
      expect(body.address.streetAddress).toEqual("2201 Biscayne blvs");
    });
  });
});
