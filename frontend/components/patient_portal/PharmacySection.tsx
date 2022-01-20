/**
 * Section where patient can modify their pharmacy preference
 */
import React, { useState } from "react";
import useSWR from "swr";
import { getPharmacies, getPharmacy, setPharmacy } from "../../lib/api";
import Card from "../core/Card";
import PharmacySelection from "./PharmacySelection";

interface Props { }

const PharmacySection: React.FC<Props> = () => {
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit((e) => !e);
  const { data: pharmacy, mutate } = useSWR("/pharmacy", getPharmacy);
  const { data: pharmacies } = useSWR(
    // @ts-ignore
    edit ? "/pharmacies" : null,
    () => getPharmacies({ zip: pharmacy?.zip })
  );
  const onUpdatePharmacy = (pharmacyId: string) => {
    setPharmacy(pharmacyId)
      .then(() => setEdit(false))
      .then(() => mutate());
  };
  return (
    <Card className="flex items-center p-4 md:px-1 mt-4">
      <hr className="mb-2" />
      <div className="p-2 w-full">
        <div className="flex w-full">
          <div className="w-20 md:w-36 font-semibold">Pharmacy</div>
          {pharmacy?.name} - {pharmacy?.street}
          <a
            href="#"
            className="flex items-center uppercase text-sm font-semibold tracking-wide ml-auto"
            onClick={toggleEdit}
          >
            {edit ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
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
            )}
            {edit ? "cancel" : "edit"}
          </a>
        </div>
        <hr className="mb-2" />
        <div>
          {edit ? (
            <div className="mt-4">
              <PharmacySelection
                pharmacies={pharmacies || []}
                onSelectPharmacy={onUpdatePharmacy}
              />
            </div>
          ) : null}
        </div>
        <div className="text-xs text-center my-2">
          Note: changing your preference will only impact prescriptions sent in
          the future. Please contact the support team if you have not received a
          prescription at your current pharmacy.
        </div>
      </div>
    </Card>
  );
};

export default PharmacySection;
