import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';
import Sidebar from './Sidebar';
import { Search, Grid2X2, Moon, Sun, Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      <div className="flex relative">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-dark-surface shadow-sm text-light-text-secondary dark:text-dark-text-secondary"
        >
          <Menu size={20} />
        </button>

        {/* Sidebar with mobile support */}
        <div className={`
          fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200
          lg:hidden
          ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `} onClick={() => setSidebarOpen(false)} />

        <div className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark-sidebar shadow-lg transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border bg-white dark:bg-dark-surface">
            <div className="flex-1 lg:flex-none" />
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-light-input dark:hover:bg-dark-input rounded-lg">
                <Search size={20} className="text-light-text-secondary dark:text-dark-text-secondary" />
              </button>
              <button className="p-2 hover:bg-light-input dark:hover:bg-dark-input rounded-lg">
                <Grid2X2 size={20} className="text-light-text-secondary dark:text-dark-text-secondary" />
              </button>
              <button 
                className="p-2 hover:bg-light-input dark:hover:bg-dark-input rounded-lg"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <Sun size={20} className="text-dark-text-secondary" />
                ) : (
                  <Moon size={20} className="text-light-text-secondary" />
                )}
              </button>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;