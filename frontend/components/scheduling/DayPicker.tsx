/**
 * Shows a calendar where a user can pick a day and see which days
 * appointments are available.
 */
import React from "react";
import ReactDayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import startOfDay from "date-fns/startOfDay";
import addMonths from "date-fns/addMonths";

interface Props {
  selectedDay: Date;
  onDayChange: (date: Date) => void;
  enabledDays: Array<Date>;
}

const DayPicker: React.FC<Props> = ({
  selectedDay,
  onDayChange,
  enabledDays,
}) => {
  const calendarStyle = `
    .DayPicker-Day {
    }
    .DayPicker-Day--before {
        background-color: orange;
        color: white;
    }
    .DayPicker-Day--today {
    }
    .DayPicker-Day--selected {
      background-color: #ff877a !important;
      border-radius: 100%;
      color: #374146;
      font-weight: light;
    }
    .DayPicker-Caption {

    }
    .DayPicker {
      border-style: solid;
      border-width: 1px;
      margin-top: 8px;
      margin-bottom: 8px;
      color: #374146;
    }
  `;

  const today = new Date();
  const disableDay = (day: Date) =>
    day.getDay() === 0 ||
    day.getDay() === 6 ||
    day < today ||
    enabledDays.find(
      (d) => startOfDay(d).getTime() === startOfDay(day).getTime()
    ) === undefined;

  const modifiers = {
    disabled: disableDay,
    selected: selectedDay,
  };
  const handleDayClick = (day: Date) => {
    if (disableDay(day)) {
      return;
    }
    onDayChange(day);
  };
  return (
    <div className="flex mx-auto items-center">
      <style>{calendarStyle}</style>
      <ReactDayPicker
        modifiers={modifiers}
        selectedDays={selectedDay}
        onDayClick={handleDayClick}
        // numberOfMonths={2}
        initialMonth={selectedDay}
        fromMonth={new Date()}
        toMonth={addMonths(new Date(), 1)}
      // showOutsideDays
      />
    </div>
  );
};

export default DayPicker;
