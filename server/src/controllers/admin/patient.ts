import { Request, Response } from "express";
import { Appointment } from "../../models/appointment";
import { formatDate } from "../../utils/format";
import { createSlots, getExistingSlots, removeAvailability, Slot, updateLicenses } from "../../logic/provider";
import { createProvider } from "../../logic/registration";
import { Provider } from "../../models/provider";
import { sendProviderBookingNotification } from "../../logic/notifications";
import { sendText } from "../../lib/twilio";
import { sendProviderEmail, sendSimpleEmail } from "../../lib/sendgrid";
import { ProviderSlot } from "../../models/provider_slot";
import { toTimeString } from "../../utils/time";
import { differenceInHours, format } from "date-fns";
import { check, validationResult } from "express-validator";
import {
  updatePhone as setPhone,
  updateEmail as setEmail,
  updateBirthdate,
} from "../../logic/user";
import { updateAddress as setAddress } from "../../logic/address";
import {
  updateEmergencyContact,
  getUser,
  getPatient,
  updateProvidersForPatient,
} from "../../logic/patient";
import {
  createInitialTreatRecord,
  setPharmacyForPatient,
} from "../../logic/pharmacy";
import { Patient } from "../../models/patient";
import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
} from "../../logic/appointments";
import { verifyPatient } from "../../logic/verification";
import { sendResetEmail } from "../../logic/password_reset";
import { User } from "../../models/user";
import { findPharmacies, getPharmacyInfo } from "../../lib/treat";
import { getPatientOnboardingStatus } from "../../logic/onboarding";
import {
  bookAppointment,
  getAppointmentForProvider,
  getAvailableSlots,
  getNextAppointmentType,
  getPreviousAppointments,
  getUpcomingPatientAppointments,
} from "../../logic/appointments";
import { BadRequestError, NotFoundError } from "../../utils/errors";
/*
export const sendRescheduleAppointmentLink = async (req: Request, res: Response) => {
    const { userId, appointmentId } = req.params;
    if (!userId) {
      throw new NotFoundError("Invalid user ID");
    }
    if (!userId) {
      throw new NotFoundError("Invalid user ID");
    }

    //check the appointmentId belongs to the patient

    //check a reschedule token doesn't already exist

    //create a new rescedule token

    const user = await User.query().findById(userId);
    await sendResetEmail(user.email);
  
    res.json({ success: true });
  };
  */