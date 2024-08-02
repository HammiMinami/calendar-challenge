import React, { useState } from "react";
import Calendar from "../../components/Calendar/Calendar";
import "./App.css";
import DatePicker from "../../components/DatePicker/DatePicker";

const App = () => {
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
    setCalendarVisible(calendarVisible);
  };

  const handleMonthChange = (newYear, newMonth) => {
    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
  };

  const formatDate = (selectedDate) => {
    const d = new Date(Date.UTC(date.year, date.month, date.day));
    const dResult = d.toISOString().split("T")[0];

    if (!selectedDate) {
      return `${dResult}`;
    }

    const { year, month, day } = selectedDate;
    const dateSelect = new Date(Date.UTC(year, month, day));
    const dateSelectResult = dateSelect.toISOString().split("T")[0];

    return `${dateSelectResult}`;
  };

  return (
    <div className="App">
      <div>
        <Calendar
          date={date}
          onMonthChange={handleMonthChange}
          onSelect={handleDateChange}
          selectedDate={selectedDate}
        />
        <div className="calendar-date">
          <span className="date">DATE:</span> {formatDate(selectedDate)}
        </div>
      </div>

      <div>
        <DatePicker />
      </div>
    </div>
  );
};

export default App;
