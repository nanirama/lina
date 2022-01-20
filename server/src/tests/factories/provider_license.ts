import { ProviderLicense } from "../../models/provider_license";

export const createProviderLicense = async (override: any = {}) => {
  return ProviderLicense.query().insertGraphAndFetch({
    state: "FL",
    active: true,
    ...override,
  });
};
