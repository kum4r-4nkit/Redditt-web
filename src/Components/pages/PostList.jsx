import React, { useEffect, useState } from 'react';
import Logout from '../Logout';
import { fetchPostsAPI } from '../../api/auth';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsAPI()
      .then(setPosts)
      .catch((err) => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div>
      <Logout />
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p><i>by User #{post.user_id}</i></p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
