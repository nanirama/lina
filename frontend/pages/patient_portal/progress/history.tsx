/**
 * Show chart with time series of PHQ/GAD scores over time
 */
import { NextPage } from "next";
import React, { useState } from "react";
import TimeseriesChart from "../../../components/progress_tracking/TimeseriesChart";
import { Tab, Tabs } from "@healthgent/common/src/components/tabs";
import BasePatientPortalView from "../../../components/patient_portal/BasePatientPortalView";
import useSWR from "swr";
import { getProgressHistory } from "../../../lib/api";

interface Props { }

const History: NextPage<Props> = () => {
  const { data: gadData } = useSWR("progress_history_anxiety", () =>
    getProgressHistory("anxiety")
  );
  const { data: phqData } = useSWR("progress_history_depression", () =>
    getProgressHistory("depression")
  );
  const [selectedTab, setSelectedTab] = useState("Anxiety");

  return (
    <BasePatientPortalView>
      <div className="max-w-xl">
        <div className="text-2xl mb-4 text-center mx-">
          Your treatment history
        </div>
        <div className="mb-8">
          The scores below are measures of anxiety and depression calculated
          from the GAD-7 and PHQ-9 questionnaires. Your care team uses this to
          ensure your treatment plan is on track.
        </div>
        <div className="mb-4">
          <Tabs onSelectedChange={setSelectedTab}>
            <Tab label="Anxiety" />
            <Tab label="Depression" />
          </Tabs>
        </div>
        {selectedTab === "Anxiety" ? (
          <TimeseriesChart
            label="GAD-7 (Anxiety) Score"
            data={gadData?.history ?? []}
            minValue={gadData?.minScore}
            maxValue={gadData?.maxScore}
          />
        ) : (
          <TimeseriesChart
            label="PHQ-9 (Depression) Score"
            data={phqData?.history ?? []}
            minValue={phqData?.minScore}
            maxValue={phqData?.maxScore}
          />
        )}
      </div>
    </BasePatientPortalView>
  );
};

export default History;
