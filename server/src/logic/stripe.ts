/**
 * Logic relating to payment. Please read the Stripe API reference
 * to learn more about how this works
 * https://stripe.com/docs/api/subscriptions
 */
import Stripe from "stripe";
import { Patient } from "../models/patient";
import { User } from "../models/user";
import { BadRequestError, NotFoundError } from "../utils/errors";

const apiKey = process.env.STRIPE_SECRET_KEY as string;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const SUBSCRIPTION_PRICE_ID =
  process.env.NODE_ENV === "production"
    ? "price_1IdhO7Hl2NrphxgOvj5DgCNa"
    : "price_1IPzAcHl2NrphxgOlqTwb7rc";

const stripe = new Stripe(apiKey, {
  apiVersion: "2020-08-27",
});

const createStripeCustomer = async (
  user: User
): Promise<Stripe.Response<Stripe.Customer>> => {
  return await stripe.customers.create({
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
  });
};

const upsertStripeCustomer = async (user: User, patient: Patient) => {
  if (patient.stripeCustomerId) {
    return await stripe.customers.retrieve(patient.stripeCustomerId, {
      expand: ["subscriptions"],
    });
  }
  const customer = await createStripeCustomer(user);
  await Patient.query().updateAndFetchById(patient.id, {
    stripeCustomerId: customer.id,
  });
  return customer;
};

const getPromotionCodeId = async (code?: string) => {
  if (!code) {
    return;
  }
  const promoCodes = await stripe.promotionCodes.list();
  return promoCodes.data.find((pc) => pc.code === code);
};

export const createSubscription = async (user: User, promoCode?: string) => {
  const customer = (await upsertStripeCustomer(
    user,
    user?.patient as Patient
  )) as Stripe.Response<Stripe.Customer>;
  if (!customer) {
    throw new NotFoundError("Invalid stripe customer");
  }
  const promotionCode = await getPromotionCodeId(promoCode);
  const promotionCodeId = promotionCode?.id;
  const subscriptions = customer.subscriptions?.data;
  // FIND SUBSCRIPTION BASED ON PATIENT
  const existingSubscription =
    subscriptions && subscriptions.length > 0 ? subscriptions[0] : null;
  const subscription = existingSubscription
    ? await stripe.subscriptions.retrieve(existingSubscription.id, {
      expand: ["latest_invoice.payment_intent"],
    })
    : await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: SUBSCRIPTION_PRICE_ID }],
      expand: ["latest_invoice.payment_intent"],
      promotion_code: promotionCodeId,
      payment_behavior: "default_incomplete",
    });

  const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
  const paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent;
  return {
    subscriptionId: subscription.id,
    clientSecret: paymentIntent.client_secret,
  };
};

export const confirmPayment = async (user: User, paymentIntentId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== "succeeded") {
    throw new BadRequestError("Unable to confirm payment for subscription");
  }

  // Validate payment here
  // Mark customer subscription as ACTIVE
  const customerId = paymentIntent.customer as string;
  const paymentMethodId = paymentIntent.payment_method as string;
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });
  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
  await Patient.query()
    .where({ id: user.patient?.id })
    .patch({ subscriptionStatus: "ACTIVE" });

  // TODO(sbb): Replace with appropriate email call
  // markSendgridSubscription(user.email);
};

export const updatePaymentMethod = async (
  patient: Patient,
  paymentMethodId: string
) => {
  const customer = patient.stripeCustomerId as string;
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer,
  });
  stripe.customers.update(customer, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });
};

export const handleWebhookEvent = async (
  stripeSignature: string,
  body: Record<string, unknown>
) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      // @ts-ignore
      body,
      stripeSignature,
      webhookSecret
    );
  } catch (err) {
    throw new BadRequestError("Could not validate webhook event");
  }

  return false;
};

const getStripeCustomersByStatus = async (
  status: Stripe.Subscription.Status
) => {
  const subscriptions: Array<Stripe.Subscription> = [];
  for await (const subscription of stripe.subscriptions.list({ limit: 100 })) {
    if (subscription.status === status) {
      subscriptions.push(subscription);
    }
  }
  const emails = subscriptions.map((s) => s.customer);
  return emails;
};

export const getActiveCustomerIds = async () => {
  return await getStripeCustomersByStatus("active");
};

export const getPastDueCustomerIds = async () => {
  return await getStripeCustomersByStatus("past_due");
};
