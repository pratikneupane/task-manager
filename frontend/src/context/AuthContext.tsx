/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('TASK_MANAGER_USER');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('TASK_MANAGER_USER', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('TASK_MANAGER_USER');
    localStorage.removeItem('TASK_MANAGER_TOKEN');
    document.cookie = 'TASK_MANAGER_TOKEN=; Max-Age=0; path=/;';
};

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login: loginUser, 
        logout: logoutUser, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};