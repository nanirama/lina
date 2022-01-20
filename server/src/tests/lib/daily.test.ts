import * as fetch from "node-fetch";
import * as sinon from "sinon";
import {
  createAppointmentRoom,
  ROOM_BASE_URL,
  API_BASE_URL,
  DAILY_AUTH_TOKEN,
} from "../../lib/daily";
import { addDays } from "date-fns";

describe("Daily Lib", () => {
  let stub: sinon.SinonStub;
  beforeAll(() => {
    stub = sinon
      .stub(fetch, "default")
      .resolves(new fetch.Response(`{"name": "my-secret-hash"}`));
  });

  afterAll(() => {
    stub.restore();
  });

  describe("Create appointment room", () => {
    it("Should call Daily api with correct parameters", async () => {
      const endDate = new Date(2021, 12, 8)
      const result = await createAppointmentRoom(endDate);
      expect(result).toEqual({ url: `${ROOM_BASE_URL}?id=my-secret-hash` });
      expect(stub.args[0][0]).toEqual(`${API_BASE_URL}/rooms`);
      expect(stub.args[0][1]).toEqual({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${DAILY_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          properties: {
            enable_prejoin_ui: true,
            enable_chat: true,
            enable_screenshare: false,
            exp: addDays(endDate, 2).getTime() / 1000,
          },
        }),
      });
    });
  });
});
