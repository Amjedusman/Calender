import EventAlert from '../components/EventAlert';

const Notifications = () => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Events in 24 Hours</h1>
      <EventAlert />
    </div>
  );
};

export default Notifications; 