import React, { useEffect, useState } from 'react';
import Logout from './Logout'
import { useAuth } from '../../hooks/useAuth';
import { getUserDataAPI, updateUserAPI, updatePasswordAPI, fetchUserPostsAPI } from '../../api/auth';
import { toast } from 'react-toastify';
import PaginatedPostList from '../organisms/PaginatedPostList';

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [bio, setBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    try {
      await updatePasswordAPI(currentPassword, newPassword, confirmPassword);
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Password update failed');
    }
  };

  return (
    <div className='flex'>
    <div className="p-4 w-1/4 min-w-3xs bg-gray-50">
      <div className='flex justify-end'><Logout/></div>
      <h2 className="text-xl font-bold pt-4 my-2">Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div className="mt-1">
        <label><strong>Bio:</strong></label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border p-2 mb-2" />
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-xl">Update</button>
      </div>
      <div className='mt-12'>
        <strong>Update password:</strong><br />
        <input
          type="password" placeholder='Current Password'
          value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
          className='bg-gray-200 rounded-md px-3 py-1 mb-3 mt-3' required
        /><br />
        <input
          type="password" placeholder='New Password'
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          className='bg-gray-200 rounded-md px-3 py-1 mb-3' required
        /><br />
        <input
          type="password" placeholder='Confirm New Password'
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          className='bg-gray-200 rounded-md px-3 py-1 mb-3' required
        /><br />
        <button onClick={handlePasswordUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-xl">Update</button>
      </div>
    </div>
    <div className="p-4 w-3/4 min-w-3xs">
      <p className='text-2xl font-bold mb-6'>Your posts</p>
      <PaginatedPostList fetchPostsAPI={fetchUserPostsAPI} />
    </div >
    </div>
  );
};

export default UserProfile;
