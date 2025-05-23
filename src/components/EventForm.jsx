import { useState } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const getYears = (range = 20) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: range }, (_, i) => currentYear - 10 + i);
};

const importanceLevels = [
  { label: 'Most Important', value: 'high', color: 'bg-red-600' },
  { label: 'Important', value: 'medium', color: 'bg-yellow-500' },
  { label: 'Normal', value: 'normal', color: 'bg-blue-400' },
  { label: 'Least Important', value: 'low', color: 'bg-gray-400' },
];

const EventForm = ({ onClose, onSubmit }) => {
  const today = new Date();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [importance, setImportance] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ title, date, month, year, startTime, endTime, importance });
    onClose && onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Date</label>
          <select
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={date}
            onChange={e => setDate(Number(e.target.value))}
            required
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Month</label>
          <select
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
            required
          >
            {months.map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Year</label>
          <select
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            required
          >
            {getYears().map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Importance</label>
        <select
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={importance}
          onChange={e => setImportance(e.target.value)}
        >
          {importanceLevels.map(level => (
            <option key={level.value} value={level.value} className={level.color}>
              {level.label}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mt-2">
          {importanceLevels.map(level => (
            <span key={level.value} className={`inline-block w-4 h-4 rounded-full ${level.color} ${importance === level.value ? 'ring-2 ring-blue-500' : ''}`}></span>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add Event</button>
      </div>
    </form>
  );
};

export default EventForm; 