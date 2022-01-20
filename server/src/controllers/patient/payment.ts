/**
 * Endpoints relating to payment. Please read the Stripe API reference
 *  to learn more about how this works
 * https://stripe.com/docs/api/subscriptions
 */
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { markSubscription } from "../../lib/facebook";
import {
  confirmPayment,
  createSubscription,
  handleWebhookEvent,
  updatePaymentMethod as updatePaymentMethodLogic,
} from "../../logic/stripe";
import { Patient } from "../../models/patient";

export const createIntent = async (req: Request, res: Response) => {
  const { clientSecret } = await createSubscription(
    req.context.user,
    req.query.promotionCode as string
  );
  res.json({ success: true, clientSecret: clientSecret });
};

export const confirmPaymentMethod = async (req: Request, res: Response) => {
  await confirmPayment(req.context.user, req.body.paymentIntentId);
  res.json({ success: true });

  // Mark FB conversion event
  const { email, phone } = req.context.user;
  const userAgent = req.headers["user-agent"];
  markSubscription({ email, phone, userAgent });
};

export const updatePaymentMethod = async (req: Request, res: Response) => {
  await check("paymentMethodId", "Payment method required").isString().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.throw();
  }
  await updatePaymentMethodLogic(
    req.context.user.patient as Patient,
    req.body.paymentMethodId
  );
  res.json({ success: true });
};

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  const handled = await handleWebhookEvent(sig as string, req.body);
  if (!handled) {
    res.status(400).json({ received: false });
  } else {
    res.json({ received: true });
  }
};
