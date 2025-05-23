import { useState } from 'react';
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

const Sidebar = ({ isCollapsed, onToggle }) => {
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'events', label: 'Manage Events', icon: CalendarIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'payments', label: 'Payments', icon: CreditCardIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon },
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-800 text-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">C</span>
            </div>
            {!isCollapsed && <h1 className="text-2xl font-bold">Calendar</h1>}
          </div>
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
        <nav>
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeItem === item.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-6 w-6 flex-shrink-0 ${activeItem === item.id ? 'text-white' : 'text-gray-400'}`} />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
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