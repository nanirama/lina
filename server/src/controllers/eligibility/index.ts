import { Request, Response } from "express";
import { getStateFromZip } from "../../lib/zipcode";
import { getOperatingStates } from "../../logic/eligibility";
import { BadRequestError } from "../../utils/errors";
import { isEligibleState } from "../../utils/states";

/**
 * Used to determine eligibility by checking if a zip code
 * is in a state that is supported
 */
export const checkZipEligbility = async (req: Request, res: Response) => {
  const zip = req.query.zip as string;
  if (!zip || zip.length !== 5) {
    throw new BadRequestError("Invalid ZIP code");
  }
  const state = getStateFromZip(zip);
  if (!state || state === "none") {
    throw new BadRequestError("Invalid ZIP code provided");
  }
  const available = isEligibleState(state);
  res.json({ available });
};

export const getEligibleStates = async (req: Request, res: Response) => {
  const states = await getOperatingStates();
  res.json({ states });
};
