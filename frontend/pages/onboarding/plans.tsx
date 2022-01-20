/**
 * Show different pricing plans for the user before payment
 */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { getAvailability } from "../../lib/api";
import { logEvent } from "../../lib/event_logging";
import { format } from "date-fns";
import Button from "../../components/core/Button";

interface Props { }

const Item: React.FC<{}> = ({ children }) => {
  return (
    <li className="mb-1 flex flex-shrink-0">
      <svg
        className="mr-2 w-5 h-5 flex-shrink-0 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        ></path>
      </svg>
      {children}
    </li>
  );
};

const Plans: React.FC<Props> = () => {
  const router = useRouter();
  const [availableDate, setAvailableDate] = useState<Date>();
  useEffect(() => {
    logEvent("view-plans");
  }, []);

  useEffect(() => {
    getAvailability().then((resp) => {
      console.log(resp);
      setAvailableDate(new Date(resp.slots[0].date));
    });
  }, []);

  const onClick = () => {
    router.push("/onboarding/payment");
  };
  return (
    <OnboardingContainer
      stage="checkout"
      percent={85}
      title="Lina - Questionnaire Results"
    >
      <div className="w-full max-w-xl">
        {/* <div className="text-center font-semibold text-xl mb-2">
          Your treatment plan
        </div> */}
        <div className="flex flex-col space-y-3 border rounded-xl p-4 mb-2">
          <div className="text-center font-semibold text-xl">
            Your treatment plan
          </div>
          <Item>
            Evaluation, diagnosis, and prescription by a medical provider
          </Item>
          <Item>Monthly medication delivery (if prescribed)</Item>
          <Item>Regular follow-ups and unlimited messaging</Item>
          <Item>No obligations, cancel anytime</Item>
          {availableDate !== undefined ? (
            <Item>
              <span>
                Book an appointment instantly for as early as this{" "}
                {format(availableDate, "cccc")}
                <sup>*</sup>
              </span>
            </Item>
          ) : null}
          {/* <s className="text-center">$95/month</s> */}
          <div className="text-center font-semibold text-lg">
            $45/month for first month
          </div>
          <div className="text-center text-sm">Just $95 a month after that</div>
          {/* <div className="text-center text-sm">
            Billed monthly <br />
            Cancel anytime
          </div> */}
          <Button onClick={onClick} className="w-full">
            Start Today
          </Button>
        </div>
        <div className="text-center leading-none mb-2">
          <span className="text-xs text-blueGray-500">
            <sup>*</sup>Due to high demand because of the COVID-19 pandemic, we
            only have a limited number of spots available per day.
          </span>
        </div>
        <div className="text-center">
          <Link href="/faq">
            <a href="#" className="underline">
              FAQs
            </a>
          </Link>
        </div>
      </div>
    </OnboardingContainer>
  );
};

export default Plans;
