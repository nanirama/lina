/**
 * Used to pick a time slot from a list of appointment times
 */
import React from "react";
import { AvailabilitySlot } from "../../../server/src/lib/api_types";
import cx from "classnames";

interface Props {
  slots: Array<AvailabilitySlot>;
  setSelectedSlot: (s: string) => unknown;
  selectedSlotId?: string;
}

const TimePicker: React.FC<Props> = ({
  slots,
  selectedSlotId,
  setSelectedSlot,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 mx-4 my-2">
        {slots.map((s) => (
          <div
            className={cx(
              "p-1 m-1 text-center rounded-full border",
              selectedSlotId === s.timeslotId
                ? "border-coral-500 hover:border-coral-600"
                : "border-coral-200 hover:border-coral-300"
            )}
            key={s.timeslotId}
            onClick={() => setSelectedSlot(s.timeslotId)}
          >
            {new Date(s.startTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
              minute: "numeric",
            })}
          </div>
        ))}
      </div>
      {slots.length === 0 ? (
        <div className="text-center text-sm my-2">
          Sorry, no slots are available on this day.
        </div>
      ) : null}
    </>
  );
};

export default TimePicker;
