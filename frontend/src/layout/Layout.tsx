import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { logout } = useAuth();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <nav className="bg-gray-100 dark:bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Task Manager</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
                name='logout'
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  );
};