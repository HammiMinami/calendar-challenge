import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import "./DatePicker.css";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const date = {
    year: currentYear,
    month: currentMonth,
    day: new Date().getDate(),
  };

  const handleDateChange = (year, month, day) => {
    setSelectedDate({ year, month, day });
    setCalendarVisible(false);
  };

  const handleMonthChange = (newYear, newMonth) => {
    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
  };

  const formatDate = (selectedDate) => {
    if (!selectedDate) return "";

    const { year, month, day } = selectedDate;
    const dateSelect = new Date(Date.UTC(year, month, day));
    const dateSelectResult = dateSelect.toISOString().split("T")[0];

    return `${dateSelectResult}`;
  };

  return (
    <div className="date-picker">
      <input
        className="date-picker-input"
        onClick={() => setCalendarVisible(!calendarVisible)}
        value={formatDate(selectedDate)}
        placeholder="Pick a Date"
        type="text"
        readOnly
      />
      {calendarVisible && (
        <div className="calendar-container">
          <Calendar
            date={date}
            onMonthChange={handleMonthChange}
            onSelect={handleDateChange}
            selectedDate={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
