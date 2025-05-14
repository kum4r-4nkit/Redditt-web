import React from 'react';
import { fetchPostsAPI } from '../../api/auth';
import PaginatedPostList from '../organisms/PaginatedPostList';

const PostList = () => <PaginatedPostList fetchPostsAPI={fetchPostsAPI} />;

export default PostList;