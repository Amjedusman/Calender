import { useState } from 'react'
import Sidebar from './components/Sidebar'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'pl-20' : 'pl-64'}`}>
        <main className="p-8">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Calendar App</h1>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
