/**
 * Shown on the top of a patient chart, displays
 * demographic information as well as personal information
 * such as address/emergency contact.
 */
import React from "react";
import Card from "../Card";
import Link from "next/link";
import { formatAddress, getFormattedBirthdate } from "../../lib/util";

interface Props {
  clientId: string;
  name: string;
  gender: string;
  phone: string;
  email: string;
  birthday: string;
  emergencyContact: {
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber: string;
  };
  address: {
    streetAddress: string;
    unitNumber?: string;
    city: string;
    state: string;
    zip: string;
  };
}

const PatientInfo: React.FC<Props> = ({
  name,
  gender,
  phone,
  email,
  emergencyContact,
  address,
  clientId,
  children,
  birthday,
}) => {
  const birthdayStr = getFormattedBirthdate(birthday);
  return (
    <Card>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex flex-col">
          <Link href={`/client/${clientId}/overview`}>
            <a href="#" className="text-2xl underline hover:no-underline">
              {name}
            </a>
          </Link>
          <span className="mb-2">
            {gender} - {birthdayStr}
          </span>
          {children}
        </div>
        <div className="flex flex-col space-y-2">
          <div>
            <span className="mr-2 font-semibold">Contact: </span>
            <span>
              <a
                className="text-blue-500 hover:underline"
                href={`tel:${phone}`}
              >
                {phone}
              </a>{" "}
              /{" "}
              <a
                className="text-blue-500 hover:underline"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </span>
          </div>

          <div>
            <span className="mr-2 font-semibold">Address: </span>
            <span className="">{formatAddress(address)}</span>
          </div>
          <div>
            <span className="mr-2 font-semibold">Emergency Contact:</span>
            <span className="mr-2">
              {emergencyContact.firstName} {emergencyContact.lastName} (
              {emergencyContact.relationship})
            </span>
            <a
              className="text-blue-500 hover:underline"
              href={`tel:${emergencyContact.phoneNumber}`}
            >
              {emergencyContact.phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientInfo;
