/**
 * Section where patient can modify their address
 */
import React, { useState } from "react";
import { Address } from "@healthgent/server/src/lib/api_types";
import AddressForm from "@healthgent/common/src/forms/AddressForm";
import Button from "../core/Button";
import { updateAddress } from "../../lib/api";

interface Props {
  address?: Address;
  onComplete: () => void;
}

const AddressSection: React.FC<Props> = ({ address, onComplete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const onCompleteWithEdit = () => {
    onComplete();
    setIsEdit(false);
  };
  return (
    <div className="p-2">
      <div className="flex w-full">
        <div className="w-20 md:w-36 font-semibold">Address</div>

        {!isEdit ? <div>{address?.streetAddress}</div> : null}
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
        <AddressForm
          address={address}
          handleSubmit={(a) => updateAddress(a, false).then(onCompleteWithEdit)}
        >
          <Button type="submit">Save</Button>
          <Button onClick={() => setIsEdit(false)}>Cancel</Button>
        </AddressForm>
      ) : null}
    </div>
  );
};

export default AddressSection;
