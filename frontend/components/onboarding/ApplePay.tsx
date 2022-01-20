/**
 * Apple Pay component wrapping Stripe's PaymentRequestButton
 */
import React, { useEffect, useState } from "react";
import { PaymentIntentResult, PaymentRequest } from "@stripe/stripe-js";
import {
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";

interface Props {
  totalCents: number;
  clientSecret?: string;
  onConfirmPayment: (pi: PaymentIntentResult) => Promise<unknown>;
}

const ApplePay: React.FC<Props> = ({
  totalCents,
  clientSecret,
  onConfirmPayment,
}) => {
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>();
  const stripe = useStripe();
  useEffect(() => {
    if (stripe && totalCents) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Lina Subscription",
          amount: totalCents,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, totalCents]);

  useEffect(() => {
    if (!stripe || !paymentRequest || !onConfirmPayment || !clientSecret) {
      return;
    }
    paymentRequest.on("paymentmethod", async (ev) => {
      ev.complete("success");
      await stripe
        .confirmCardPayment(
          clientSecret,
          {
            payment_method: ev.paymentMethod.id,
          },
          { handleActions: false }
        )
        .then(onConfirmPayment);
    });
  }, [paymentRequest, onConfirmPayment]);

  if (paymentRequest) {
    return (
      <>
        <PaymentRequestButtonElement options={{ paymentRequest }} />
        <div className="text-xs my-1 text-center">or pay with card</div>
      </>
    );
  }
  return null;
};

export default ApplePay;
