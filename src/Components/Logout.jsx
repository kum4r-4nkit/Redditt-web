import React from 'react';
import { logoutAPI } from '../api/auth';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (<button onClick={handleLogout}>Logout</button>)
};

export default Logout;
