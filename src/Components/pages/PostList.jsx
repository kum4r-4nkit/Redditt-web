import { fetchPostsAPI } from '../../api/auth';
import PaginatedPostList from '../organisms/PaginatedPostList';
import CreatePost from '../../assets/icons/new.svg';
import { Link } from 'react-router-dom';

const PostList = () => {

  return (
    <div className="flex flex-col p-4 sm:max-w-3xl mx-auto">
      <div className='mx-auto'>
        <Link to="/new-post">
          <div className='flex rounded-4xl bg-green-300 py-3 px-4 hover:shadow-xl'>
            <img src={CreatePost} alt="new" className='w-6 mr-2' />
            <p className="text-2xl font-bold">Post</p>
          </div>
        </Link>
      </div>
      <hr className="my-4" />
      <PaginatedPostList fetchPostsAPI={fetchPostsAPI} />
    </div>
  );
};

export default PostList;