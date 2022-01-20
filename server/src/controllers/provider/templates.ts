/**
 * Endpoints for provider template manipulation
 */
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import {
  getTemplatesForProvider,
  createTemplateForProvider,
  updateTemplate as updateTemplateLogic,
} from "../../logic/templates";
import { Provider } from "../../models/provider";
import { BadRequestError, NotFoundError } from "../../utils/errors";

export const getTemplates = async (req: Request, res: Response) => {
  const results = await getTemplatesForProvider(
    req.context.user.provider as Provider
  );
  res.json({ success: true, results });
};

export const createTemplate = async (req: Request, res: Response) => {
  await check("name", "Template name is required")
    .isString()
    .not()
    .isEmpty()
    .run(req);
  await check("value", "Template value is required")
    .isString()
    .not()
    .isEmpty()
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  const { name, value } = req.body;
  const template = await createTemplateForProvider(
    req.context.user.provider as Provider,
    name,
    value
  );
  res.json({ success: true, id: template.id });
};

export const updateTemplate = async (req: Request, res: Response) => {
  const { name, value } = req.body;
  const { templateId } = req.params;
  if (!templateId) {
    throw new NotFoundError("Invalid Template ID");
  }
  await updateTemplateLogic(
    req.context.user.provider as Provider,
    templateId as string,
    name,
    value
  );
  res.json({ success: true });
};
