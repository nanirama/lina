import request from "supertest";
import * as sinon from "sinon";
import * as twillio from "../../../lib/twilio";
import * as assessment from "../../../logic/assessment";
import app from "../../../app";
import { createIntake } from "../../../logic/intake";
import { IntakeResponse, QuestionResponse } from "../../../models/intake";
import { createPatient, createProvider } from "../../../logic/registration";
import { User } from "../../../models/user";
import { login } from "../../../logic/auth";
import { updateAddress } from "../../../logic/address";
import * as lob from "../../../lib/lob";
import Address from "../../../models/address";
import { omit } from "lodash";
import { clearDb } from "../../db";
import { SinonSandbox } from "sinon";
import * as sendgrid from "../../../lib/sendgrid";
import * as notification from "../../../logic/notifications";
import * as asyncNotification from "../../../async/notifications";
import * as treatApi from "../../../lib/treat";
import { updateBirthdate } from "../../../logic/user";
import { EmergencyContact } from "../../../models/emergency_contact";
import Medication from "../../../models/chart/medication";
import Allergy from "../../../models/chart/allergy";
import { Provider } from "../../../models/provider";
import { createSlots } from "../../../logic/provider";
import {
  bookAppointment,
  updateAppointmentStatus,
} from "../../../logic/appointments";
import { Patient } from "../../../models/patient";
import { Appointment } from "../../../models/appointment";
import { ExternalProvider } from "../../../models/external_provider";
import { format, subYears } from "date-fns";

