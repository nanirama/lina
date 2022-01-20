/**
 * Section of admin dashboard used to show an address.
 * NOTE: This is unused
 */

import React from "react";
import { Address } from "../../../server/src/lib/api_types";
import Card from "../Card";

interface Props {
  address: Address;
}

const AddressSection: React.FC<Props> = ({ address }) => {
  return (
    <Card className="flex flex-col">
      <span className="mr-1 font-bold">Address:</span>
      <span className="mt-2 text-xs italic">
        Please contact the Healthgent admin team if you want to change your
        address.
      </span>
    </Card>
  );
};

export default AddressSection;
