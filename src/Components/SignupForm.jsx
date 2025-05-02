// src/Components/SignupForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input name="passwordConfirmation" type="password" placeholder="Confirm Password" value={form.passwordConfirmation} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
