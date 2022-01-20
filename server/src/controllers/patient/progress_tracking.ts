/**
 * Used to track additional quiz responses in the patient portal after the start of treatment.
 */
import { Request, Response } from "express";
import {
  createAssessmentRecord,
  getAssessmentHistory,
} from "../../logic/assessment";
import { Patient } from "../../models/patient";
import { BadRequestError } from "../../utils/errors";

export const submitCheckin = async (req: Request, res: Response) => {
  if (!req.body.responses) {
    throw new BadRequestError("No intake response!");
  }
  await createAssessmentRecord(
    req.context.user.patient as Patient,
    req.body.responses,
    false
  );
  res.json({ success: true });
};

export const getHistory = async (req: Request, res: Response) => {
  const historyType = req.query.historyType;
  if (historyType !== "anxiety" && historyType !== "depression") {
    throw new BadRequestError("Invalid treatment history type");
  }

  const history = await getAssessmentHistory(
    req.context.user.patient as Patient
  );
  let result = {};
  if (historyType === "anxiety") {
    result = {
      minScore: 0,
      maxScore: 25,
      history: history.map((h) => ({
        timestamp: h.createdAt.getTime(),
        value: h.gadScore,
      })),
    };
  } else if (historyType === "depression") {
    result = {
      minScore: 0,
      maxScore: 30,
      history: history.map((h) => ({
        timestamp: h.createdAt.getTime(),
        value: h.phqScore,
      })),
    };
  }
  res.json({ success: true, ...result });
};
