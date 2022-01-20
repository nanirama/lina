import { Patient } from "../models/patient";
import { getPhoto, verifyInquiry } from "../lib/persona";
import tmp from "tmp";
import fs from "fs";
import { User } from "../models/user";
import { updateIdPhoto } from "./file";

/**
 *
 * @param user user model object
 * @param inquiryId ID returned from the Persona frontend for this verification
 */
export const verifyPatient = async (user: User, inquiryId: string) => {
  const { photoUrl, originalFileName } = await verifyInquiry(inquiryId);
  const photoBuffer = await getPhoto(photoUrl);
  await Patient.query()
    .where({ userId: user.id })
    .patch({ personaInquiryId: inquiryId });

  const resultPromise = new Promise((resolve, reject) => {
    tmp.file((err, path) => {
      if (err) {
        reject(err);
      }
      fs.writeFile(path, photoBuffer, () => { });
      updateIdPhoto(user, path, originalFileName).then(resolve).catch(reject);
    });
  });
  await resultPromise;
};
