/**
 * Logic for provider template creation/editing
 */
import { NoteTemplate } from "../models/note_template";
import { Provider } from "../models/provider";
import { ForbiddenError, NotFoundError } from "../utils/errors";

export const createTemplateForProvider = async (
  provider: Provider,
  name: string,
  value: string
) => {
  const template = await NoteTemplate.query().insertAndFetch({
    name,
    value,
    providerId: provider.id,
  });
  return template;
};

export const getTemplatesForProvider = async (provider: Provider) => {
  return await NoteTemplate.query().where({ providerId: provider.id });
};

export const updateTemplate = async (
  provider: Provider,
  templateId: string,
  name: string,
  value: string
) => {
  const template = await NoteTemplate.query().findById(templateId);
  if (!template) {
    throw new NotFoundError("requested template does not exist");
  }
  if (template.providerId !== provider.id) {
    throw new ForbiddenError("Invalid template for provider");
  }
  await template.$query().patch({ name, value });
};
