import { AccountType, User } from "../../models/user";
import Address from "../../models/address";

export const createUser = async (override: any = {}) => {
  const user = await User.query().insertGraphAndFetch({
    accountType: AccountType.PATIENT,
    first_name: "Max",
    last_name: "Muller",
    phone: "3053639348",
    email: "some@email.com",
    password: "1234",
    ...override,
  });
  return user;
};
