import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  const location = useLocation();

  useEffect(() => {
    const updateUpcomingCount = () => {
      const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      setUpcomingCount(getUpcomingEventCount(storedEvents));
    };
    updateUpcomingCount();
  }, [location]); // Recalculate count on route change

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        upcomingNotificationCount={upcomingCount}
      />
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} bg-gray-100 min-h-screen relative overflow-hidden`}> {/* Add relative and overflow-hidden */}
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={1000}
            classNames="route"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<ManageEvents />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

// Wrap App with Router only once at the top level (e.g., in main.jsx)
// export default App

// For demonstration purposes within this file:
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter; // Export the wrapped component
