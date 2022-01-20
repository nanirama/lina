/**
 * Section where patient can modify their payment method
 */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  StripeCardElementChangeEvent,
  StripeCardElement,
} from "@stripe/stripe-js";
import React, { useState } from "react";
import Button from "../core/Button";

interface Props {
  onSubmit: (paymentMethodId: string) => Promise<unknown>;
}

const PaymentMethodSection: React.FC<Props> = ({ onSubmit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>();
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const onChange = (e: StripeCardElementChangeEvent) => {
    setDisabled(e.empty);
    setError(e.error?.message);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    if (processing) {
      return;
    }
    setProcessing(true);
    setSuccess(false);
    setError("");

    const cardElement = elements.getElement(CardElement) as StripeCardElement;
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (result.error) {
      setError(`Payment failed ${result.error.message}`);
      setSuccess(false);
    } else {
      await onSubmit(result.paymentMethod?.id as string)
        .then(() => setSuccess(true))
        .catch((err) => setError(err.toString()));
    }
    setProcessing(false);
  };
  return (
    <div className="p-2">
      <div className="flex w-full">
        <div className="w-20 md:w-36 font-semibold">Payment Information</div>

        {/* {!isEdit ? <div>Payment Information</div> : null} */}
        <a
          href="#"
          className="flex items-center uppercase text-sm font-semibold tracking-wide ml-auto"
          onClick={() => setIsEdit(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          edit
        </a>
      </div>
      <hr className="mb-2" />
      {isEdit ? (
        <form
          id="update-payment-form"
          className="w-full"
          onSubmit={handleSubmit}
        >
          <CardElement
            id="card-element"
            className="placeholder-blueGray-500 relative bg-white rounded outline-none py-4 px-2 border-2 border-sand group-focus:border-sand-200 hover:border-sand-200 focus-within:border-sand-200"
            onChange={onChange}
          />
          <Button
            disabled={disabled}
            processing={processing}
            type="submit"
            className="mt-4 w-full md:w-72"
          >
            Update Payment
          </Button>
        </form>
      ) : null}
      {error && (
        <div className="text-red-400 text-center mt-1" role="alert">
          {error}
        </div>
      )}
      {success ? (
        <div className="text-green-600 text-center text-sm">
          Successfully updated payment method!
        </div>
      ) : null}
    </div>
  );
};

export default PaymentMethodSection;
