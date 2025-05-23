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
  subMonths
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-600" />
        </button>
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