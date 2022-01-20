/**
 * Simple wrapper for promoter.io API
 */
import fetch from "node-fetch";

const API_KEY = process.env.PROMOTER_API_KEY;
const CAMPAIGN_ID = 47399;

export const sendSurvey = async (
  email: string,
  firstName: string,
  lastName: string
) => {
  const body = {
    campaign_id: CAMPAIGN_ID,
    contact: {
      email,
      first_name: firstName,
      last_name: lastName,
      attributes: {},
    },
  };
  return await fetch("https://app.promoter.io/api/v2/survey/", {
    method: "POST",
    headers: {
      Authorization: `Token ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
