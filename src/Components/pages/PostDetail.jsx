import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostByIdAPI, deletePostAPI, updatePostAPI, createCommentAPI, deleteCommentAPI } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/trash.svg'
import ReplyIcon from '../../assets/icons/reply.svg'

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editedBody, setEditedBody] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addComment, setAddComment] = useState(true)
  const [replyParentId, setReplyParentId] = useState(null);

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
      await createCommentAPI(post.id, newComment, replyParentId);
      setNewComment('');
      setReplyParentId(null);
      setAddComment(true);
      const updatedPost = await getPostByIdAPI(post.id);
      setPost(updatedPost);
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCommentDelete = async(commentId) => {
    try {
      await deleteCommentAPI(post.id, commentId);
    } catch {
      toast.error("Failed to delete post")
    } finally {
      const updatedPost = await getPostByIdAPI(post.id);
      setPost(updatedPost);
    }
  }

  const canEditPost = user && post?.user?.id === user.id;

  const CommentThread = ({ comment, currentUser, handleCommentDelete, level = 0 }) => {
    return (
      <div className={`ml-${level * 4} mt-4 border-l pl-4 border-gray-300`}>
        <div className="flex justify-between">
          <p className="bg-gray-200 w-fit px-3 rounded-2xl text-sm">{comment.user.username}</p>
          <div className='flex'>
            {currentUser?.id === comment.user.id && (
              <img src={DeleteIcon} alt="delete" className="w-5 h-5 cursor-pointer opacity-70" onClick={() => handleCommentDelete(comment.id)} />
            )}
            <img src={ReplyIcon} alt="reply" className="w-5 h-5 cursor-pointer opacity-70 ml-4"
              onClick={() => {
                setAddComment(false);
                setReplyParentId(comment.id);
              }}
            />
          </div>
        </div>
        <p className="mt-1 text-sm">{comment.body}</p>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map(reply => (
              <CommentThread key={reply.id} comment={reply} currentUser={currentUser} handleCommentDelete={handleCommentDelete} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };


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
      {addComment ? (<div className="mt-6 border-t pt-2">
        {post.comments.map(comment => (
          <CommentThread key={comment.id} comment={comment} currentUser={user} handleCommentDelete={handleCommentDelete} />
        ))}
        <div onClick={() => setAddComment(false)} className='border border-gray-400 rounded-3xl mt-8 py-2 px-4 opacity-50'>Add a comment</div>
        </div>
      ) : (
        <div className="mt-6 border-t pt-2">
          <p className="text-lg font-semibold mb-2 mt-6">Add a comment</p>
          <textarea className="w-full p-2 border border-gray-400 rounded mb-2" rows={2} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write your comment here..."/>
          <button onClick={handleCommentSubmit} disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" >{isSubmitting ? 'Posting...' : 'Post Comment'}</button>
          <button onClick={() => setAddComment(true)} className="bg-gray-400 text-white px-4 py-2 ml-2 rounded">Cancel</button>
        </div>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostDetail;