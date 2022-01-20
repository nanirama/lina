import Allergy from "../../models/chart/allergy";

export const createAllergy = async (override: any = {}) => {
  return Allergy.query().insertGraphAndFetch({
    name: "Urticaria",
    reaction: "Red skin",
    severity: "High",
    ...override,
  });
};
