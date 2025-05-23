import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './routes/Home'
import ManageEvents from './routes/ManageEvents'
import Notifications from './routes/Notifications'
import Payments from './routes/Payments'
import Profile from './routes/Profile'
import Settings from './routes/Settings'

const getUpcomingEventCount = (events) => {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return events.filter(ev => {
    const eventDate = new Date(ev.year, ev.month, ev.date, ...(ev.startTime ? ev.startTime.split(':') : [0,0]));
    return eventDate > now && eventDate <= in24h;
  }).length;
};

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    // Function to fetch and update the count
    const updateUpcomingCount = () => {
      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      setUpcomingCount(getUpcomingEventCount(storedEvents));
    };

    // Initial fetch
    updateUpcomingCount();

    // Optional: Add a custom event listener if needed for real-time updates
    // For simplicity, we'll rely on page reload or navigation for now.
    // A more advanced approach would use context or a state management library
    // and listen for changes in the event list.

  }, []); // Empty dependency array means this runs once on mount

  // You might want to add a way to re-calculate this when events change,
  // e.g., by listening to localStorage changes or using context.
  // For this example, the count will update on page load or route change.


  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          upcomingNotificationCount={upcomingCount}
        />
        <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} bg-gray-100 min-h-screen`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<ManageEvents />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
