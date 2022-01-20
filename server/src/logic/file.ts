/**
 * Currently unused (?) but used for uploading files to s3
 */
import { User } from "../models/user";
import { uploadToS3 } from "../lib/s3";
import { v4 as uuidv4 } from "uuid";
import { File as HealthgentFile, FileType } from "../models/file";
import { Patient } from "../models/patient";

const uploadFile = async (
  filePath: string,
  originalFileName: string,
  creator: User,
  patient: Patient,
  fileType: FileType
) => {
  const folder = patient.id;
  const key = `${folder}/${originalFileName}`;
  const upload = await uploadToS3(key, filePath);
  return HealthgentFile.query().insertAndFetch({
    bucket: upload.Bucket,
    key: upload.Key,
    name: originalFileName,
    creatorId: creator.id,
    patientId: patient.id,
    fileType,
  });
};

export const updateIdPhoto = async (
  user: User,
  photoPath: string,
  originalFileName: string
) => {
  const idFile = await uploadFile(
    photoPath,
    originalFileName,
    user,
    // @ts-ignore
    user.patient,
    "ID_PIC"
  );

  await Patient.query()
    .patch({ licenseFileId: idFile.id })
    .where({ userId: user.id });
};

// user is a provider
export const uploadChartFile = async (
  user: User,
  patient: Patient,
  file: Express.Multer.File
) => {
  await uploadFile(file.path, file.originalname, user, patient, "CHART_UPLOAD");
};
