/**
 * Used for conversions API (https://www.facebook.com/business/help/2041148702652965?id=818859032317965)
 * Conversions API sends conversion events from the server in order to provide attribution
 * that otherwise wouldn't have happened due to blocking 3rd party cookies, like iOS 14 does
 * in many cases.
 */
import fetch from "node-fetch";
import { sha256Hash } from "../utils/hash";

const PIXEL_ID = "732028701046966";
const API_VERSION = "v11.0";
const API_TOKEN = process.env.FB_CONVERSION_TOKEN;
const BASE_URL = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${API_TOKEN}`;

// API reference
// https://developers.facebook.com/docs/marketing-api/conversions-api/payload-helper

interface FacebookEventParams {
  eventName: string;
  actionSource: string;
  email: string;
  phone?: string;
  userAgent?: string;
  ipAddress?: string;
  eventUrl?: string;
}

type Params = Omit<FacebookEventParams, "eventName" | "actionSource">;

export const postEvent = async (params: FacebookEventParams) => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  const {
    eventName,
    actionSource,
    email,
    phone,
    userAgent,
    ipAddress,
    eventUrl,
  } = params;
  const event = {
    event_name: eventName,
    action_source: actionSource,
    event_time: Math.trunc(new Date().getTime() / 1000),
    event_source_url: eventUrl,
    user_data: {
      em: [sha256Hash(email)],
      ph: phone ? [sha256Hash(phone.replace("+", ""))] : [],
      client_user_agent: userAgent,
      client_ip_address: ipAddress,
    },
  };
  const payload = {
    data: [event],
  };

  return await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
};

export const markSignup = async (params: Params) => {
  return await postEvent({
    ...params,
    eventName: "CompleteRegistration",
    actionSource: "website",
    eventUrl: "https://www.hellolina.com/onboarding/complete/signup",
  });
};

export const markSubscription = async (params: Params) => {
  return await postEvent({
    ...params,
    eventName: "Subscribe",
    actionSource: "website",
    eventUrl: "https://www.hellolina.com/onboarding/payment",
  });
};
