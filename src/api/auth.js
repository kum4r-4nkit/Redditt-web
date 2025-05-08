import apiClient from './apiClient';

export const loginAPI = async (email, password) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

export const fetchPostsAPI = async (page = 1, perPage = 10) => {
  const response = await apiClient.get(`/posts?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const signupAPI = async ({ username, email, password, passwordConfirmation }) => {
  const response = await apiClient.post('/signup', { username, email, password, password_confirmation: passwordConfirmation });
  return response.data;
};

export const logoutAPI = async() => {
  const response = await apiClient.post('/logout')
  return response.data
}