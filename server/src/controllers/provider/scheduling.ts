/**
 * Endpoints for provider access of appointments.
 */
import { Request, Response } from "express";
import {
  getAppointmentForProvider,
  updateAppointmentChecklist,
  updateAppointmentStatus,
} from "../../logic/appointments";

export const getAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const appointment = await getAppointmentForProvider(appointmentId);
  res.json({ success: true, appointment });
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const { status, checklist } = req.body;
  if (status) {
    await updateAppointmentStatus(appointmentId, status);
  }
  if (checklist) {
    await updateAppointmentChecklist(appointmentId, checklist);
  }

  res.json({ success: true });
};
