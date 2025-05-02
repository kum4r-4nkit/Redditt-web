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
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default LoginForm;
