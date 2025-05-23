import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const importanceColors = {
  high: 'bg-red-600',
  medium: 'bg-yellow-500',
  normal: 'bg-blue-400',
  low: 'bg-gray-400',
};

const importanceLabels = {
  high: 'Most Important',
  medium: 'Important',
  normal: 'Normal',
  low: 'Least Important',
};

const EventList = ({ refreshKey, onDelete }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(stored);
  }, [refreshKey]);

  const handleDelete = (idx) => {
    const stored = JSON.parse(localStorage.getItem('events') || '[]');
    stored.splice(idx, 1);
    localStorage.setItem('events', JSON.stringify(stored));
    setEvents(stored);
    if (onDelete) onDelete();
  };

  const isEventFinished = (event) => {
    const endDate = new Date(
      event.year,
      event.month,
      event.date,
      ...(event.endTime ? event.endTime.split(':') : [23, 59])
    );
    return endDate < new Date();
  };

  if (events.length === 0) {
    return <div className="text-gray-500 text-center mt-8">No events found.</div>;
  }

  // Sort events chronologically by date and startTime
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.year, a.month, a.date, ...(a.startTime ? a.startTime.split(':') : [0,0]));
    const dateB = new Date(b.year, b.month, b.date, ...(b.startTime ? b.startTime.split(':') : [0,0]));
    return dateA - dateB;
  });

  return (
    <div className="grid gap-4 mt-8">
      {sortedEvents.map((event, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white rounded-xl shadow p-4 gap-4 border-l-8"
          style={{ borderColor: `var(--tw-${importanceColors[event.importance] || 'bg-blue-400'})` }}
        >
          <div className={`w-3 h-3 rounded-full ${importanceColors[event.importance]} mr-2 sm:mr-4 mt-1 sm:mt-0`} title={importanceLabels[event.importance]}></div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2
                className={`text-lg font-semibold flex-1 ${isEventFinished(event) ? 'line-through text-gray-400' : 'text-gray-800'}`}
                title={isEventFinished(event) ? 'Event finished' : ''}
              >
                {event.title}
              </h2>
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                {event.date} {months[event.month]} {event.year}
              </span>
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 justify-between">
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${importanceColors[event.importance]}`}>{importanceLabels[event.importance]}</span>
              <button
                className="ml-auto p-2 rounded-full bg-red-500 hover:bg-red-700 transition flex items-center"
                onClick={() => handleDelete(events.indexOf(event))}
                title="Delete Event"
              >
                <TrashIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList; 