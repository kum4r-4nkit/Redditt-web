import apiClient from './apiClient';

export const loginAPI = async (email, password) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

export const fetchPostsAPI = async () => {
  const response = await apiClient.get('/posts');
  return response.data;
};

export const signupAPI = async ({ username, email, password, passwordConfirmation }) => {
  const response = await apiClient.post('/signup', { username, email, password, password_confirmation: passwordConfirmation });
  return response.data;
};