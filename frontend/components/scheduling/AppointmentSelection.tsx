/**
 * Used to select an appointment time from a list of providers
 * and start times.
 */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { getAvailability } from "../../lib/api";
import {
  AvailabilitySlot,
  Provider,
} from "@healthgent/server/src/lib/api_types";
import DayPicker from "./DayPicker";
import { format } from "date-fns";
import Button from "../core/Button";
import TimePicker from "./TimePicker";
import ProviderPicker from "./ProviderPicker";
import OnboardingProviderPicker from "./OnboardingProviderPicker";

// const dateToStr = (date: Date) => date.toISOString().split("T")[0];
const dateToStr = (date: Date) => date.toLocaleDateString();

interface Props {
  onComplete: (timeslot: string) => void;
  isOnboarding?: boolean;
}

const AppointmentSelection: React.FC<Props> = ({
  onComplete,
  isOnboarding = false,
}) => {
  const { setBookingContext } = useAppContext();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState<Array<AvailabilitySlot>>([]);
  const [providers, setProviders] = useState<Array<Provider>>([]);

  const selectedDateStr = dateToStr(selectedDate);

  useEffect(() => {
    getAvailability().then((response) => {
      const sortedSlots = response.slots.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
      setSlots(sortedSlots);
      setProviders(response.providers);

      if (response.providers.length > 0) {
        const firstProvider = response.providers[0].providerId;
        setSelectedProviderId(firstProvider);

        if (sortedSlots.length > 0) {
          const firstSlot = sortedSlots.find(
            (s) => s.providerId === firstProvider
          );
          if (firstSlot) {
            setSelectedDate(new Date(firstSlot.date));
            setSelectedTimeSlot(firstSlot.timeslotId);
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    const currentSlots = slots.filter((s) => s.date === selectedDateStr);
    if (currentSlots.length > 0) {
      setSelectedTimeSlot(currentSlots[0].timeslotId);
    } else {
      setSelectedTimeSlot("");
    }
  }, [selectedDate]);

  const onDayChange = (date: Date) => {
    setSelectedDate(date);
  };

  const getCorrectDate = () => {
    const slot = slots.find(
      (s) => s.timeslotId === selectedTimeSlot
    ) as AvailabilitySlot;
    return new Date(slot.startTime);
  };

  const onContinueClick = () => {
    if (!selectedTimeSlot) {
      return;
    }
    setBookingContext({
      slotId: selectedTimeSlot,
      slotDate: getCorrectDate(),
    });
    onComplete(selectedTimeSlot);
  };
  const timeSlots = slots.filter(
    (s) => s.date === selectedDateStr && s.providerId === selectedProviderId
  );
  const enabledDays = slots.map((s) => new Date(s.date));

  const earliestDate = slots.length > 0 ? new Date(slots[0].date) : undefined;
  const earliestDay = earliestDate ? format(earliestDate, "cccc") : undefined;

  const selectedTimeSlotStart = selectedTimeSlot
    ? new Date(
      slots.find((s) => s.timeslotId === selectedTimeSlot)
        ?.startTime as string
    )
    : new Date();

  const selectedDateFormat =
    format(selectedTimeSlotStart, "MMMM do, y") +
    " at " +
    new Date(selectedTimeSlotStart).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
      timeZoneName: "short",
    });

  const ProviderPickerComponent = isOnboarding
    ? OnboardingProviderPicker
    : ProviderPicker;

  return (
    <div>
      <h1 className="text-2xl mb-2 text-center">
        Please schedule a convenient time to see your provider.
      </h1>
      {earliestDay ? <div className="mt-1 font-light text-center"></div> : null}
      <ProviderPickerComponent
        providers={providers}
        selectedProviderId={selectedProviderId}
        onProviderChange={setSelectedProviderId}
      />
      <div className="grid grid-cols-1">
        <DayPicker
          selectedDay={selectedDate}
          onDayChange={onDayChange}
          enabledDays={enabledDays}
        />
      </div>
      <div className="mx-4">
        <TimePicker
          slots={timeSlots}
          selectedSlotId={selectedTimeSlot}
          setSelectedSlot={setSelectedTimeSlot}
        />
        <div className="text-lg text-center font-semibold">
          Confirm your appointment
        </div>
        <div className="text-center mt-2 mb-4">{selectedDateFormat}</div>
        <Button
          className={"w-full"}
          onClick={onContinueClick}
          disabled={!selectedTimeSlot}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AppointmentSelection;
