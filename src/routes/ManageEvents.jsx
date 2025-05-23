import { useState } from 'react';
import EventForm from '../components/EventForm';

const ManageEvents = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = (eventData) => {
    // You can handle event submission here (e.g., save to state or backend)
    // For now, just close the modal
    setShowForm(false);
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
    </div>
  );
};

export default ManageEvents; 