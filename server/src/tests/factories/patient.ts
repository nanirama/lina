import { AccountType } from "../../models/user";
import { createUser } from "./user";
import { Patient } from "../../models/patient";

let counter = 1;

export const createPatient = async (override: any = {}) => {
  const user = await createUser({
    email: `patient${counter}@email.com`,
    accountType: AccountType.PATIENT,
  });
  counter++;
  return Patient.query().insertGraphAndFetch({
    userId: user.id,
    licenseFileId: "51f32154-0b42-40a4-96fe-fe518409756c",
    gender: "Female",
    consentSignTime: new Date(),
    personaInquiryId: "inquiry-id",
    ...override,
  });
};
