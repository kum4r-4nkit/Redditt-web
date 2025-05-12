import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user } = useAuth();
  let userName = user.username.length > 10 ? `${user.username.slice(0,10)}...` : user.username
  
  return (
    <header className="sticky top-0 z-50 bg-orange-600 text-white p-3 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Redditt</Link>
        <Link to="/profile" className="text-md font-bold bg-white text-orange-600 px-3 rounded-2xl hover:underline">{userName}</Link>
      </nav>
    </header>
  )
}

export default Header