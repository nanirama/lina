import { Request, Response } from "express";
import { OnboardingStatus } from "../../lib/api_types";
import { getPatientOnboardingStatus } from "../../logic/onboarding";
import { getUserFromRequest } from "../../middleware/jwt_auth";

/**
 *
 * Returns onboarding status, which is a large object used to
 * determine the flow of onboarding on the frontend.
 */
export const getOnboardingStatus = async (
  req: Request,
  res: Response<OnboardingStatus>
) => {
  const user = await getUserFromRequest(req);
  if (user === undefined) {
    res.json({} as OnboardingStatus);
    return;
  }
  const status = await getPatientOnboardingStatus(user);
  res.json({ ...status });
};
