import Address from "../../models/address";

export const createAddress = async (override: any = {}) => {
  return Address.query().insertGraphAndFetch({
    streetAddress: "2201 Biscayne blvs",
    unitNumber: "1504",
    city: "Miami",
    state: "FL",
    zip: "33139",
    ...override,
  });
};
