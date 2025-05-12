import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from './pages/Header';
import RoundSpinner from '../assets/animations/loaders/loading-spinner.gif'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <img
      src={RoundSpinner}
      style={{ width: '150px', margin: 'auto', display: 'block' }}
      alt="Loading"
    />
  }

  // The user won't be able to press the browser's back button and go back to the route that triggered the navigation.
  // This is useful in situations like redirects after login or logout, or protected routes where you don't want the user to return to the unauthorized page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container">
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedRoute;