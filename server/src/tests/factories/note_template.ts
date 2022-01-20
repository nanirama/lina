import { NoteTemplate } from "../../models/note_template";

export const createNoteTemplate = async (override: any = {}) => {
  return NoteTemplate.query().insertGraphAndFetch({
    name: "some note template",
    value: "some template value",
    ...override,
  });
};
