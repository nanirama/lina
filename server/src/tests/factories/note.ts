import { Note } from "../../models/note";

export const createNote = async (override: any = {}) => {
  return Note.query().insertGraphAndFetch({
    editable: false,
    ...override,
  });
};
