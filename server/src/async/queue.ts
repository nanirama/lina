/**
 * very simple Redis backed Job queue, with the job queue checked by a cron job
 * that is initialized in the main server file (server.ts).
 */
import { AsyncJob, AsyncSMSJob } from "./types";
import * as redis from "../lib/redis";
import { sendText } from "../lib/twilio";
import Logger from "../config/logger";
import { sendAppointmentReminders } from "../logic/notifications";

const HEALTHGENT_JOB_QUEUE = "hg_job_queue";
const BATCH_SIZE = 50;

export const createJob = async (job: AsyncJob) => {
  return await redis.zadd(
    HEALTHGENT_JOB_QUEUE,
    JSON.stringify(job),
    job.executionTime.getTime()
  );
};

export const executeJob = async (job: AsyncJob) => {
  if (job.jobType === "SMS_NOTIFICATION") {
    const smsJob = job as AsyncSMSJob;
    await sendText(smsJob.phoneNumber, smsJob.message);
  } else if (job.jobType === "APPOINTMENT_REMINDER") {
    sendAppointmentReminders(job.appointmentId);
  }
};

export const getNextJob = async () => {
  const job = await redis.peek(HEALTHGENT_JOB_QUEUE);
  if (job && job?.priority <= new Date().getTime()) {
    return job;
  }
};

export const popQueue = async () => {
  const job = await redis.zpopmin(HEALTHGENT_JOB_QUEUE);
  if (job) {
    return JSON.parse(job.value) as AsyncJob;
  }
};

export const executePendingJobs = async () => {
  // Do in batches for now
  let i = 0;
  for (i = 0; i < BATCH_SIZE; i++) {
    if ((await getNextJob()) !== undefined) {
      const job = await popQueue();
      if (job !== undefined) {
        await executeJob(job);
      }
    } else {
      break;
    }
  }
  Logger.info(`Executed ${i} async jobs`);
};
