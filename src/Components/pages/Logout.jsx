import React from 'react';
import LogoutIcon from '../../assets/icons/logout.svg';
import { useAuth } from '../../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();

  return (
    <div className='flex cursor-pointer w-min' onClick={logout}>
      <img
        src={LogoutIcon} alt="logout"
        className='bg-white w-6 p-1 mr-2 rounded-2xl'
      />
      <p>Logout</p>
    </div>
  )
};

export default Logout;
