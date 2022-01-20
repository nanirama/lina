/**
 * Endpoints for manipulating patient notes by providers. See chart.ts for broader
 * chart manipulation endpoints.
 */
import { Request, Response } from "express";
import {
  createNoteForPatient, getNoteById,
  getNotesForPatient,
  updateNoteById,
} from "../../logic/notes";
import { Provider } from "../../models/provider";

export const createNote = async (req: Request, res: Response) => {
  const provider = req.context.user?.provider as Provider;
  const { patientId, appointmentId, data } = req.body;
  const note = await createNoteForPatient(
    provider,
    patientId || req.params.patientId,
    data,
    appointmentId
  );
  res.json({ success: true, noteId: note.id });
};

export const updateNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const providerId = req.context.user?.provider?.id as string;
  await updateNoteById(noteId, providerId, req.body.data, req.body.lock);
  res.json({ success: true });
};

export const getNote = async (req: Request, res: Response) => {
  const providerId = req.context.user?.provider?.id as string;
  const result = await getNoteById(req.params.noteId, providerId);
  res.json(result);
};

export const getNotes = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const providerId = req.context.user?.provider?.id as string;
  const notes = await getNotesForPatient(patientId, providerId);

  const notesJson = notes.map((n) => ({
    id: n.id,
    data: n.data,
    providerName: n.provider
      ? `${n.provider.user.firstName} ${n.provider.user.lastName}`
      : "Initial intake",
    timestamp: n.updatedAt.getTime(),
  }));
  res.json({ notes: notesJson });
};
