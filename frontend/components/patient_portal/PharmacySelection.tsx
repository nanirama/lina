/**
 * Component used in onboarding and in patient portal for the patient
 * to select a pharmacy preference.
 */
import React, { useState } from "react";
import cx from "classnames";
import { Pharmacy } from "@healthgent/server/src/lib/api_types";
import Button from "../core/Button";

interface Props {
  pharmacies: Array<Pharmacy>;
  onSelectPharmacy: (s: string) => void;
}

const PharmacySelection: React.FC<Props> = ({
  pharmacies,
  onSelectPharmacy,
}) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const [maxResults, setMaxResults] = useState(5);
  const addResults = () => setMaxResults((prev) => prev + 5);

  const roundDistance = (d: number) => Math.trunc(d * 100) / 100;
  const onClick = () => onSelectPharmacy(selectedPharmacy);
  return (
    <div className="w-full">
      <div className="">
        {pharmacies.slice(0, maxResults).map((p) => (
          <div
            key={p.pharmNcpdpId}
            className={cx(
              "flex text-sm",
              "p-4 mb-2 text-center rounded border",
              selectedPharmacy === p.pharmNcpdpId
                ? "border-coral-400 hover:border-coral-500"
                : "border-coral-200 hover:border-coral-400"
            )}
            onClick={() => setSelectedPharmacy(p.pharmNcpdpId)}
          >
            <div className="flex flex-col text-left mr-4">
              <span>{p.name}</span>
              <span className="text-xs">
                {p.street}{" "}
                <span className="text-blueGray-500">
                  {p.distance ? `(${roundDistance(p.distance)} mi)` : null}
                </span>
              </span>
              <span className="text-xs">
                {p.city} {p.state} {p.zip}
              </span>
            </div>
            <input
              type="checkbox"
              readOnly
              className="ml-auto mr-2 my-auto rounded-full text-coral border-gray-200"
              checked={p.pharmNcpdpId === selectedPharmacy}
            />
          </div>
        ))}
        <Button onClick={addResults} outline className="w-full">
          Find more pharmacies
        </Button>
      </div>

      <div className="hidden flex text-sm justify-between items-center mt-3">
        <hr className="w-full" />
        <span className="p-2 text-gray-400 mb-1">OR</span>
        <hr className="w-full" />
      </div>
      <div
        className={cx(
          "hidden p-4 mb-2 text-center rounded border",
          selectedPharmacy === "mail-order"
            ? "border-coral-400 hover:border-coral-500"
            : "border-coral-200 hover:border-coral-400"
        )}
        onClick={() => setSelectedPharmacy("mail-order")}
      >
        <div className={cx("flex flex-col text-left mr-4")}>
          Mail order pharmacy <br />
          <span className="text-xs">
            We&apos;ll send any prescriptions from our mail order pharmacy, with
            free shipping.
          </span>
        </div>

        <input
          type="checkbox"
          className="ml-auto mr-2 my-auto rounded-full text-coral border-gray-200"
          checked={selectedPharmacy === "mail-order"}
          readOnly
        />
      </div>
      <Button
        className="mt-2 w-full"
        onClick={onClick}
        disabled={!selectedPharmacy}
      >
        Continue
      </Button>
    </div>
  );
};

export default PharmacySelection;
