import { XMarkIcon } from '@heroicons/react/24/outline';

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

const isEventFinished = (event) => {
  const endDate = new Date(
    event.year,
    event.month,
    event.date,
    ...(event.endTime ? event.endTime.split(':') : [23, 59])
  );
  return endDate < new Date();
};

const EventInDate = ({ events, date, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 relative p-6">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded hover:bg-gray-200">
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Events on {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
        </h2>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="rounded-lg p-4 shadow bg-gray-50 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold text-white px-2 py-1 rounded ${importanceColors[event.importance]}`}>{importanceLabels[event.importance]}</span>
                {isEventFinished(event) && <span className="text-xs text-gray-500 ml-2">(Finished)</span>}
              </div>
              <div className="flex items-center gap-2">
                 <div className={`w-3 h-3 rounded-full ${importanceColors[event.importance]}`} title={importanceLabels[event.importance]}></div>
                 <div className={`text-lg font-bold ${isEventFinished(event) ? 'line-through text-gray-500' : 'text-gray-800'}`}>{event.title}</div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">{event.startTime} - {event.endTime}</span>
                {/* <span className="bg-gray-100 px-2 py-1 rounded">{event.date} {months[event.month]} {event.year}</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventInDate; 