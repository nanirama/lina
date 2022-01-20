/**
 * Component showing bill, payment button, and additional information
 * to patient during checkout.
 */
import { DiscountCode } from "@healthgent/server/src/lib/api_types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  StripeCardElementChangeEvent,
  StripeCardElement,
  PaymentIntentResult,
} from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { confirmPayment, getStripeClientSecret } from "../../lib/api";
import Bill from "./Bill";
import addMonths from "date-fns/addMonths";
import Link from "next/link";
import Button from "../core/Button";
import ApplePay from "./ApplePay";

interface Props {
  onComplete: () => void;
  discountCode?: DiscountCode;
}

const discountCodeToDiscount = (code: DiscountCode) => {
  if (code === "50OFF") {
    return {
      label: "First month discount (50OFF)",
      amount: -50,
      displayPrice: "-$50",
      subtext: false,
    };
  } else {
    return {
      label: "First month discount (FIRSTMO5)",
      amount: -90,
      displayPrice: "-$90",
      subtext: false,
    };
  }
};

const Payment: React.FC<Props> = ({ onComplete, discountCode }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string>();
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const subscriptionItems = [
    {
      label: "Lina subscription",
      amount: 95,
      displayPrice: "$95/mo",
      subtext: false,
    },
    {
      label: "MD Consultation",
      amount: 0,
      displayPrice: "Included",
      subtext: true,
    },
    {
      label: "Care Monitoring",
      amount: 0,
      displayPrice: "Included",
      subtext: true,
    },
    {
      label: "Treatment Adjustments",
      amount: 0,
      displayPrice: "Included",
      subtext: true,
    },
    {
      label: "Unlimited Provider Messaging",
      amount: 0,
      displayPrice: "Included",
      subtext: true,
    },
    {
      label: "Medication",
      amount: 0,
      displayPrice: "Charged Later",
      subtext: false,
    },
    {
      label: "Shipping",
      amount: 0,
      displayPrice: "Included",
      subtext: true,
    },
  ];
  const discountItems =
    discountCode !== undefined ? [discountCodeToDiscount(discountCode)] : [];

  const lineItems = [...subscriptionItems, ...discountItems];
  const totalCents = lineItems
    .map((item) => item.amount * 100)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    getStripeClientSecret(discountCode).then(setClientSecret);
  }, []);
  const onConfirmPayment = async (result: PaymentIntentResult) => {
    const { error, paymentIntent } = result;
    if (error) {
      setError(`Payment failed ${error.message}`);
      setSucceeded(false);
    } else {
      await confirmPayment(paymentIntent?.id as string)
        .then(() => setSucceeded(true))
        .then(onComplete)
        .catch((e) => setError(e.toString()));
    }
    setProcessing(false);
    setDisabled(false);
  };

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error?.message);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!stripe || !elements || processing) {
      return;
    }
    setProcessing(true);
    setError("");

    const cardElement = elements.getElement(CardElement) as StripeCardElement;

    return await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })
      .then(onConfirmPayment);
  };

  const cardStyle = {
    style: {
      base: {
        color: "#475569",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#94a3b8",
        },
      },
      invalid: {
        color: "#f87171",
        iconColor: "#f87171",
      },
    },
  };

  const buttonDisabled = processing || disabled || succeeded;
  const nextBillingCycleDate = addMonths(new Date(), 1).toLocaleDateString();
  return (
    <div className="flex flex-col align-center w-full">
      <div className="mb-3">
        <div className="text-2xl font-semibold text-center text-blueGray-800">
          Almost done!
        </div>
        <div className="text-sm text-center">
          Your subscription renews monthly. Cancel anytime.
          <br />
          <Link href="/onboarding/plans">
            <a href="#" className="underline">
              Learn more about our plans
            </a>
          </Link>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-8">
        <Bill lineItems={lineItems} />

        <div className="w-full border solid rounded-xl p-4 text-blueGray-500">
          <div className="text-center text-2xl font-semibold mb-2 text-blueGray-800">
            Payment
          </div>
          <ApplePay
            totalCents={totalCents}
            clientSecret={clientSecret}
            onConfirmPayment={onConfirmPayment}
          />
          <form id="payment-form" className="w-full" onSubmit={handleSubmit}>
            <CardElement
              id="card-element"
              className="placeholder-blueGray-500 relative bg-white rounded outline-none py-4 px-2 border-2 border-sand group-focus:border-sand-200 hover:border-sand-200 focus-within:border-sand-200"
              options={cardStyle}
              onChange={handleChange}
            />
            <Button
              disabled={buttonDisabled}
              id="submit-payment-button"
              className={"w-full mt-2 flex items-center justify-center"}
              processing={processing}
            >
              Submit
            </Button>

            {/* Show any error that happens when processing the payment */}
            {error && (
              <div className="text-red-400 text-center mt-1" role="alert">
                {error}
              </div>
            )}
          </form>
          <div className="mt-2 text-xs">
            If you&apos;re not satisfied with your treatment for any reason
            within 30 days, email us at support@hellolina.com and we&apos;ll
            give you a refund. Max one per person.
            <hr className="my-1" />
            The full $95 monthly fee will be charged on your next billing cycle
            ({nextBillingCycleDate}).
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
