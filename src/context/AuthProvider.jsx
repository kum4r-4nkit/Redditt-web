import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getUserDataAPI, logoutAPI } from '../api/auth';

export const AuthProvider = ({ children }) => {  
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await getUserDataAPI();
          setUser(userData);
        } catch (err) {
          console.error("Failed to fetch user", err);
          logout(); // Optionally logout on invalid token
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    try {
      const userData = await getUserDataAPI();
      setUser(userData);
    } catch (err) {
      console.error("Error fetching user on login", err);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setToken(null);
      setUser({})
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
