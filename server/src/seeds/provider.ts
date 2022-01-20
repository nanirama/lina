/**
 * Used to initiate an example provider.
 */
import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("providers").del();
  await knex("users").del();

  const password = await bcrypt.hash("testtest", 8);

  await knex("users").insert([
    {
      accountType: "PROVIDER",
      firstName: "John",
      lastName: "Smith",
      birthdate: "1990-01-01",
      phone: "2122256699",
      email: "healthgent@suremail.info",
      password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
      verifiedEmail: true,
      verifiedPhone: true,
    },
  ]);

  // Inserts seed entries
  await knex("providers").insert([
    { userId: 1, doxyLink: "https://google.com" },
  ]);
}
