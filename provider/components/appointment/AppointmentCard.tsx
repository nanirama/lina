/**
 * UNUSED COMPONENT
 * feel free to delete
 */
import Link from "next/link";
import React from "react";
import cx from "classnames";
import { AppointmentStatus } from "@healthgent/server/src/lib/api_types";

interface Props {
  date: Date;
  name: string;
  editLink: string;
  videoLink: string;
  status: AppointmentStatus;
}

const AppointmentCard: React.FC<Props> = ({
  date,
  name,
  editLink,
  videoLink,
  status,
}) => {
  const dateStr = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const link = videoLink ?? "https://doxy.me/account/dashboard";

  const getColorFromStatus = (s: AppointmentStatus) => {
    if (s === "CANCELED" || s === "LATE_CANCELED" || s === "NO_SHOW") {
      return "text-red-500";
    }
    if (s === "PENDING") {
      return "text-orange-500";
    }
    return "text-green-500";
  };
  const statusToReadable = (s: string) =>
    s
      .split("_")
      .map((w) =>
        w
          .toLowerCase()
          .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())
      )
      .join(" ");
  return (
    <div className="flex flex-wrap mb-2">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded xl:mb-0 shadow-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-gray-500 uppercase font-bold text-xs">
                  Upcoming Appointment
                </h5>
                <span className="font-semibold text-xl text-gray-800">
                  {name} -{dateStr} @{timeStr}
                </span>
              </div>
              <div className="w-auto pl-4 flex flex-col ">
                <Link href={editLink}>
                  <button className="secondary-button-blue w-32 mb-2">
                    View Details
                  </button>
                </Link>
                <a href={link} target="_blank" rel="noreferrer">
                  <button className="primary-button-blue w-32">
                    Join Video
                  </button>
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              <span className={cx("mr-2", getColorFromStatus(status))}>
                {statusToReadable(status)}
              </span>

              {/* <span className="whitespace-no-wrap">Since last month</span> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
