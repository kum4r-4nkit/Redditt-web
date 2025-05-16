import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostByIdAPI, deletePostAPI } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
// import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/trash.svg'

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async() => {
    try {
      await deletePostAPI(post.id);
    } catch {
      toast.error("Failed to delete post")
    } finally {
      navigate('/');
    }
  }
  
  const canEditPost = user && post?.user?.id === user.id;

  return post ? (
    <div className="p-6 sm:max-w-3xl mx-auto">
      <div className='flex justify-between'>
        <p className='bg-gray-200 w-fit px-3 mb-2 rounded-2xl'>{post.user?.username}</p>
        {canEditPost && (
          <div className="flex mt-2 cursor-pointer">
            {/* <img src={EditIcon} alt="edit" className='w-5 mr-2' /> */}
            <img src={DeleteIcon} alt="delete" className='w-5' onClick={handleDelete} />
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p>{post.body}</p>

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
