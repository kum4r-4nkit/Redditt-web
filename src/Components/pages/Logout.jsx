import React from 'react';
import { logoutAPI } from '../../api/auth';
import LogoutIcon from '../../assets/icons/logout.svg';

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

  return (
    <div className='flex cursor-pointer' onClick={handleLogout}>
      <img
        src={LogoutIcon} alt="logout"
        className='bg-white w-6 p-1 mr-2 rounded-2xl'
      />
      <p>Logout</p>
    </div>
  )
};

export default Logout;
