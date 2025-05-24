// src/Components/SignupForm.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupAPI } from '../../api/auth';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

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
      await login(data.token);
      toast.success('Signup successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Signup failed');
      toast.error('Signup failed!');
    }
  };

  return (

    <div className='h-screen sm:min-h-screen flex sm:flex-row flex-col items-center'>
      <div className='h-1/2 sm:min-h-screen bg-orange-600 text-white sm:w-3/5 w-full sm:text-9xl text-6xl font-bold text-center content-center'>
        Redditt
      </div>
      <div className='text-orange-600 sm:w-2/5 h-1/2 sm:min-h-screen content-center'>
        <div className='w-fit mx-auto'>
          <h2 className='font-bold mb-3 ml-3 text-2xl'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input className='bg-gray-200 mx-1 rounded-md px-3 py-1 mb-2' name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-3 py-1 mb-2' name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-3 py-1 mb-2' name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <br />
            <input className='bg-gray-200 mx-1 rounded-md px-3 py-1 mb-2' name="passwordConfirmation" type="password" placeholder="Confirm Password" value={form.passwordConfirmation} onChange={handleChange} required />
            <br />
            <button className='font-bold bg-blue-800 text-white rounded-lg px-4 py-1 mb-8 mx-1' type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <Link className="text-blue-600 hover:underline" to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
