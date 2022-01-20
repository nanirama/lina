/**
 * Shows a list of the chart notes on the patient chart, wrapping each in an expandable card.
 */

import { Note } from "@healthgent/server/src/lib/api_types";
import React from "react";
import ExpandableCard from "../core/ExpandableCard";
import PatientNote from "./PatientNote";

interface Props {
  notes: Array<Note>;
}

const ChartNotes: React.FC<Props> = ({ notes }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="font-semibold text-lg">Previous notes</span>
      {notes
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((n) => (
          <ExpandableCard
            key={n.id}
            title={`Chart Note: ${new Date(n.timestamp).toDateString()} from ${n.providerName
              }`}
          >
            <PatientNote note={n} />
          </ExpandableCard>
        ))}
    </div>
  );
};

export default ChartNotes;
