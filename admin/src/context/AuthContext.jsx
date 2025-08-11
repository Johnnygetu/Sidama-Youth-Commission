import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const token = localStorage.getItem('adminToken');
    if (token) {
      // You could validate the token here if needed
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // For demo purposes, using hardcoded credentials
      // In production, this should make an API call to your backend
      if (username === 'administrator' && password === 'Apanelp.12345') {
        const token = 'demo-token-' + Date.now();
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
