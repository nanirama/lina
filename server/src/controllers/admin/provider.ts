/**
 * Admin operations relating to providers specifically
 */
import { Request, Response } from "express";
import { Appointment } from "../../models/appointment";
import { formatDate } from "../../utils/format";
import { createSlots, getExistingSlots, removeAvailability, Slot, updateLicenses } from "../../logic/provider";
import { createProvider } from "../../logic/registration";
import { Provider } from "../../models/provider";
import { BadRequestError } from "../../utils/errors";
import { sendText } from "../../lib/twilio";
import { sendProviderEmail } from "../../lib/sendgrid";
import { ProviderSlot } from "../../models/provider_slot";
import { toTimeString } from "../../utils/time";
import { format } from "date-fns";
import { cancelAppointment } from "../../logic/appointments";
import { signToken } from "../../logic/auth";

export const providerSignup = async (req: Request, res: Response) => {
    const { employeeType, bio, publicPicPath, licenses, ...params } = req.body;
    const providerParams = { employeeType, bio, publicPicPath };
    const token = await createProvider(params, providerParams, licenses);
    await res.json({ success: true, token });
};

export const providerToken = async (req: Request, res: Response) => {
    const { providerId } = req.params;
    const signedToken = signToken(parseInt(providerId));
    await res.json({ token: signedToken });
};

export const updateProvider = async (req: Request, res: Response) => {
    if (!req.params.providerId) {
        throw new BadRequestError("Must provide provider ID");
    }
    const provider = await Provider.query()
        .findById(req.params.providerId)
        .withGraphFetched({ user: true });
    if (!provider) {
        throw new BadRequestError("Invalid provider ID");
    }

    const {
        firstName,
        lastName,
        bio,
        email,
        phone,
        timezone,
        employeeType,
        licenses,
        publicPicPath
    } = req.body;

    if (firstName) {
        await provider.user.$query().patch({ firstName });
    }
    if (lastName) {
        await provider.user.$query().patch({ lastName });
    }
    if (email) {
        await provider.user.$query().patch({ email });
    }
    if (phone) {
        await provider.user.$query().patch({ phone });
    }
    if (timezone) {
        await provider.user.$query().patch({ timezone });
    }
    if (bio) {
        await provider.$query().patch({ bio });
    }
    if (employeeType) {
        await provider.$query().patch({ employeeType });
    }
    if (publicPicPath) {
        await provider.$query().patch({ publicPicPath });
    }
    if (licenses) {
        await updateLicenses(provider, licenses);
    }
    res.json({ success: true });
};


export const markAvailability = async (req: Request, res: Response) => {
    if (!req.params.providerId) {
        throw new BadRequestError("Must provide provider ID");
    }
    const provider = await Provider.query()
        .findById(req.params.providerId)
        .withGraphFetched({ user: true });
    if (!provider) {
        throw new BadRequestError("Invalid provider ID");
    }


    // @ts-ignore
    const slots = req.body.slots.map((s) => ({
      date: new Date(s.date),
      slotStart: new Date(s.slotStart),
    })) as Array<Slot>;
    if (slots.length === 0) {
      throw new BadRequestError(
        "Must provide at least one block of availability"
      );
    }
    await createSlots(provider, slots);

    try{
        // @ts-ignore
        const aggMessage = req.body.slots.map(s => {
            const dateStr = format(new Date(s.slotStart), "EEEE, MMMM do");
            const timeStr = toTimeString(new Date(s.slotStart), provider.user.timezone);
          return ` Added: ${dateStr} at ${timeStr} | `
        }) as Array<Slot>;
        const message = `${aggMessage.toString()}`
        
        if(provider.user.phone)await sendText(provider.user.phone,
            `Lina Admin has updated your Availability: ${message}`)
        await sendProviderEmail({toEmail:
            provider.user.email,subject: "Lina Admin has changed your Availability",content: message})
    
      }catch(err)
      {
        console.error(err)
      }

    res.json({ success: true });
  };
  
  const appointmentToRespJson = (appt: Appointment, provider: Provider) => ({
    appointmentId: appt.id,
    patientId: appt.patientId,
    patientName: `${appt.patient.user.firstName} ${appt.patient.user.lastName}`,
    date: formatDate(appt.startTime),
    startTime: appt.startTime,
    endTime: appt.endTime,
    timestamp: new Date(appt.startTime).getTime(),
    videoLink: appt.url || provider.doxyLink,
    status: appt.status,
  });
  
  export const getSlots = async (req: Request, res: Response) => {
    if (!req.params.providerId) {
        throw new BadRequestError("Must provide provider ID");
    }
    const provider = await Provider.query()
        .findById(req.params.providerId)
        .withGraphFetched({ user: true });
    if (!provider) {
        throw new BadRequestError("Invalid provider ID");
    }

    
    const slots = await getExistingSlots(provider);
    const respJson = slots.map((s) => ({
      slotId: s.id,
      date: formatDate(s.slotDate),
      slotStart: s.slotStart,
      slotEnd: s.slotEnd,
      appointment: s.appointment
        ? appointmentToRespJson(s.appointment, provider)
        : null,
    }));
    res.json({ success: true, slots: respJson });
  };
  
export const deleteAvailability = async (req: Request, res: Response) => {
    if (!req.params.providerId) {
        throw new BadRequestError("Must provide provider ID");
    }
    const provider = await Provider.query()
        .findById(req.params.providerId)
        .withGraphFetched({ user: true });
    if (!provider) {
        throw new BadRequestError("Invalid provider ID");
    }

    const { slotId } = req.params;

    const slot = await ProviderSlot.query().findById(slotId)
    .withGraphFetched({ appointment: true });;
    if (slot.appointment) {
        await cancelAppointment(slot.appointment);
    }
    
    try{
        const dateStr = format(new Date(slot.slotStart), "EEEE, MMMM do");
        const timeStr = toTimeString(new Date(slot.slotStart), provider.user.timezone);
        const message = `Lina Admin has updated your Availability. Removed: ${dateStr} at ${timeStr}`
        
        if(provider.user.phone)
        {
            try{
                await sendText(provider.user.phone,message)
            }catch(err){
                console.log(err)
            }

        }
        await sendProviderEmail({toEmail:
            provider.user.email, 
            subject: "Lina Admin has updated your Availability",content: message})
    
      }catch(err)
      {
        console.error(err)
      }
      
    await removeAvailability(provider, slotId);

    res.json({ success: true });
  };
  
  