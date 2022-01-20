import { Provider } from "../../models/provider";
import { createUser } from "./user";
import { AccountType } from "../../models/user";

let counter = 1;

export const createProvider = async (override: any = {}) => {
  const user = await createUser({
    email: `provider${counter}@email.com`,
    accountType: AccountType.PROVIDER,
  });
  counter++;
  return Provider.query().insertGraphAndFetch({
    userId: user.id,
    title: "Mr",
    employee_type: "JC",
    licenses: [],
    ...override,
  });
};
