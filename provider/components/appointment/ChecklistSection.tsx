/**
 * List of tasks a provider should perform before seeing a patient,
 * e.g. check their ID and address.
 */
import React from "react";
import {
  Address,
  AppointmentChecklist,
} from "@healthgent/server/src/lib/api_types";
import ExpandableCard from "../core/ExpandableCard";
import { formatAddress } from "../../lib/util";
import Link from "next/link";

interface Props {
  checklist: AppointmentChecklist;
  onChange: (c: AppointmentChecklist) => any;
  licensePictureUrl?: string;
  address: Address;
  clientId: string;
}

type ChecklistKey = keyof AppointmentChecklist;

const ChecklistSection: React.FC<Props> = ({
  clientId,
  checklist,
  onChange,
  licensePictureUrl,
  address,
}) => {
  const updateItem = (key: ChecklistKey, value: boolean) => {
    onChange({ ...checklist, [key]: value });
  };
  return (
    <ExpandableCard title="Checklist" startOpen={true}>
      <form className="flex flex-col space-y-2">
        <div className="flex items-center">
          <label htmlFor="verifiedIdentity">
            Does the patient match the person in the ID photo below?
          </label>
          <input
            type="checkbox"
            id="verifiedIdentity"
            className="ml-2"
            checked={checklist.verifiedIdentity}
            onChange={(e) => updateItem("verifiedIdentity", e.target.checked)}
          />
        </div>
        <ExpandableCard title="ID photo" startOpen={false}>
          <img src={licensePictureUrl} />
          <span className="mt-2 text-sm font-semibold">
            Please report this visit to the Healthgent operations team
            immediately if the photo does not match the person on the video
            call.
          </span>
        </ExpandableCard>

        <div className="flex items-center">
          <label htmlFor="verifiedAddress">
            Is the address below up to date?
          </label>
          <input
            type="checkbox"
            id="verifiedAddress"
            className="ml-2"
            checked={checklist.verifiedAddress}
            onChange={(e) => updateItem("verifiedAddress", e.target.checked)}
          />
        </div>
        <ExpandableCard title="Address" startOpen={true}>
          {formatAddress(address)}
          <span>
            Not up to date?{" "}
            <Link href={`/client/${clientId}/edit`}>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Edit their address
              </a>
            </Link>
          </span>
        </ExpandableCard>
      </form>
    </ExpandableCard>
  );
};

export default ChecklistSection;
