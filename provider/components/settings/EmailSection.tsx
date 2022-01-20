/**
 * Section of admin dashboard used to show/modify email.
 */

import React, { useState } from "react";
import { EmailForm } from "@healthgent/common";
import Card from "../Card";
import Button from "../core/Button";

export const EmailSection: React.FC<{
  email: string;
  onSubmit: (email: string) => any;
}> = ({ email, onSubmit }) => {
  const [edit, setEdit] = useState(false);
  const finishEdit = () => setEdit(false);
  return (
    <Card>
      <span className="mr-1 font-bold">Email:</span>
      {edit ? (
        <EmailForm
          email={email}
          onSubmit={(p: string) => onSubmit(p).then(finishEdit)}
        >
          <div className="flex space-x-2">
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </div>
        </EmailForm>
      ) : (
        <>
          {email}
          <div
            className="ml-4 self-end underline"
            onClick={() => setEdit(true)}
          >
            Edit
          </div>
        </>
      )}
    </Card>
  );
};
