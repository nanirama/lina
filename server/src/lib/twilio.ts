/**
 * Twilio SDK usage
 */
import TwilioClient from "twilio";
import Logger from "../config/logger";
import { BadRequestError } from "../utils/errors";

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;
const VIDEO_SID = process.env.TWILIO_VIDEO_SID as string;
const VIDEO_SECRET = process.env.TWILIO_VIDEO_SECRET as string;

const getClient = () => {
  return TwilioClient(ACCOUNT_SID, AUTH_TOKEN);
};

export const sendText = async (phoneNumber: string, message: string) => {
  const destinationNumber = await formatPhone(phoneNumber);
  if (!destinationNumber) {
    throw new BadRequestError("Invalid destination phone number");
  }
  if (process.env.NODE_ENV !== "production") {
    Logger.info(`Sending text to ${destinationNumber}: ${message}`);
    return;
  }
  const res = await getClient()
    .messages.create({
      body: message,
      from: "+12018174909",
      to: destinationNumber,
    })
    .catch((err) => "");
};

export const validatePhoneNumber = async (phoneNumber: string) => {
  return await getClient()
    .lookups.phoneNumbers(phoneNumber)
    .fetch({ countryCode: "US" })
    .then((phone) => phone.phoneNumber)
    .catch((err) => "");
};

export const formatPhone = async (phoneNumber: string) => {
  return await getClient()
    .lookups.phoneNumbers(phoneNumber)
    .fetch({ countryCode: "US" })
    .then((phone) => phone.phoneNumber)
    .catch((e) => undefined);
};

const generateVideoToken = () => {
  return new TwilioClient.jwt.AccessToken(ACCOUNT_SID, VIDEO_SID, VIDEO_SECRET);
};

export const getVideoToken = (identity: string, room: string) => {
  let videoGrant;
  if (!room) {
    videoGrant = new TwilioClient.jwt.AccessToken.VideoGrant();
  } else {
    videoGrant = new TwilioClient.jwt.AccessToken.VideoGrant({ room });
  }
  const token = generateVideoToken();
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};