describe("Patient Controller", () => {
  let intake: IntakeResponse, sandbox: SinonSandbox, user: User, token: string;

  beforeAll(async () => {
    sandbox = sinon.createSandbox();
    await clearDb();
  });

  beforeEach(async () => {
    await seedUser();
  });

  afterEach(async () => {
    await clearDb();
    sandbox.restore();
  });

  describe("getProfile", () => {
    beforeEach(async () => {
      const appointment = await seedAppointment();
      await updateAppointmentStatus(appointment.id, "COMPLETED");
      const userRecord = await userPatientRecord();
      await Patient.query()
        .where({ id: userRecord.patient?.id })
        .patch({ subscriptionStatus: "ACTIVE" });
    });

    it("Should return a patient's profile", async () => {
      const response = await request(app)
        .get("/api/patient/me")
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.phone).toEqual(user.phone);
      expect(response.body.email).toEqual(user.email);
      expect(response.body.address).toEqual(
        expect.objectContaining({
          streetAddress: "1078 Elm Drive",
          unitNumber: "123",
          city: "New York",
          state: "New York",
          zip: "10013",
        })
      );
      expect(response.body.hasCompletedFirstAppointment).toBeTruthy();
      expect(response.body.subscriptionStatus).toBe("ACTIVE");
    });
  });

  describe("updateAddress", () => {
    beforeEach(() => {
      sandbox.restore();
      sandbox.stub(lob, "verifyAddress").resolves(newAddress);
    });

    const endpoint = "/api/patient/update_address";
    const newAddress = {
      streetAddress: "2278 Progress Way",
      unitNumber: "456",
      city: "New York",
      state: "New York",
      zip: "10001",
    };

    it("Should update address", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(newAddress)
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const address = await Address.query()
        .where({
          userId: user.id,
        })
        .first();
      expect(address).toEqual(expect.objectContaining(newAddress));
    });

    it("Should return 400 when streetAddress is invalid", async () => {
      await testBadAddressInput(
        omit(newAddress, "streetAddress"),
        "Street address is required"
      );
    });

    it("Should return 400 when city is invalid", async () => {
      await testBadAddressInput(omit(newAddress, "city"), "City is required");
    });

    it("Should return 400 when state is invalid", async () => {
      await testBadAddressInput(omit(newAddress, "state"), "State is required");
    });

    it("Should return 400 when zip is invalid", async () => {
      await testBadAddressInput(
        omit(newAddress, "zip"),
        "Zip code is required"
      );
    });

    const testBadAddressInput = async (
      address: Record<string, string>,
      errorMessage: string
    ) => {
      const record = await Address.query()
        .where({
          userId: user.id,
        })
        .first();
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(address)
        .expect(400);
      const recordAfter = await Address.query()
        .where({
          userId: user.id,
        })
        .first();
      expect(response.body.status).toEqual("error");
      expect(response.body.error).toEqual(errorMessage);
      expect(record).toStrictEqual(recordAfter);
    };
  });

  describe("updateEmail", () => {
    const endpoint = "/api/patient/update_email";
    const newEmail = { email: "fibi@mail.com" };

    it("Should update email", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(newEmail)
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const email = await User.query()
        .select("email")
        .where({
          id: user.id,
        })
        .first();
      expect(email).toEqual(newEmail);
    });

    it("Should return 400 when email is invalid", async () => {
      const email = await User.query()
        .select("email")
        .where({
          id: user.id,
        })
        .first();
      await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({ email: "not@email" })
        .expect(400);
      const emailAfter = await User.query()
        .select("email")
        .where({
          id: user.id,
        })
        .first();
      expect(email).toStrictEqual(emailAfter);
    });
  });

  describe("updatePhone", () => {
    const newPhone = { phone: "(718) 462 2344" };
    const endpoint = "/api/patient/update_phone";

    beforeEach(() => {
      sandbox.restore();
      sandbox.stub(twillio, "formatPhone").resolves(newPhone.phone);
    });

    it("Should update patient's phone", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(newPhone)
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const phone = await User.query()
        .select("phone")
        .where({
          id: user.id,
        })
        .first();
      expect(phone).toEqual(newPhone);
    });

    it("Should return 400 when phone is invalid", async () => {
      const phone = await User.query()
        .select("phone")
        .where({
          id: user.id,
        })
        .first();
      await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({ phone: "abcdef" })
        .expect(400);
      const phoneAfter = await User.query()
        .select("phone")
        .where({
          id: user.id,
        })
        .first();
      expect(phone).toEqual(phoneAfter);
    });
  });

  describe("updateBirthdate", () => {
    const newBirthdate = { birthdate: "1996-01-31" };
    const endpoint = "/api/patient/update_birthdate";

    it("Should update birthdate when user doesn't have a birthdate", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(newBirthdate)
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const result = await User.query()
        .select("birthdate")
        .where({
          id: user.id,
        })
        .first();
      expect(format(result.birthdate, "yyyy-MM-dd")).toEqual(
        newBirthdate.birthdate
      );
    });

    it("Should not update birthdate when user has a birthdate", async () => {
      await updateBirthdate(
        user,
        new Date(newBirthdate.birthdate).toISOString()
      );
      const result = await User.query()
        .select("birthdate")
        .where({
          id: user.id,
        })
        .first();
      await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(newBirthdate)
        .expect(400);
      const resultAfter = await User.query()
        .select("birthdate")
        .where({
          id: user.id,
        })
        .first();
      expect(result.birthdate).toEqual(resultAfter.birthdate);
    });

    it("Should return 400 when birthdate is invalid", async () => {
      await testBadBirthdate("not_birthdate", "Birthdate is not valid");
    });

    it("Should return 400 when birthdate is less than 18 years", async () => {
      await testBadBirthdate(
        subYears(new Date(), 17).toISOString(),
        "Birthdate must be greater than 18 years"
      );
    });

    const testBadBirthdate = async (date: string, errorMessage: string) => {
      const result = await User.query()
        .select("birthdate")
        .where({
          id: user.id,
        })
        .first();
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({ birthdate: date })
        .expect(400);
      expect(response.body.status).toEqual("error");
      expect(response.body.error).toEqual(errorMessage);
      const resultAfter = await User.query()
        .select("birthdate")
        .where({
          id: user.id,
        })
        .first();
      expect(result.birthdate).toEqual(resultAfter.birthdate);
    };
  });

  describe("consent", () => {
    const endpoint = "/api/patient/consent";
    it("Should return 200", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send()
        .expect(200);
      expect(response.body.success).toBeTruthy();
    });
  });

  describe("emergencyContact", () => {
    const endpoint = "/api/patient/emergency_contact";
    const newContact = {
      firstName: "Nikola",
      lastName: "Tesla",
      relationship: "FAMILY",
      phoneNumber: "(305) 365-9302",
    };

    it("Should update emergency contact", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(newContact)
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const userRecord = await userPatientRecord();
      const emergencyContactRecord = await EmergencyContact.query()
        .where({
          patientId: userRecord.patient?.id,
        })
        .first();
      expect(emergencyContactRecord).toEqual(
        expect.objectContaining(newContact)
      );
    });

    it("Should return 400 when emergency contact's first name is invalid", async () => {
      await testInvalidEmergencyContact(
        {
          ...newContact,
          firstName: undefined,
        },
        "firstName is required"
      );
    });

    it("Should return 400 when emergency contact's last name is invalid", async () => {
      await testInvalidEmergencyContact(
        { ...newContact, lastName: undefined },
        "lastName is required"
      );
    });

    it("Should return 400 when emergency contact's relationship is invalid", async () => {
      await testInvalidEmergencyContact(
        {
          ...newContact,
          relationship: undefined,
        },
        "relationship is required"
      );
    });

    it("Should return 400 when emergency contact's phone number is invalid", async () => {
      sandbox.restore();
      sandbox.stub(twillio, "formatPhone").resolves(undefined);
      await testInvalidEmergencyContact(
        { ...newContact, phoneNumber: undefined },
        "phoneNumber is required"
      );
      await testInvalidEmergencyContact(
        { ...newContact, phoneNumber: "222" },
        "Please provide a valid phone number."
      );
    });

    const testInvalidEmergencyContact = async (
      contact: Record<string, string | undefined>,
      errorMessage: string
    ) => {
      const userRecord = await userPatientRecord();
      const record = await EmergencyContact.query().where({
        patientId: userRecord.patient?.id,
      });
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(contact)
        .expect(400);
      expect(response.body.status).toEqual("error");
      expect(response.body.error).toEqual(errorMessage);
      const recordAfter = await EmergencyContact.query().where({
        patientId: userRecord.patient?.id,
      });
      expect(record).toEqual(recordAfter);
    };
  });

  describe("updateIntakeResponse", () => {
    const endpoint = "/api/patient/update_intake";
    const answers: Array<QuestionResponse> = [
      {
        question: {
          question_type: "FREEFORM_MULTIPLE",
          key: "medications",
          content:
            "Do you take any medicines, vitamins, or dietary supplements?",
          noneDesc: "I am not taking any",
        },
        answer: [
          { content: "Codeine", key: "" },
          { content: "Ibuprofen", key: "" },
        ],
      },
      {
        question: {
          question_type: "FREEFORM_MULTIPLE",
          key: "allergies",
          content: "Do you have any allergies?",
          noneDesc: "I have no allergies",
        },
        answer: [{ content: "None", key: "none" }],
      },
      {
        question: {
          question_type: "FREEFORM_MULTIPLE",
          key: "previous_mental_health_conditions",
          content:
            "What mental health conditions have you been diagnosed with or received treatment for, if any?",
          noneDesc: "Have not been diagnosed",
        },
        answer: [{ content: "Dementia", key: "" }],
      },
      {
        question: {
          question_type: "MULTIPLE_CHOICE",
          key: "heart_conditions",
          content:
            "Do you currently have any heart conditions or taking any medication to treat high blood pressure?",
        },
        answer: [{ content: "Yes", key: "yes" }],
      },
    ];

    it("Should update intake", async () => {
      sandbox.stub(assessment, "updateInitialAssessment");
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({ answers })
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const user = await userPatientRecord();
      const medicationRecords = await Medication.query().select().where({
        patientId: user.patient?.id,
      });
      const medications = medicationRecords.map(
        (medication) => medication.name
      );
      expect(medications).toEqual(
        expect.arrayContaining(["Codeine", "Ibuprofen"])
      );
      const allergyRecord = await Allergy.query()
        .select()
        .where({
          patientId: user.patient?.id,
        })
        .first();
      expect(allergyRecord).toBeUndefined();
      const intakeRecord = await IntakeResponse.query().where({
        patientId: user.patient?.id,
      });
      expect(intakeRecord[0].response.followUp).toEqual(
        expect.arrayContaining(answers)
      );
    });

    it("Should return 400 when answers is invalid", async () => {
      const userRecord = await userPatientRecord();
      const intakeRecord = await IntakeResponse.query().where({
        patientId: userRecord.patient?.id,
      });
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({ answers: 1 })
        .expect(400);
      expect(response.body.status).toEqual("error");
      expect(response.body.error).toEqual("answers is invalid");
      const response2 = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({
          answers: [
            { question: "something", answer: "something else" },
            { question: "abcd", ans: "" },
          ],
        })
        .expect(400);
      expect(response2.body.status).toEqual("error");
      expect(response2.body.error).toEqual("answers is invalid");
      const intakeRecordAfter = await IntakeResponse.query().where({
        patientId: userRecord.patient?.id,
      });
      expect(intakeRecord).toEqual(intakeRecordAfter);
    });
  });

  describe("onboardingCompelete", () => {
    const endpoint = "/api/patient/onboarding_complete";
    beforeEach(async () => {
      await seedAppointment();
    });

    it("Should work", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({})
        .expect(200);
      const user = await userPatientRecord();
      const appointment = await Appointment.query()
        .select()
        .where({
          patientId: user.patient?.id,
        })
        .first();
      expect(response.body.success).toBeTruthy();
      expect(appointment.treatEncounterId).toEqual("encounter_test_id");
    });
  });

  describe("updatePharmacyPreference", () => {
    const endpoint = "/api/patient/pharmacy";
    const newPharmacy = { pharmacyId: "sample_pharmacy_id_123456" };
    it("Should update pharmacy preferences", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(newPharmacy)
        .expect(200);
      const patientRecord = await Patient.query()
        .select()
        .where({
          user_id: user.id,
        })
        .first();
      expect(response.body.success).toBeTruthy();
      expect(patientRecord.treatPharmacyId).toEqual(newPharmacy.pharmacyId);
    });

    it("Should return 400 when pharmacyId is invalid", async () => {
      const record = await Patient.query()
        .select()
        .where({
          user_id: user.id,
        })
        .first();
      await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send({ pharmacyId: -123 })
        .expect(400);
      const recordAfter = await Patient.query()
        .select()
        .where({
          user_id: user.id,
        })
        .first();
      expect(record).toEqual(recordAfter);
    });
  });

  describe("setPrimaryCarePhysician", () => {
    const endpoint = "/api/patient/update_pcp";
    const pcp = {
      name: "Yixiu Zheng",
      phone: "(371) 132 132",
      allowSharing: true,
    };

    it("Should add external provider as PCP", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(pcp)
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const user = await userPatientRecord();
      const externalProvider = await ExternalProvider.query()
        .select("name", "phone", "practitioner_type")
        .where({
          patientId: user.patient?.id,
        })
        .first();
      expect(externalProvider.name).toEqual(pcp.name);
      expect(externalProvider.phone).toEqual(pcp.phone);
      expect(externalProvider.practitionerType).toEqual("PCP");
      expect(user.patient?.sharePcp).toBeTruthy();
    });
    it("Should return 400 when name is not provided", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(omit(pcp, "name"))
        .expect(400);
      expect(response.body.status).toEqual("error");
      expect(response.body.error).toEqual(
        "Primary care physician name is required"
      );
    });
  });

  describe("setExternalTherapist", () => {
    const endpoint = "/api/patient/update_therapist";
    const pcp = {
      name: "Stephany Young",
      phone: "(330) 730 0082",
      allowSharing: true,
    };

    it("Should add external provider as THERAPIST", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(pcp)
        .expect(200);
      expect(response.body.success).toBeTruthy();
      const user = await userPatientRecord();
      const externalProvider = await ExternalProvider.query()
        .select("name", "phone", "practitioner_type")
        .where({
          patientId: user.patient?.id,
        })
        .first();
      expect(externalProvider.name).toEqual(pcp.name);
      expect(externalProvider.phone).toEqual(pcp.phone);
      expect(externalProvider.practitionerType).toEqual("THERAPIST");
      expect(user.patient?.shareTherapist).toBeTruthy();
    });
    it("Should return 400 when name is not provided", async () => {
      const response = await request(app)
        .post(endpoint)
        .set("authorization", `Bearer ${token}`)
        .send(omit(pcp, "name"))
        .expect(400);
      expect(response.body.status).toEqual("error");
      expect(response.body.error).toEqual("Therapist name is required");
    });
  });

  const seedUser = async () => {
    sandbox.stub(sendgrid, "addToMailingList");
    sandbox.stub(twillio, "formatPhone").resolves("(305) 365-9302");
    sandbox.stub(assessment, "createAssessmentRecord");
    sandbox.stub(lob, "verifyAddress").resolves({
      streetAddress: "1078 Elm Drive",
      unitNumber: "123",
      city: "New York",
      state: "New York",
      zip: "10013",
    });
    intake = await createIntake([]);
    user = await createPatient(
      {
        email: "john.doe5@email.com",
        firstName: "John",
        lastName: "Doe",
        password: "123Doe*",
        phone: "(305) 365-9302",
        timezone: "Asia/Samarkand",
      },
      intake.id,
      "New York"
    );
    token = await login("john.doe5@email.com", "123Doe*");
    await updateAddress(user, {
      streetAddress: "1078 Elm Drive",
      unitNumber: "123",
      city: "New York",
      state: "New York",
      zip: "10013",
    });
  };

  const seedAppointment = async () => {
    sandbox.restore();
    sandbox.stub(treatApi, "createPatient").resolves({ uid: 123456789 });
    sandbox.stub(treatApi, "createEncounter").resolves("encounter_test_id");
    sandbox.stub(twillio, "formatPhone").resolves("(123) 456 789");
    sandbox.stub(notification);
    sandbox.stub(asyncNotification, "queueAppointmentReminders");
    await updateBirthdate(user, new Date(1999, 1, 1).toISOString());
    await createProvider(
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "provider@mail.com",
        password: "1234567",
        phone: "(123) 456 789",
      },
      {
        title: "test provider",
      },
      ["New York"]
    );
    const provider = await Provider.query().select().first();
    const timeSlotId = await createSlots(provider, [
      {
        date: new Date(),
        slotStart: 2000,
        slotEnd: 1000,
      },
    ]);
    const patient = await Patient.query().first();
    return await bookAppointment(user, patient, timeSlotId[0].id);
  };

  const userPatientRecord = async () =>
    await User.query().findById(user.id).withGraphFetched("patient");
});
