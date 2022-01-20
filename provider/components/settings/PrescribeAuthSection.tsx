/**
 * Section of admin dashboard used to request eprescribe OAuth permissions from the user.
 */

import React from "react";
import Card from "../Card";
import Button from "../core/Button";

interface Props {
  canPrescribe?: boolean;
}

const PrescribeAuthSection: React.FC<Props> = ({ canPrescribe }) => {
  const treatBaseUrl = process.env.NEXT_PUBLIC_TREAT_OAUTH_BASE_URL;
  const treatClientId = process.env.NEXT_PUBLIC_TREAT_CLIENT_ID;
  return (
    <Card className="flex flex-col space-y-2">
      <div>
        {canPrescribe
          ? "You are authorized to ePrescribe from Healthgent EMR"
          : "You have not yet completed authorization required to prescribe from the Healthgent EMR, please click below."}
      </div>
      <a
        href={`${treatBaseUrl}/oauth/authorize?clientId=${treatClientId}&responseType=authorizationCode&state=102&scope=full`}
      >
        <Button>E-prescribe Login</Button>
      </a>
    </Card>
  );
};

export default PrescribeAuthSection;
