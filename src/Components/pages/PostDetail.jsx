import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostByIdAPI } from '../../api/auth';
// import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
// import EditIcon from '../../assets/icons/edit.svg'
// import DeleteIcon from '../../assets/icons/trash.svg'

const PostDetail = () => {
  const { id } = useParams();
  // const { user } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostByIdAPI(id);
        setPost(data);
      } catch (err) {
        toast.error("Failed to load post", err)
      }
    }
    fetchPost();
  }, [id]);
  
  // const canEditPost = user && post?.user?.id === user.id;

  return post ? (
    <div className="p-6">
      <p className='bg-gray-200 w-fit px-3 mb-2 rounded-2xl'>{post.user?.username}</p>
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p>{post.body}</p>

      {/* {canEditPost && (
        <div className="flex mt-2">
          <img src={EditIcon} alt="edit" className='w-5 mr-2' />
          <img src={DeleteIcon} alt="delete" className='w-4 ' />
        </div>
      )} */}

      <div className="mt-6 border-t pt-2">
        {post.comments.map(comment => (
          <div key={comment.id} className="mt-2 border-b border-gray-200 pb-2">
            <p className='bg-gray-200 w-fit px-3 mb-2 rounded-2xl'><small>{comment.user.username}</small></p>
            <p>{comment.body}</p>
            {/* {user.id === comment.user.id && (
              <div className="flex mt-2">
                <img src={EditIcon} alt="edit" className='w-5 mr-2' />
                <img src={DeleteIcon} alt="delete" className='w-4 ' />
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostDetail;
