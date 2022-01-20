/**
 * Creating/updating notes for patients by the provider
 */
import { Provider } from "../models/provider";
import { Note } from "../models/note";
import { NoteData } from "../lib/api_types";
import {ForbiddenError, NotFoundError} from "../utils/errors";

export const createNoteForPatient = async (
  provider: Provider,
  patientId: string,
  data: NoteData,
  appointmentId?: string,
  locked?: boolean
) => {
  const note = await Note.query().insert({
    providerId: provider.id,
    patientId,
    editable: false,
    locked,
    data,
    appointmentId,
  });
  return note;
};

export const updateNoteById = async (
  noteId: string,
  providerId: string,
  data: NoteData,
  lock?: boolean
) => {
  const note = await Note.query().findById(noteId);
  if (note.providerId !== providerId) {
    throw new ForbiddenError("Unauthorized to edit note");
  }
  const update = lock
    ? { data, locked: true, editable: false, lockTime: new Date() }
    : { data };
  return await Note.query().updateAndFetchById(noteId, update);
};

export const getNoteById = async (noteId: string, providerId: string) => {
  const note = await Note.query().where({ id: noteId, providerId }).first();
  if (!note) {
    throw new NotFoundError("Could not find requested note");
  }
  return note;
};

export const getNotesForPatient = async (patientId: string, providerId: string) => {
  return Note.query()
    .where({ patientId, providerId })
    .withGraphFetched({ provider: { user: true } });
};
