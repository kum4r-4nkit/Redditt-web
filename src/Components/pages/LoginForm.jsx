import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
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
      await login(data.token);
      toast.success('Login successful!');  // Display success message
      navigate('/');
    } catch {
      setError('Invalid email or password');
      toast.error('Login failed!');  // Display error message
    }
  };

  return (
    <div className='h-screen sm:min-h-screen flex sm:flex-row flex-col items-center'>
      <div className='h-1/2 sm:min-h-screen bg-orange-600 text-white sm:w-3/5 w-full sm:text-9xl text-6xl font-bold text-center content-center'>
        Redditt
      </div>
      <div className='text-orange-600 sm:w-2/5 h-1/2 sm:min-h-screen content-center'>
        <div className='w-fit mx-auto'>
          <h2 className='font-bold mb-3 ml-2'>Have an account? Sign In</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input className='bg-gray-200 mx-1 rounded-md px-3 py-1 mb-2' type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-3 py-1 mb-2' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <button className='font-bold bg-blue-800 text-white rounded-lg px-4 py-1 mx-1' type="submit">Login</button>
          </form>
          <div className="mb-12 text-sm text-right">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>
          <p>Don't have an account? <Link className="text-blue-600 hover:underline" to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
