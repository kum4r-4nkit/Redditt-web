import React, { useEffect, useState } from 'react'
import ContentDotLoader from '../molecules/ContentDotLoader';
import ContentSpinnerLoader from '../molecules/ContentSpinnerLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentIcon from '../../assets/icons/comment.svg';
import { Link } from 'react-router-dom';

const PaginatedPostList = ({ fetchPostsAPI }) => {
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
      const { posts } = await fetchPostsAPI(page, perPage);
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

  const RenderPostList = () => {
    return (
      <InfiniteScroll dataLength={posts.length} next={fetchPosts} hasMore={hasMore} loader={<ContentDotLoader />} endMessage={<p style={{ textAlign: 'center' }}>No more posts</p>} >
        {posts.map((post, i) => (
          <div key={i} className='rounded-2xl hover:bg-gray-100'>
            <Link to={`/posts/${post.id}`}>
              <p className='font-bold mb-2 pl-3 pt-2'>{post.title}</p>
              <p className='mx-3 my-2'>{post.body}</p>
              <div className='flex w-fit rounded-3xl border-gray-300 border-1 px-2 m-3'>
                <img src={CommentIcon} alt="comment" className='bg-white w-4 mr-1'/>
                <p><small>{post.comment_count || 0}</small></p>
              </div>
            </Link>
            <div className='border-b-1 opacity-20 mx-4'></div>
          </div>
        ))}
      </InfiniteScroll>
    )
  }

  return (<>
    { isInitialLoading ? (<ContentSpinnerLoader />) : (<RenderPostList />) }
  </>);
}

export default PaginatedPostList