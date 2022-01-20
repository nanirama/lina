/**
 * Used for video chats in both the patient and provider apps.
 */
import * as fetch from "node-fetch";
import { addDays } from "date-fns";

export const ROOM_BASE_URL = "https://hellolina.com/appointment";
export const API_BASE_URL = "https://api.daily.co/v1";
export const DAILY_AUTH_TOKEN = process.env.DAILY_AUTH_TOKEN;

interface CreateRoomResponse {
  url: string;
}

export const createAppointmentRoom = async (
  endTime: Date = addDays(new Date(), 45)
): Promise<CreateRoomResponse> => {
  const exp = addDays(endTime, 2).getTime() / 1000;
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${DAILY_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      properties: {
        // max_participants: 3,
        enable_prejoin_ui: true,
        enable_chat: true,
        enable_screenshare: false,
        exp: exp,
      },
    }),
  };
  const roomName = await fetch
    .default(url, options)
    .then((res) => res.json())
    .then((res) => res.name as string);
  return { url: `${ROOM_BASE_URL}?id=${roomName}` };
};
