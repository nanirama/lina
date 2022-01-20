/**
 * Usage of persona API for ID verification
 */
import fetch from "node-fetch";
import Logger from "../config/logger";

const GOVERNMENT_ID_KEY = "document/government-id";

const PERSONA_BEARER_TOKEN = process.env.PERSONA_BEARER_TOKEN;

const getHeaders = () => ({
  "Persona-Version": "2020-01-13",
  Authorization: `Bearer ${PERSONA_BEARER_TOKEN}`,
  "Key-Inflection": "camel",
});

export const verifyInquiry = async (inquiryId: string) => {
  const url = `https://withpersona.com/api/v1/inquiries/${inquiryId}`;
  const headers = getHeaders();
  const result = await fetch(url, { method: "GET", headers }).then((res) =>
    res.json()
  );

  if (
    !(
      result.data?.attributes?.status === "completed" ||
      result.data?.attributes?.status === "approved"
    )
  ) {
    Logger.warn(
      `Could not verify ID. Inquiry ID: ${inquiryId} Result: ${JSON.stringify(
        result
      )}`
    );
    throw Error("Could not verify ID");
  }

  const governmentIdObj = (result.included ?? []).find(
    // @ts-ignore
    (o) => o.type === GOVERNMENT_ID_KEY
  );
  if (!governmentIdObj) {
    Logger.warn(
      `Could not find government ID in verification. ${JSON.stringify(result)}`
    );
    throw Error("Could not find government ID in verification");
  }
  const photoUrl = governmentIdObj.attributes.frontPhoto.url as string;
  const originalFileName = governmentIdObj.attributes.frontPhoto.filename;
  return { photoUrl, originalFileName };
};

export const getPhoto = async (photoUrl: string) => {
  const headers = getHeaders();
  const response = await fetch(photoUrl, { method: "GET", headers });
  return response.buffer();
};
