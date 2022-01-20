/**
 * Section of admin dashboard used to modify password.
 */

import React from "react";
import { ChangePasswordForm } from "../../../common/src";
import Card from "../Card";
import Button from "../core/Button";

interface Props {
  updatePassword: (op: string, np: string) => Promise<unknown>;
}

const PasswordSection: React.FC<Props> = ({ updatePassword }) => {
  return (
    <Card>
      <span className="mr-2 font-bold">Password</span>
      <ChangePasswordForm handleSubmit={updatePassword}>
        <Button className="mt-2">Submit</Button>
      </ChangePasswordForm>
    </Card>
  );
};

export default PasswordSection;
