// @ts-nocheck
/**
 * This is used to see/remove availability in a Calendar view. It uses react-big-calendar
 * under the hood, which isn't particularly Typescript friendly. This will show slots of time
 * in the user's local timezone.
 */
import React, { useState } from "react";
import {
  Calendar as ReactCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import locales from "date-fns/locale/en-US";
import {
  ProviderAppointment,
  ProviderSlot,
} from "@healthgent/server/src/lib/api_types";
import { markAvailability, removeAvailability } from "../../lib/api";
import Modal from "../Modal";
import ClientScheduleModal from "./ClientSchedule";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Props {
  appointments?: Array<ProviderAppointment>;
  slots?: Array<ProviderSlot>;
  onUpdate?: () => void;
  slotLength?: number;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  desc: string;
  appointment: ProviderAppointment;
}

const EventModal: React.FC<{
  event: CalendarEvent;
  closeModal: () => void;
}> = ({ event, closeModal }) => {
  const onClick = () => {
    removeAvailability(event.id).then(closeModal);
  };
  return (
    <Modal onClose={closeModal}>
      <div className="flex flex-col">
        <div className="items-center justify-center flex space-x-2 text-xl mb-4">
          <span>{event.start.toLocaleDateString()}</span>
          <span>-</span>
          <span>{event.start.toLocaleTimeString()}</span>
        </div>
        <div>
          {event.appointment ? (
            <span>
              You have an appointment with{" "}
              <b>{event.appointment.patientName}</b> scheduled at this time.
              Please contact the Healthgent team if you need to cancel.
            </span>
          ) : (
            <div>
              You have no appointments scheduled for this time slot.
              <button
                className="secondary-button-red w-full h-12 mt-2"
                onClick={onClick}
              >
                Remove availability
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

const CustomToolbar = ({ onNavigate, label, onView, ...props }) => (
  <div className="rbc-toolbar flex">
    <div>
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate("PREV")}>
          Previous Week
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={() => onNavigate("NEXT")}>
          Next Week
        </button>
      </span>
    </div>
  </div>
);

const Calendar: React.FC<Props> = ({ slots, onUpdate, slotLength }) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();
  const [showClientModal, setShowClientModal] = useState(false);

  const handleSelectSlot = (params: any) => {
    const selectedSlots = (params.slots ?? []) as Array<Date>;
    if (selectedSlots.length < 2) {
      return;
    }
    const currentTime = new Date();
    const hasTimeInPast = selectedSlots
      .map((d) => d <= currentTime)
      .some((f) => f);
    if (hasTimeInPast) {
      return;
    }
    markAvailability(selectedSlots.slice(0, -1), slotLength).then(onUpdate);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const events: Array<CalendarEvent> =
    slots?.map((s) => ({
      id: s.slotId,
      title: s.appointment ? `Appointment - ${s.appointment.patientName}` : "",
      start: new Date(s.slotStart),
      end: new Date(s.slotEnd),
      desc: "Availability",
      appointment: s.appointment,
    })) || [];

  const eventPropGetter = (event: CalendarEvent) => {
    if (event.appointment) {
      return {
        style: { backgroundColor: "#3174ad" },
      };
    }
    return {
      // className: "",
      style: {
        opacity: 0.6,
        backgroundColor: "#aaaaaa",
        borderColor: "#777777",
      },
    };
  };

  const timezone = new Date()
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")[2];

  return (
    <div className="container">
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          closeModal={() => {
            setSelectedEvent(undefined);
            onUpdate();
          }}
        />
      )}
      {showClientModal && (
        <ClientScheduleModal
          closeModal={() => {
            setShowClientModal(false);
            onUpdate();
          }}
        />
      )}
      <div className="flex items-center w-full">
        <div className="text-center mb-2 font-bold">
          {`Note: All times are in your local timezone (${timezone}).`}
        </div>
        <button
          className="hidden primary-button-blue self-end ml-auto"
          onClick={() => setShowClientModal(true)}
        >
          Schedule Followup
        </button>
      </div>

      <ReactCalendar
        className="w-full"
        selectable
        localizer={localizer}
        events={events}
        defaultView="week"
        views={["week", "work_week"]}
        scrollToTime={new Date(2021, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        step={slotLength}
        timeslots={1}
        min={new Date(2021, 0, 1, 8, 0)} // 8am
        max={new Date(2021, 0, 1, 21, 0)} // 10pm
        slotPropGetter={(d) => ({
          className: "h-48",
        })}
        // @ts-ignore
        slotGroupPropGetter={(d) => ({
          className: "h-16 border",
        })}
        components={{
          // @ts-ignore
          toolbar: CustomToolbar,
        }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default Calendar;
