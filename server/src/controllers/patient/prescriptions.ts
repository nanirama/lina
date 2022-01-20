import { Request, Response } from "express";
import { getPrescriptionsForPatient } from "../../logic/pharmacy";
import { Patient } from "../../models/patient";

/**
 * Gets list of prescriptions from the Treat API
 */
export const getPrescriptions = async (req: Request, res: Response) => {
  const prescriptions = await getPrescriptionsForPatient(
    req.context.user.patient as Patient
  );

  res.json({ success: true, prescriptions });
};
