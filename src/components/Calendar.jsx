import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  setMonth,
  setYear
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const getYears = (range = 20) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: range }, (_, i) => currentYear - 10 + i);
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(setMonth(currentDate, newMonth));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(setYear(currentDate, newYear));
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <select
            className="rounded-lg border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
          >
            {months.map((month, idx) => (
              <option key={month} value={idx}>{month}</option>
            ))}
          </select>
          <select
            className="rounded-lg border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
          >
            {getYears().map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800 min-w-[160px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      const formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          key={day.toString()}
          className={`relative p-2 h-24 border border-gray-200 ${
            !isSameMonth(day, monthStart)
              ? 'bg-gray-50 text-gray-400'
              : 'bg-white hover:bg-gray-50'
          } ${
            isSameDay(day, selectedDate)
              ? 'bg-blue-50 border-blue-500'
              : ''
          }`}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={`text-sm ${
              isToday(day)
                ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                : ''
            }`}
          >
            {formattedDate}
          </span>
          {/* Add event indicators here if needed */}
        </div>
      );
      day = addDays(day, 1);
    }
    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {renderHeader()}
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-gray-100 p-2 text-center text-sm font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar; 