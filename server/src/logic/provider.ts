import { EmployeeType, Provider } from "../models/provider";
import { ProviderSlot } from "../models/provider_slot";
import { Appointment, AppointmentType } from "../models/appointment";
import { Patient } from "../models/patient";
import addMinutes from "date-fns/addMinutes";
import { BadRequestError, ForbiddenError } from "../utils/errors";
import { MAX_DAYS_AVAILABILITY } from "./appointments";
import { ProviderLicense } from "../models/provider_license";
import { ProviderPatientMap } from "../models/provider_patient_map";

export interface Slot {
  date: Date;
  slotStart: number;
  slotEnd?: number;
}

/**
 *
 * @param startTime start time for interval
 * @param endTime  end time for interval
 * @returns {boolean} whether a provider slot exists in the database in that time
 * TODO: check slot start too
 */
const doesSlotExistInInterval = async (startTime: Date, endTime: Date) => {
  const slot = await ProviderSlot.query()
    .whereBetween("slotEnd", [startTime, endTime])
    .first();
  return !!slot;
};

/**
 *
 * @param employeeType Green Bell, J&C, etc
 * @param appointmentType initial vs followup
 * @returns {number} length of the appointment, in minutes
 */
export const getSlotLength = (
  employeeType: EmployeeType,
  appointmentType: AppointmentType
): number => {
  if (employeeType === "JC") {
    if (appointmentType === "INITIAL") {
      return 60;
    } else {
      return 30;
    }
  }

  if (appointmentType === "INITIAL") {
    return 45;
  } else {
    return 15;
  }
};

const checkSlotTimes = async (
  slots: Array<Slot>,
  initialAppointmentLength: number
) => {
  const overlap = await Promise.all(
    slots.map((s) =>
      doesSlotExistInInterval(
        new Date(s.slotStart),
        addMinutes(s.slotStart, initialAppointmentLength)
      )
    )
  );
  if (overlap.some((o) => o)) {
    return false;
  }
};

/**
 *
 * @param provider Provider to create availability for
 * @param slots list of slots they want to add
 * @returns the newly created slot objects if successful
 */
export const createSlots = async (provider: Provider, slots: Array<Slot>) => {
  const initialAppointmentLength = getSlotLength(
    provider.employeeType,
    "INITIAL"
  );
  if (!checkSlotTimes(slots, initialAppointmentLength)) {
    throw new BadRequestError("Can not create slot with overlap");
  }

  const rowsToInsert = slots.map((s) => ({
    providerId: provider.id,
    slotDate: s.date,
    slotStart: new Date(s.slotStart),
    slotEnd: addMinutes(
      new Date(s.slotStart),
      getSlotLength(provider.employeeType, "INITIAL")
    ),
  }));
  const inserted = await ProviderSlot.query().insert(rowsToInsert);
  return inserted;
};

export const getExistingSlots = async (
  provider: Provider
): Promise<Array<ProviderSlot>> => {
  const now = new Date();
  const latest = new Date();
  latest.setDate(now.getDate() + MAX_DAYS_AVAILABILITY);
  const slots = await ProviderSlot.query()
    .where({
      providerId: provider.id,
    })
    .whereBetween("slotDate", [now, latest])
    .withGraphFetched({
      appointment: { patient: { user: true }, providerSlot: true },
    });
  return slots;
};

export const getUpcomingAppointments = async (provider: Provider) => {
  const now = new Date();
  const latest = new Date();
  latest.setDate(now.getDate() + MAX_DAYS_AVAILABILITY);
  return await Appointment.query()
    .where({
      providerId: provider.id,
      status: "CONFIRMED",
    })
    .orderBy("startTime", "asc");
};

export const getPastAppointments = async (provider: Provider) => {
  return await Appointment.query().where({ providerId: provider.id });
};

export const getPatientsForProvider = async (provider: Provider) => {
  const ppms = await ProviderPatientMap.query()
    .withGraphFetched({ patient: { user: true } })
    .where({ providerId: provider.id });
  return ppms
    .map((p) => p.patient)
    .filter((p) => p.subscriptionStatus !== "INACTIVE");
};

export const removeAvailability = async (
  provider: Provider,
  slotId: string
) => {
  const slot = await ProviderSlot.query().findById(slotId)
  .withGraphFetched({ appointment: true });;
  if (slot.providerId !== provider.id) {
    throw new ForbiddenError("Invalid provider for slot");
  }
  if (slot.appointment) {
    throw new BadRequestError(
      "Can not remove availability for a booked appointment slot"
    );
  }
  
  await ProviderSlot.query().deleteById(slotId);
};

/**
 *
 * @param provider Provider to update licenses for
 * @param licenses list of state abbreviation strings (NY, CA, TX, etc) that the provider has licenses for
 */
export const updateLicenses = async (
  provider: Provider,
  licenses: Array<string>
) => {
  const existingLicenses = await ProviderLicense.query().where({
    providerId: provider.id,
  });
  const newLicenses = licenses.filter(
    (l) => !existingLicenses.find((el) => el.state === l)
  );
  const disableLicenses = existingLicenses.filter(
    (el) => !licenses.find((l) => l === el.state)
  );

  for await (const license of disableLicenses) {
    await ProviderLicense.query().deleteById(license.id);
  }
  if (newLicenses.length > 0) {
    const licenseParams = newLicenses.map((l) => ({
      providerId: provider.id,
      state: l,
      active: true,
    }));
    await ProviderLicense.query().insert(licenseParams);
  }
};
