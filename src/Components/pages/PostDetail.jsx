import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostByIdAPI, deletePostAPI, updatePostAPI, createCommentAPI } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/trash.svg'

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editedBody, setEditedBody] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePostDelete = async() => {
    try {
      await deletePostAPI(post.id);
    } catch {
      toast.error("Failed to delete post")
    } finally {
      navigate('/');
    }
  }

  const handleUpdate = async () => {
    try {
      const updatedPost = await updatePostAPI(post.id, editedBody );
      setPost(updatedPost); // update post in UI
      toast.success("Post updated!");
      setEditMode(false);
    } catch {
      toast.error("Failed to update post");
    }
  }

  const handlePostEdit = () => {
    setEditedBody(post.body);
    setEditMode(true);
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      setIsSubmitting(true);
      await createCommentAPI(post.id, newComment);
      setNewComment('');
      // Re-fetch post to show new comment
      const updatedPost = await getPostByIdAPI(post.id);
      setPost(updatedPost);
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  }

  const canEditPost = user && post?.user?.id === user.id;

  return post ? (
    <div className="p-6 sm:max-w-3xl mx-auto">
      <div className='flex justify-between'>
        <p className='bg-gray-200 w-fit px-3 mb-2 rounded-2xl'>{post.user?.username}</p>
        {canEditPost && (
          <div className="flex cursor-pointer">
            <img src={EditIcon} alt="edit" className='w-5 mr-2' onClick={handlePostEdit}/>
            <img src={DeleteIcon} alt="delete" className='w-5' onClick={handlePostDelete} />
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      {editMode ? (
        <div className="mb-4">
          <textarea className="w-full p-2 border rounded" rows={3} value={editedBody} onChange={e => setEditedBody(e.target.value)} />
          <div className="mt-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 mr-2 rounded">Save</button>
            <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <p>{post.body}</p>
      )}

      <div className="mt-6 border-t pt-2">
        {post.comments.map(comment => (
          <div key={comment.id} className="mt-2 border-b border-gray-200 pb-2">
            <div className='flex justify-between mb-2'>
              <p className='bg-gray-200 w-fit px-3 rounded-2xl'><small>{comment.user.username}</small></p>
              {/* {user.id === comment.user.id && (
                <img src={DeleteIcon} alt="delete" className='w-8 px-2' onClick={handleCommentDelete} />
              )} */}
            </div>
            <p>{comment.body}</p>
          </div>
        ))}
        <h3 className="text-lg font-semibold mb-2 mt-6">Add a comment</h3>
        <textarea className="w-full p-2 border border-gray-400 rounded mb-2" rows={2} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write your comment here..."/>
        <button onClick={handleCommentSubmit} disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" >{isSubmitting ? 'Posting...' : 'Post Comment'}</button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostDetail;