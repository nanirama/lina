/**
 * registration related logic, for all user types
 */
import { PartialModelObject, UniqueViolationError } from "objection";
import { User, AccountType } from "../models/user";
import { IntakeResponse } from "../models/intake";
import differenceInYears from "date-fns/differenceInYears";
import { hashPassword, signToken } from "./auth";
import { findAnswerByKey } from "./intake";
import { addToMailingList } from "../lib/sendgrid";
import * as twillio from "../lib/twilio";
import { formatEmail } from "../utils/format";
import { BadRequestError, UserExistsError } from "../utils/errors";
import Logger from "../config/logger";
import * as Sentry from "@sentry/node";
import { UserReferrer, UserReferrerType } from "../models/user_referrer";
import * as assessment from "./assessment/index";
import { Provider } from "../models/provider";
import { ProviderLicense } from "../models/provider_license";

const getPatientParams = (intake: IntakeResponse) => {
  const genderAnswer = findAnswerByKey(intake, "gender")?.answer;
  const gender = genderAnswer ? genderAnswer[0].key : "";

  return {
    gender,
    consentSignTime: new Date(),
  };
};

export const createPatient = async (
  params: PartialModelObject<User>,
  intakeId: string,
  residenceState: string,
  referInfo?: UserReferrerType
) => {
  let intake;
  try {
    intake = await IntakeResponse.query().findById(intakeId);
  } catch {
    Logger.error(`Invalid questionnaire ID: ${intakeId}`);
    throw new BadRequestError("Invalid questionnaire");
  }
  const patientParams = {
    ...getPatientParams(intake),
    residenceState,
  };
  const userCreationParams = {
    ...params,
    accountType: AccountType.PATIENT,
  };
  const user = await createUser(userCreationParams);
  const patient = await user.$relatedQuery("patient").insert(patientParams);
  await intake.$query().update({ patientId: patient.id });

  await assessment.createAssessmentRecord(
    patient,
    intake.response.answers,
    true
  );

  if (referInfo) {
    await UserReferrer.query().insert({ ...referInfo, userId: user.id });
  }

  addToMailingList(user);
  return user;
};

export const createProvider = async (
  params: PartialModelObject<User>,
  providerParams: PartialModelObject<Provider>,
  licenses: Array<string>
): Promise<string> => {
  const userCreationParams = {
    ...params,
    accountType: AccountType.PROVIDER,
  };
  const user = await createUser(userCreationParams);
  const provider = await user
    .$relatedQuery("provider")
    .insert({ ...providerParams, userId: user.id });

  const licenseParams = licenses.map((l) => ({
    providerId: provider.id,
    state: l,
    active: true,
  }));
  await ProviderLicense.query().insert(licenseParams);
  return signToken(user.id);
};

const createUser = async (params: PartialModelObject<User>) => {
  const { password, birthdate, phone, email } = params;
  if (!password) {
    throw new BadRequestError("Must provide a password");
  }
  let formattedPhone;
  if (phone) {
    formattedPhone = await twillio.formatPhone(phone as string);
    if (!formattedPhone) {
      throw new BadRequestError("Please provide a valid phone number.");
    }
  } else {
    formattedPhone = "";
  }
  if (formattedPhone) {
    // Should be a unique constraint at the DB level, but we already have duplicates in the DB
    // TODO(sbb): Clean up prod data to allow this to be a DB level check
    const userWithPhone = await User.query()
      .where({ phone: formattedPhone })
      .first();
    if (userWithPhone) {
      throw new UserExistsError("A user with that phone number already exists");
    }
  }
  if (birthdate) {
    const yearsDiff = differenceInYears(
      new Date(),
      // @ts-ignore
      new Date(birthdate as string)
    );
    if (yearsDiff < 18) {
      throw new BadRequestError(
        "You must be 18 or older to register for Lina."
      );
    }
  }
  const hashedPassword = await hashPassword(password as string);
  try {
    const user = await User.query().insertGraphAndFetch({
      ...params,
      password: hashedPassword,
      phone: formattedPhone,
      email: formatEmail(email as string),
    });
    return user;
  } catch (err) {
    Sentry.captureException(err);
    Logger.warn(err.toString());
    if (err instanceof UniqueViolationError) {
      throw new UserExistsError("User with that email already exists");
    }
    throw new BadRequestError("Please fill out all required fields.");
  }
};
