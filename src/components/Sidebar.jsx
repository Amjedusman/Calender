import { useState } from 'react';
import { 
  HomeIcon, 
  CalendarIcon, 
  BellIcon, 
  CreditCardIcon,
  UserIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
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
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">Calendar App</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeItem === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{item.label}</span>
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