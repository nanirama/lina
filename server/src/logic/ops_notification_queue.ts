/**
 * Unauthenticated endpoint to add to waitlsit
 */
import { OpsNotification,NotificationTypes } from "../models/ops_notification_queue";

export const addToOpsNotificationQueue = async (message: string, type: NotificationTypes) => {

  console.log('addToOpsNotificationQueue',message,type)

  await OpsNotification.query().insert({ message, type , sent:false});
};
