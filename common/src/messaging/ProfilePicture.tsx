/**
 * Used to display a rounded profile picture for a user (patient/provider/support team)
 */
import React from "react";

interface Props {
  url?: string;
  initials: string;
}

const ProfilePicture: React.FC<Props> = ({ url, initials }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-12 h-12">
        {url ? (
          <img
            src={url}
            alt="..."
            className="shadow rounded-full w-12 h-12 align-middle border-none"
          />
        ) : (
          <div className="shadow rounded-full w-12 h-12 align-middle border-none bg-blue-400 text-white font-semibold">
            <div className="flex w-full h-full items-center justify-center text-uppercase">
              {initials}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
