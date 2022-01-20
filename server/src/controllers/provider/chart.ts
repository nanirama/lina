/**
 * Endpoints for modifying the patient chart. Modifying note endpoints will be in note.ts.
 */
import { Request, Response } from "express";
import {
  getPatientChart as getPatientChartLogic,
  getMedications as getMedicationsLogic,
} from "../../logic/patient";
import Allergy from "../../models/chart/allergy";
import Medication from "../../models/chart/medication";
import { Patient } from "../../models/patient";

export const getPatientChart = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const result = await getPatientChartLogic(patientId);
  res.json({ success: true, ...result });
};

export const updatePatientChart = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const { allergies, medications } = req.body;
  const patient = await Patient.query().findById(patientId);
  if (allergies && allergies.length) {
    await Allergy.query().insert(
      allergies.map((a: any) => ({ ...a, patientId }))
    );
  }
  if (medications && medications.length) {
    await Medication.query().insert(
      medications.map((m: any) => ({ ...m, patientId }))
    );

    await patient.$query().patch({ medications });
  }
  res.json({ success: true });
};

export const getMedications = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const patient = await Patient.query().findById(patientId);
  const medications = await getMedicationsLogic(patient);
  res.json({ medications });
};
export const updateMedication = async (req: Request, res: Response) => {
  const { medicationId, patientId } = req.params;
  const medication = await Medication.query()
    .where({ id: medicationId, patientId })
    .first();
  await medication.$query().patch({ ...req.body });
  res.json({ success: true });
};
export const addMedication = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const medication = await Medication.query().insert({
    patientId,
    ...req.body,
  });
  res.json({ id: medication.id });
};

export const getAllergies = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const allergies = await Allergy.query().where({ patientId });
  res.json({ allergies });
};
export const addAllergy = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const allergy = await Allergy.query().insert({ patientId, ...req.body });
  res.json({ id: allergy.id });
};
export const updateAllergy = async (req: Request, res: Response) => {
  const { allergyId, patientId } = req.params;
  const allergy = await Allergy.query()
    .where({ id: parseInt(allergyId), patientId })
    .first();
  await allergy.$query().patch({ ...req.body });
  res.json({ success: true });
};

export const getPatientInfo = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const patient = await Patient.query()
    .findById(patientId)
    .withGraphFetched({ user: { address: true }, emergencyContact: true })
    .first();

  res.json({
    address: patient.user.address,
    emergencyContact: patient?.emergencyContact,
  });
};
