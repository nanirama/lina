/**
 * Card displayed if the user is behind on subscription or inactive.
 */
import React from "react";
import { SubscriptionStatus } from "@healthgent/server/src/lib/api_types";
import Card from "../core/Card";
import Link from "next/link";

interface Props {
  subscriptionStatus?: SubscriptionStatus;
}

const SubscriptionStatusCard: React.FC<Props> = ({ subscriptionStatus }) => {
  if (subscriptionStatus === "PAST_DUE") {
    return (
      <Card className="mb-4">
        <span className="text-red-400 text-sm">
          Please update your payment information in the profile tab{" "}
          <Link href="/patient_portal/profile">
            <a className="underline hover:no-underline" href="#">
              here
            </a>
          </Link>{" "}
          in order to keep your subscription active.
        </span>
      </Card>
    );
  }
  return <></>;
};

export default SubscriptionStatusCard;
