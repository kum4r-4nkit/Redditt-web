import apiClient from './apiClient';

export const loginAPI = async (email, password) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

export const fetchPostsAPI = async (page = 1, perPage = 10) => {
  const response = await apiClient.get(`/posts?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const fetchUserPostsAPI = async (page = 1, perPage = 10) => {
  const response = await apiClient.get(`/profile/posts?page=${page}&per_page=${perPage}`);
  return response.data;
};

export const signupAPI = async ({ username, email, password, passwordConfirmation }) => {
  const response = await apiClient.post('/signup', { username, email, password, password_confirmation: passwordConfirmation });
  return response.data;
};

export const logoutAPI = async() => {
  const response = await apiClient.post('/logout')
  return response.data
};

export const getPostByIdAPI = async(id) => {
  const response = await apiClient.get(`/posts/${id}`)
  return response.data
};

export const getUserDataAPI = async() => {
  const response = await apiClient.get('/profile')
  return response.data
};

export const updateUserAPI = async(bio) => {
  const response = await apiClient.patch('/profile', { bio })
  return response.data
};

export const updatePasswordAPI = async(currentPassword, password, confirmPassword) => {
  const response = await apiClient.patch('/profile/update_password', {
    current_password: currentPassword,
    user: {
      password,
      password_confirmation: confirmPassword
    }
  })
  return response.data
}

export const createPostAPI = async (title, body) => {
  const response = await apiClient.post('/posts', { title, body });
  return response.data;
};

export const deletePostAPI = async (id) => {
  const response = await apiClient.delete(`/posts/${id}`);
  return response.data;
};

export const updatePostAPI = async (id, body) => {
  const response = await apiClient.patch(`/posts/${id}`, { body } );
  return response.data;
};

export const createCommentAPI = async (postId, body, parentId) => {
  let data = parentId ? { parent_id: parentId, body } : { body }
  const response = await apiClient.post(`/posts/${postId}/comments`, data);
  return response.data;
};

export const deleteCommentAPI = async (postId, commentId) => {
  const response = await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
  return response.data;
};

// export const forgotPasswordAPI = async (email) => {
//   const response = await apiClient.post('/password/forgot', { email });
//   return response.data;
// };

// export const resetPasswordAPI = async (token, password, passwordConfirmation) => {
//   const response = await apiClient.post('/password/reset', {
//     token,
//     user: {
//       password,
//       password_confirmation: passwordConfirmation
//     }
//   })
//   return response.data;
// };