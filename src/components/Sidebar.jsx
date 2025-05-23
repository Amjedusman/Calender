import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import viteLogo from '/vite.svg';
import { 
  HomeIcon, 
  CalendarIcon, 
  BellIcon, 
  CreditCardIcon,
  UserIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isCollapsed, onToggle, upcomingNotificationCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const topMenuItems = [
    { id: '/', label: 'Home', icon: HomeIcon },
    { id: '/events', label: 'Manage Events', icon: CalendarIcon },
    { id: '/notifications', label: 'Notifications', icon: BellIcon, notificationCount: upcomingNotificationCount },
    { id: '/payments', label: 'Payments', icon: CreditCardIcon },
    { id: '/settings', label: 'Settings', icon: CogIcon },
  ];

  const bottomMenuItems = [
    { id: '/profile', label: 'Profile', icon: UserIcon },
  ];

  const handleNavigation = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-800 text-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          {/* Logo and Title - Clickable */}          
          {!isCollapsed && (
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 text-white focus:outline-none bg-gray-800"
            >
              <img src={viteLogo} className="w-8 h-8" alt="Vite logo" />
              <h1 className="text-2xl font-bold">Eventra</h1>
            </button>
          )}

          {/* Toggle Button */}
          <button 
            onClick={onToggle}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow-md"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-5 w-5 text-white" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
        
        {/* Main Menu Items (Top) */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {topMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeItem === item.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-6 w-6 flex-shrink-0 ${activeItem === item.id ? 'text-white' : 'text-gray-400'}`} />
                    {!isCollapsed && (
                      <span className="font-medium flex-1 text-left">{item.label}</span>
                    )}
                    {!isCollapsed && item.notificationCount > 0 && (
                      <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {item.notificationCount}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Menu Items (Profile) */}
        <nav className="mt-auto">
          <ul className="space-y-3">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeItem === item.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-6 w-6 flex-shrink-0 ${activeItem === item.id ? 'text-white' : 'text-gray-400'}`} />
                    {!isCollapsed && (
                      <span className="font-medium flex-1 text-left">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 