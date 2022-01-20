/**
 * UNUSED COMPONENT
 * feel free to delete
 */

import React from "react";
import ReactDayPicker from "react-day-picker";
import startOfDay from "date-fns/startOfDay";

interface Props {
  availableDays: Array<Date>;
  selectedDate: Date;
  onDateChange: (d: Date) => any;
}

const DayPicker: React.FC<Props> = ({
  availableDays,
  selectedDate,
  onDateChange,
}) => {
  const style = `
    .DayPicker-Day--today {
          
    }
    .DayPicker-Day--hasappt {
      font-weight: bold;
    }
    .DayPicker {}
  `;
  const today = startOfDay(new Date());
  const disableDay = (day: Date) => day < today;
  const modifiers = {
    disabled: disableDay,
    hasappt: availableDays,
  };
  return (
    <>
      <style>{style}</style>
      <ReactDayPicker
        modifiers={modifiers}
        onDayClick={(d, { disabled }) => (!disabled ? onDateChange(d) : null)}
        selectedDays={selectedDate}
        todayButton="Today"
        onTodayButtonClick={(d) => onDateChange(d)}
      />
    </>
  );
};

export default DayPicker;
