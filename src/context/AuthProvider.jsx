import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { logoutAPI } from '../api/auth';

export const AuthProvider = ({ children }) => {  
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState({})

  const login = (newToken, user) => {
    localStorage.setItem('token', newToken);
    setUser(user)
    setToken(newToken);
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setToken(null);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
