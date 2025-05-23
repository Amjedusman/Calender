import { useEffect, useState } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const importanceColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-400',
  normal: 'bg-blue-400',
  low: 'bg-gray-400',
};

const importanceLabels = {
  high: 'Most Important',
  medium: 'Important',
  normal: 'Normal',
  low: 'Least Important',
};

const EventAlert = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(stored);
  }, []);

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const eventsIn24h = events.filter(ev => {
    const eventDate = new Date(ev.year, ev.month, ev.date, ...(ev.startTime ? ev.startTime.split(':') : [0,0]));
    return eventDate > now && eventDate <= in24h;
  });

  const getRemainingHours = (ev) => {
    const eventDate = new Date(ev.year, ev.month, ev.date, ...(ev.startTime ? ev.startTime.split(':') : [0,0]));
    return Math.floor((eventDate - now) / (1000 * 60 * 60));
  };

  if (eventsIn24h.length === 0) {
    return <div className="text-gray-500 text-center mt-8">No upcoming events in the next 24 hours.</div>;
  }

  return (
    <div className="space-y-4 mt-8">
      {eventsIn24h.map((event, idx) => (
        <div key={idx} className="rounded-lg p-4 shadow bg-white flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold text-white px-2 py-1 rounded ${importanceColors[event.importance]}`}>{importanceLabels[event.importance]}</span>
            <span className="text-xs text-gray-600 ml-2">{getRemainingHours(event)}h left</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${importanceColors[event.importance]}`} title={importanceLabels[event.importance]}></div>
            <div className="text-lg font-bold text-gray-800 flex-1">{event.title}</div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            <span className="bg-gray-100 px-2 py-1 rounded">{event.startTime} - {event.endTime}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">{event.date} {months[event.month]} {event.year}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventAlert; 