import React, { useState } from "react";
import {
  shortMonthNames,
  shortWeekDays,
  weekDays,
} from "../../constants/calendar";
import "./Calendar.css";

const Calendar = ({ date, onMonthChange, onSelect, selectedDate }) => {
  const { year, month } = date;
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const [showYearCalendar, setShowYearCalendar] = useState(false);
  const [yearRange, setYearRange] = useState([
    Math.floor(year / 10) * 10,
    Math.floor(year / 10) * 10 + 11,
  ]);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  const generateCalendarDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfTheMonth = new Date(year, month, 1).getDay();
    const previousMonthDaysCount =
      weekDays[firstDayOfTheMonth] === "Sunday" ? 0 : firstDayOfTheMonth;
    const nextMonthDaysCounting =
      (7 - ((daysInMonth + previousMonthDaysCount) % 7)) % 7;
    const nextMonthDaysCount =
      nextMonthDaysCounting < 7
        ? 42 - (daysInMonth + previousMonthDaysCount)
        : nextMonthDaysCounting;

    const prevMonthDays = Array.from(
      { length: previousMonthDaysCount },
      (v, i) =>
        new Date(year, month, 0).getDate() - previousMonthDaysCount + i + 1
    );

    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (v, i) => i + 1
    );

    const nextMonthDays = Array.from(
      { length: nextMonthDaysCount },
      (v, i) => i + 1
    );

    const allofTheDays = [
      ...prevMonthDays.map((day) => ({
        day,
        month: month - 1,
        isCurrentMonth: false,
      })),
      ...currentMonthDays.map((day) => ({ day, month, isCurrentMonth: true })),
      ...nextMonthDays.map((day) => ({
        day,
        month: month + 1,
        isCurrentMonth: false,
      })),
    ];

    const rows = [];
    for (let i = 0; i < 6; i++) {
      rows.push(allofTheDays.slice(i * 7, i * 7 + 7));
    }

    return { rows, daysInMonth };
  };

  const { rows } = generateCalendarDays(year, month);

  const handleMonthChange = (direction) => {
    let newMonth = month + direction;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    onMonthChange(newYear, newMonth);
  };

  const handleYearChange = (direction) => {
    const newYear = year + direction;
    onMonthChange(newYear, month);
  };

  const handleMonthClick = (selectedMonth) => {
    onMonthChange(year, selectedMonth);
    setShowMonthCalendar(false);
  };

  const handleYearClick = (selectedYear) => {
    onMonthChange(selectedYear, month);
    setShowYearCalendar(false);
  };

  const handleYearRangeChange = (direction) => {
    const [startYear] = yearRange;
    const newStartYear = startYear + direction * 10;
    setYearRange([newStartYear, newStartYear + 11]);
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      onSelect(year, month, day);
    }
  };

  const yearPicker = () => {
    const years = Array.from({ length: 12 }, (v, i) => yearRange[0] + i);

    return (
      <div className="year-picker">
        <div className="year-picker-header">
          <button
            className="nav-button"
            onClick={() => handleYearRangeChange(-1)}
          >
            ❮
          </button>
          <span className="year-text-title">
            {yearRange[0]}-{yearRange[1]}
          </span>
          <button
            className="nav-button"
            onClick={() => handleYearRangeChange(1)}
          >
            ❯
          </button>
        </div>
        <div className="year-picker-display">
          {years.map((yr) => (
            <div
              key={yr}
              className={`year-picker-item${yr === year ? " selected" : ""}`}
              onClick={() => handleYearClick(yr)}
            >
              {yr}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const monthPicker = () => (
    <div className="month-picker">
      <div className="month-picker-header">
        <button className="nav-button" onClick={() => handleYearChange(-1)}>
          ❮
        </button>
        <span
          className={`year${year === currentYear ? " today" : ""}`}
          onClick={() => setShowYearCalendar(true)}
        >
          {year}
        </span>
        <button className="nav-button" onClick={() => handleYearChange(1)}>
          ❯
        </button>
      </div>
      <div className="month-picker-display">
        {shortMonthNames.map((monthName, index) => (
          <div
            key={index}
            className={`month-picker-item${index === month ? " selected" : ""}${
              index === currentMonth ? " today" : ""
            }`}
            onClick={() => handleMonthClick(index)}
          >
            {monthName}
          </div>
        ))}
      </div>
    </div>
  );

  const calendarView = () => {
    return (
      <div>
        <div className="calendar-header">
          <button className="nav-button" onClick={() => handleMonthChange(-1)}>
            ❮
          </button>
          <span
            className={`calendar-title ${
              year === currentYear && month === currentMonth ? "today" : ""
            }`}
            onClick={() => setShowMonthCalendar(true)}
          >
            {shortMonthNames[month]} {year}
          </span>
          <button className="nav-button" onClick={() => handleMonthChange(1)}>
            ❯
          </button>
        </div>
        <div className="calendar-body">
          <div className="calendar-header-days">
            {shortWeekDays.map((day, index) => (
              <div key={index} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>
          <div className="calendar-display">
            {rows.map((week, i) => (
              <div key={i} className="calendar-row">
                {week.map(({ day, month: dayMonth, isCurrentMonth }, index) => (
                  <div
                    key={index}
                    className={`calendar-day${
                      isCurrentMonth ? " current-month" : " other-month"
                    }${
                      year === currentYear &&
                      dayMonth === currentMonth &&
                      day === currentDate
                        ? " today"
                        : ""
                    }${
                      isCurrentMonth &&
                      selectedDate &&
                      selectedDate.year === year &&
                      selectedDate.month === dayMonth &&
                      selectedDate.day === day
                        ? " selected"
                        : ""
                    }`}
                    onClick={() => handleDateClick(day, isCurrentMonth)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar">
      {showYearCalendar
        ? yearPicker()
        : showMonthCalendar
        ? monthPicker()
        : calendarView()}
    </div>
  );
};

export default Calendar;
