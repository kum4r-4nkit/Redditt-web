import React, { useEffect, useState } from 'react';
import RoundSpinner from '../../assets/animations/loaders/loading-spinner.gif'
import DotLoader from '../../assets/animations/loaders/dot-loader.gif'
import { fetchUserPostsAPI } from '../../api/auth';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserPostList = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const perPage = 10;

  useEffect(() => {
    fetchPosts()
  }, []);

  const fetchPosts = async () => {
    if (page === 1) setIsInitialLoading(true)
    try {
      const { posts } = await fetchUserPostsAPI(page, perPage);
      if (posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...posts]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      if (page === 1) setIsInitialLoading(false)
    }
  };

  const SpinnerLoader = () => (
    <img
      src={RoundSpinner}
      style={{ width: '150px', margin: 'auto', display: 'block' }}
      alt="Loading"
    />
  );
  
  const ContentLoader = () => (
    <img
      src={DotLoader}
      style={{ width: '200px', margin: '1rem auto', display: 'block' }}
      alt="Loading more"
    />
  );

  const RenderPostList = () => {
    return (
      <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<ContentLoader />}
      endMessage={<p style={{ textAlign: 'center' }}>No more posts</p>}
    >
        {posts.map((post, i) => (
          <div key={i} style={{ borderBottom: '1px solid #ccc', padding: '0px 16px' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p><i>by {post.user?.username || `User #${post.user_id}`}</i></p>
            <p><small>{post.comments?.length || 0} comments</small></p>
          </div>
        ))}
      </InfiniteScroll>
    )
  }

  return (
    <>
      { isInitialLoading ? (<SpinnerLoader/>) : (<RenderPostList />) }
    </>
  );
};

export default UserPostList;