/**
 * Sendgrid SDK usage
 */
import sgMail from "@sendgrid/mail";
import client from "@sendgrid/client";
import Logger from "../config/logger";

const EXTERNAL_FROM_EMAIL = "support@hellolina.com";
const INTERNAL_FROM_EMAIL = "internal-notifs@hellolina.com";
const OPS_EMAIL = "ops@hellolina.com";
const API_KEY = process.env.SENDGRID_API_KEY as string;
const ADMIN_EMAILS = [
  "sam@hellolina.com",
  "sarah@hellolina.com",
  "neil@hellolina.com",
];
const OPS_EMAILS = [
  //"developers+lina-ops@thatapicompany.com",//for testing
  OPS_EMAIL,
];
const DEV_EMAILS = [
  "developers@thatapicompany.com"
]
// TODO(sbb): This is probably dumb
if (process.env.NODE_ENV !== "test") {
  client.setApiKey(API_KEY);
  sgMail.setApiKey(API_KEY);
}

interface EmailParams {
  toEmail: string | Array<string>;
  fromEmail: string;
  toCC?: Array<string> | null;
  subject: string;
  content: string;
  invite?: string;
}

enum Templates {
  appointmentConfirmation = "d-ab19b9b80715489b97178e660c02a25c",
  rescheduleAppointmentPrompt = "d-557b37d2630c44dcbec05398156a67b6",
  changeProvidersPatient = "d-7115a0591e6b4153bf74eeae3d29ca0b",
  changeProvidersProvider= "d-43ad1ff34086417ea5b17d1fc2121327",
  somethingElse = "test",
}

type TemplateType = keyof typeof Templates;

interface AddContactParams {
  firstName: string;
  lastName: string;
  email: string;
  address?: {
    streetAddress: string;
    unitNumber?: string;
    city: string;
    state: string;
    zip: string;
  };
}

type CustomField = "signup_date" | "subscription_start_date";

const commonVariables = {
  Sender_Name: "B&G Innovations, Inc.",
  Sender_Address: "9450 SW Gemini Dr PMB 57336",
  Sender_City: "Beaverton",
  Sender_State: "Oregon",
  Sender_Zip: "97008",
};

export const _sendEmail = async (params: EmailParams) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Sending Email",JSON.stringify(params,null,2))
  }

  const attachments = params.invite
    ? [
      {
        content: Buffer.from(params.invite).toString("base64"),
        filename: "invite.ics",
        type: "text/calendar",
        disposition: "attachment",
      },
    ]
    : [];
  const msg: any = {
    to: params.toEmail,
    from: params.fromEmail,
    subject: params.subject,
    text: params.content,
    attachments,
  };
  if (params.toCC) msg.cc = params.toCC;

  await sgMail.send(msg);
};

export const sendSimpleEmail = async (
  email: string,
  subject: string,
  content: string,
  invite?: string
) => {
  return await _sendEmail({
    toEmail: email,
    fromEmail: EXTERNAL_FROM_EMAIL,
    subject,
    content,
    invite,
  });
};
export const sendOpsEmail = async (
  params: Omit<EmailParams, "fromEmail" | "toEmail">
) => {
  let ops = OPS_EMAILS

  if (process.env.NODE_ENV !== "production") {
    ops = DEV_EMAILS
  }

  return await _sendEmail({
    ...params,
    fromEmail: INTERNAL_FROM_EMAIL,
    toEmail: ops,
  });
};

export const sendProviderEmail = async (
  params: Omit<EmailParams, "fromEmail">
) => {
  return await _sendEmail({
    ...params,
    fromEmail: EXTERNAL_FROM_EMAIL,
    toCC: OPS_EMAILS,
  });
};

export const sendInternalEmail = async (
  params: Omit<EmailParams, "fromEmail" | "toEmail">
) => {
  return await _sendEmail({
    ...params,
    fromEmail: INTERNAL_FROM_EMAIL,
    toEmail: ADMIN_EMAILS,
  });
};

export const sendTemplate = async (
  email: string,
  subject: string,
  template: TemplateType,
  variables: Record<string, unknown>
) => {

  if (process.env.NODE_ENV !== "production") {
    Logger.info(`Sending template to ${email}: ${subject} ${template}`);
    return;
  }
  const msg = {
    to: email,
    from: EXTERNAL_FROM_EMAIL,
    subject,
    templateId: Templates[template],
    dynamicTemplateData: { ...commonVariables, ...variables },
  };
  try {
    const result = await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

export const addToMailingList = async (params: AddContactParams) => {
  client.request({
    method: "PUT",
    url: "/v3/marketing/contacts",
    body: {
      list_ids: [],
      contacts: [
        {
          address_line_1: params.address?.streetAddress,
          address_line_2: params.address?.unitNumber,
          city: params.address?.city,
          email: params.email,
          first_name: params.firstName,
          last_name: params.lastName,
          postal_code: params.address?.zip,
          state_province_region: params.address?.state,
          custom_fields: {},
        },
      ],
    },
  });
};

const customFieldNameToId = (field: CustomField) => {
  switch (field) {
    case "signup_date":
      return "w3_D";
    case "subscription_start_date":
      return "w4_D";
  }
};

const addCustomField = async (
  email: string,
  field: CustomField,
  value: string | Date
) => {
  const val = value instanceof Date ? value.toISOString() : value;
  const fieldId = customFieldNameToId(field);
  return await client.request({
    method: "PUT",
    url: "/v3/marketing/contacts",
    body: {
      contacts: [
        {
          email,
          custom_fields: {
            [fieldId]: val,
          },
        },
      ],
    },
  });
};

export const markSendgridSubscription = async (email: string, date?: Date) => {
  return await addCustomField(
    email,
    "subscription_start_date",
    date || new Date()
  );
};
