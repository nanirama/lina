/**
 * Used to display a list of criteria for password strength
 * e.g. length, upper/lower case, as a number
 */
import React, { useState } from "react";
import Requirement from "./Requirement";

interface Props {
  password?: string;
}

const PasswordStrength: React.FC<Props> = ({ password }) => {
  if (password === undefined) {
    return <></>;
  }
  // TODO(sbb): pass this from above
  const longEnough = password.length >= 8;
  const hasUppercase = !!password.match("[A-Z]");
  const hasLowercase = !!password.match("[a-z]");
  const hasNumber = !!password.match("[0-9]");
  return (
    <div className="ml-1 mt-1">
      <Requirement
        isValid={longEnough}
        validMessage="is at least 8 characters long"
        invalidMessage="is at least 8 characters long"
      />
      <Requirement
        isValid={hasUppercase}
        validMessage="has at least 1 uppercase letter"
        invalidMessage="has at least 1 uppercase letter"
      />
      <Requirement
        isValid={hasLowercase}
        validMessage="has at least 1 lowercase letter"
        invalidMessage="has at least 1 lowercase letter"
      />
      <Requirement
        isValid={hasNumber}
        validMessage="has at least 1 number"
        invalidMessage="has at least 1 number"
      />
    </div>
  );
};

export default PasswordStrength;
