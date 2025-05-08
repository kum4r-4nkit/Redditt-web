import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-orange-600 text-white p-3 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Redditt</Link>
        <Link to="/profile" className="text-xl font-bold bg-white text-orange-600 px-1.5 rounded-2xl">U</Link>
      </nav>
    </header>
  )
}

export default Header