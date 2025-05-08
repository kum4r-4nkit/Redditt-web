import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAPI(email, password);
      login(data.token);
      toast.success('Login successful!');  // Display success message
      navigate('/');
    } catch {
      setError('Invalid email or password');
      toast.error('Login failed!');  // Display error message
    }
  };

  return (
    <div className='min-h-screen flex flex-row items-center'>
      <div className='min-h-screen bg-orange-600 text-white w-3/5 text-9xl font-bold text-center content-center'>
        Redditt
      </div>
      <div className='text-orange-600 w-2/5 min-h-screen content-center'>
        <div className='w-fit mx-auto'>
          <h2 className='font-bold mb-3'>Have an account? Sign In</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input className='bg-gray-200 mx-1 rounded-md px-1 mb-2' type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-1 mb-2' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <button className='font-bold bg-blue-800 text-white rounded-lg px-4 py-1 mb-16 mx-1' type="submit">Login</button>
          </form>
          <p>Don't have an account? <b><i><Link to="/signup">Sign up here</Link></i></b></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
