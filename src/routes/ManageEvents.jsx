import { useState } from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const ManageEvents = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddEvent = (eventData) => {
    // Get existing events from localStorage or initialize as empty array
    const existing = JSON.parse(localStorage.getItem('events') || '[]');
    // Append the new event
    const updated = [...existing, eventData];
    // Save back to localStorage
    localStorage.setItem('events', JSON.stringify(updated));
    setShowForm(false);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1500);
    setRefreshKey(k => k + 1);
  };

  const handleDelete = () => {
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
          onClick={() => setShowForm(true)}
        >
          Add Event
        </button>
      </div>
      {/* Event list or content can go here */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 relative">
            <EventForm onClose={() => setShowForm(false)} onSubmit={handleAddEvent} />
          </div>
        </div>
      )}
      {showFeedback && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all">
          Event added successfully!
        </div>
      )}
      <EventList refreshKey={refreshKey} onDelete={handleDelete} />
    </div>
  );
};

export default ManageEvents; 