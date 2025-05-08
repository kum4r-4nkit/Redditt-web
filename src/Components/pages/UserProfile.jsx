import React, { useEffect, useState } from 'react';
import Logout from './Logout'
import { useAuth } from '../../hooks/useAuth';
import { getUserDataAPI, updateUserAPI } from '../../api/auth';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [bio, setBio] = useState('');

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    try {
      const data = await getUserDataAPI();
      setUser(data)
      setBio(data.bio)
    } catch (err) {
      console.log(err.response?.data?.errors?.[0] || '');
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUserAPI(bio);
      toast.success('Bio update successful!');
      setUser(data)
    } catch (err) {
      console.log(err.response?.data?.errors?.[0] || 'LoLLLL 2');
      toast.error('Bio update failed!');
    }
  };

  return (
    <div className="p-4">
      <div className='rounded-3xl border-orange-600 border-4 w-min py-1 pl-2 pr-8'><Logout/></div>
      <h2 className="text-xl font-bold pt-4 my-2">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-4">
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border p-2 mb-2" />
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-xl">Update</button>
      </div>
    </div>
  );
};

export default UserProfile;
