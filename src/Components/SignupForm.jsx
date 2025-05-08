// src/Components/SignupForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupAPI } from '../api/auth';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const SignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signupAPI(form);
      toast.success('Signup successful!');  // Display success message
      login(data.token);
      navigate('/'); // or auto-login if desired
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Signup failed');
      toast.error('Signup failed!');  // Display error message
    }
  };

  return (

    <div className='min-h-screen flex flex-row items-center'>
      <div className='min-h-screen bg-orange-600 text-white w-3/5 text-9xl font-bold text-center content-center'>
        Redditt
      </div>
      <div className='text-orange-600 w-2/5 min-h-screen content-center'>
        <div className='w-fit mx-auto'>
          <h2 className='font-bold mb-3 text-2xl'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input className='bg-gray-200 mx-1 rounded-md px-1 mb-2' name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-1 mb-2' name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-1 mb-2' name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-1 mb-2' name="passwordConfirmation" type="password" placeholder="Confirm Password" value={form.passwordConfirmation} onChange={handleChange} required />
            <br />
            <button className='font-bold bg-blue-800 text-white rounded-lg px-4 py-1 mb-16 mx-1' type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <b><i><Link to="/login">Login here</Link></i></b></p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
