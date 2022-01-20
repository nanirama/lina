/**
 * Section of admin dashboard used to show/modify phone number.
 */

import React, { useState } from "react";
import { PhoneForm } from "@healthgent/common";
import Card from "../Card";
import Button from "../core/Button";

export const PhoneSection: React.FC<{
  phone: string;
  onSubmit: (p: string) => any;
}> = ({ phone, onSubmit }) => {
  const [edit, setEdit] = useState(false);
  const finishEdit = () => setEdit(false);
  return (
    <Card>
      <span className="mr-1 font-bold">Phone:</span>
      {edit ? (
        <PhoneForm
          phone={phone}
          onSubmit={(p: string) => onSubmit(p).then(finishEdit)}
        >
          <div className="flex space-x-2">
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </div>
        </PhoneForm>
      ) : (
        <>
          {phone}
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
