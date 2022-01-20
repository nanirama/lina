// @ts-nocheck

/**
 * Shows a patient chart note. Will display if the chart note is locked or not.
 */

import { Note } from "@healthgent/server/src/lib/api_types";
import React from "react";

interface Props {
  note: Note;
}

const PatientNote: React.FC<Props> = ({ note }) => {
  const n = note;
  if (!n) {
    return <div />;
  }
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: n.data.content }} />
      {n.locked && (
        <div className="text-gray-600 mt-2 font-semibold">
          Note signed and locked on{" "}
          {`${new Date(n?.lockTime).toLocaleDateString()} at ${new Date(
            n?.lockTime
          ).toLocaleTimeString()}.`}
        </div>
      )}
    </div>
  );
};

export default PatientNote;
