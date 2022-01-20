import request from "supertest";
import each from "jest-each";
import app from "../../app";
import { clearDb } from "../db";
import { createProvider } from "../factories/provider";
import { createProviderLicense } from "../factories/provider_license";
import { createUser } from "../factories/user";
import { AccountType } from "../../models/user";

describe("Eligibility Controller", () => {
  beforeAll(async () => {
    await clearDb();
  });

  describe("checkZipEligbility", () => {
    each([["2347"], ["320184"]]).it(
      "should prevent in case zip code does not have 5 digits",
      async (zip) => {
        await request(app).get(`/api/check_zip?zip=${zip}`).expect(400);
      }
    );

    it("should ensure a valid state", async () => {
      await request(app).get(`/api/check_zip?zip=00001`).expect(400);
    });

    each([
      ["33432", true], // FL
      ["88980", true], // NV
      ["44425", true], // OH
      ["28678", true], // NC
      ["95243", true], // CA,
      ["80234", false], // CO
      ["61242", false], // ID
      ["03988", false], // LA
    ]).it(
      "should return positive for eligible states",
      async (zip, available) => {
        const response = await request(app)
          .get(`/api/check_zip?zip=${zip}`)
          .expect(200);
        expect(response.body.available).toEqual(available);
      }
    );
  });

  describe("getEligibleStates", () => {
    it("should return states with valid licenses", async () => {
      const user1 = await createUser({
        accountType: AccountType.PROVIDER,
        email: "user1@email.com",
      });
      const user2 = await createUser({
        accountType: AccountType.PROVIDER,
        email: "user2@email.com",
      });
      const provider1 = await createProvider({ userId: user1.id });
      const provider2 = await createProvider({ userId: user2.id });
      await createProviderLicense({ providerId: provider1.id, state: "AL" });
      await createProviderLicense({ providerId: provider1.id, state: "TX" });
      await createProviderLicense({ providerId: provider2.id, state: "AL" });
      await createProviderLicense({ providerId: provider2.id, state: "NY" });

      const response = await request(app).get(`/api/states`).expect(200);
      const { states } = response.body;
      const stateAbbreviations = states.map((s: any) => s.abbreviation);
      expect(stateAbbreviations.length).toEqual(3);
      expect(stateAbbreviations).toContain("AL");
      expect(stateAbbreviations).toContain("TX");
      expect(stateAbbreviations).toContain("NY");
    });
  });
});
