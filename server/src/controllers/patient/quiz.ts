import { Request, Response } from "express";
import { IntakeEvaluationResponse } from "../../lib/api_types";
import {
  calculateScores,
  createIntake,
  getSeverityLevel,
  isEligible,
} from "../../logic/intake";
import { IntakeResponse } from "../../models/intake";
import { NotFoundError } from "../../utils/errors";

/**
 *
 * Uploads a quiz and returns an intake ID
 */
export const uploadQuiz = async (req: Request, res: Response) => {
  const intakeResponse = await createIntake(req.body.answers);
  await isEligible(intakeResponse.id);
  res.json({ success: true, id: intakeResponse.id });
};

/**
 *
 * Checks patient eligibility based on previous diagnosis etc
 */
export const checkEligibility = async (
  req: Request,
  res: Response<IntakeEvaluationResponse>
) => {
  const intakeId = req.query.id;
  if (!intakeId) {
    throw new NotFoundError("No intake found");
  }
  const eligible = await isEligible(intakeId as string);
  const qualification = eligible ? "HG_YES" : "HG_NO";
  const intake = await IntakeResponse.query().findById(intakeId as string);
  const scores = calculateScores(intake);
  const levels = getSeverityLevel(scores);
  // TODO(sbb): move this to logic
  res.json({
    qualification,
    anxiety: {
      percent: (scores.gadScore / 21) * 100,
      level: levels.anxietyLevel,
    },
    depression: {
      percent: (scores.phqScore / 27) * 100,
      level: levels.depressionLevel,
    },
    adhd: {
      percent: 10,
      level: levels.adhdLevel,
    },
  });
};
