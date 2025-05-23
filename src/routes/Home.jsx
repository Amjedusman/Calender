import Calendar from '../components/Calendar';

const Home = () => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Calendar Dashboard</h1>
      <Calendar />
    </div>
  );
};

export default Home; 