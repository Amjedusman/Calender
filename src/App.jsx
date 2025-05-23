import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './routes/Home'
import ManageEvents from './routes/ManageEvents'
import Notifications from './routes/Notifications'
import Payments from './routes/Payments'
import Profile from './routes/Profile'
import Settings from './routes/Settings'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'pl-20' : 'pl-64'}`}>
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
