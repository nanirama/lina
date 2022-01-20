import { Request, Response } from "express";
import { findPharmacies, getPharmacyInfo } from "../../lib/treat";
import { Pharmacy } from "../../lib/treat/types";
import { Patient } from "../../models/patient";
import { BadRequestError } from "../../utils/errors";

/**
 * Takes a response from the Treat API and takes the relevant fields
 */
const pharmacyToResponse = (pharmacy: Pharmacy) => {
  return {
    id: pharmacy.id,
    name: pharmacy.pharmStoreName,
    street: pharmacy.pharmAddressLine1,
    city: pharmacy.pharmCity,
    state: pharmacy.pharmState,
    zip: pharmacy.pharmZip,
    phone: pharmacy.pharmPhone,
    pharmNcpdpId: pharmacy.pharmNcpdpId,
    distance: parseFloat(pharmacy.distance),
  };
};

/**
 *
 * lat/lon aren't used currently, just do whatever is closest to
 * the patient's address
 */
export const getPharmacies = async (req: Request, res: Response) => {
  const { zip, lat, lon } = req.query;
  if (!zip && !(lat && lon)) {
    throw new BadRequestError("Must provide a zip or lat/lon");
  }
  const params =
    lat && lon
      ? {
        locationLat: parseFloat(lat as string),
        lon: parseFloat(lon as string),
      }
      : { zip: zip as string };
  const results = await findPharmacies(params);
  const pharmacies = results.map(pharmacyToResponse);
  res.json({ success: true, pharmacies });
};

export const getCurrentPharmacy = async (req: Request, res: Response) => {
  const patient = req.context.user.patient as Patient;
  const pharmacy = await getPharmacyInfo(patient.treatPharmacyId);
  if (!pharmacy) {
    res.json({ success: false });
    return;
  }

  const response = pharmacyToResponse(pharmacy);
  res.json({ success: true, ...response });
};
