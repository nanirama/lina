/**
 * Displays a calendar showing availability / booked appointments for the provider
 */
import React from "react";
import useSWR from "swr";
import { NextPage } from "next";
import BaseProviderView from "../components/core/BaseView";
import { getAvailability, getProfile } from "../lib/api";
import Card from "../components/Card";
import Calendar from "../components/scheduling/Calendar";

const Schedule: NextPage = () => {
  const { data, mutate } = useSWR("/provider/availability", getAvailability);
  const { data: profile } = useSWR("/provider/schedule/profile", getProfile);
  const slots = data ?? [];

  return (
    <BaseProviderView>
      <div className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Availability Schedule
      </div>
      <Card className="p-8 flex items-center justify-center">
        <Calendar
          slots={slots}
          onUpdate={() => mutate()}
          slotLength={profile?.slotLength}
        />
      </Card>
    </BaseProviderView>
  );
};

export default Schedule;
