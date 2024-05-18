"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  credit: number;
  id: number;
}

interface AuthContextType {
  user: User | null; // You can replace 'any' with a more specific type for your user
  token: string | null;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      try {
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        return null;
      }
    }
    return null; // Return null when not running in the browser
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null; // Return null when not running in the browser
  });

  const login = (data: { token: string; user: User }) => {
    const { token, user } = data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};