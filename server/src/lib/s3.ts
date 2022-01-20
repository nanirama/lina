/**
 * Utility functions for AWS S3
 */
import AWS from "./aws";
import fs from "fs";

const AWS_BUCKET =
  process.env.NODE_ENV === "production"
    ? "healthgent-production"
    : "healthgent-dev";

export const uploadToS3 = async (key: string, filePath: string) => {
  const params = {
    Bucket: AWS_BUCKET,
    Body: fs.createReadStream(filePath),
    Key: key,
  };
  const s3 = new AWS.S3();
  return await s3.upload(params).promise();
};

export const getCdnUrl = (key: string): string => {
  return _getSignedUrl(key);
};

const _getSignedUrl = (key: string): string => {
  const s3 = new AWS.S3();
  return s3.getSignedUrl("getObject", {
    Bucket: AWS_BUCKET,
    Key: key,
    Expires: 3600,
  });
};
