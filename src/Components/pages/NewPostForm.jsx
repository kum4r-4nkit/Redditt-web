import { useState } from 'react';
import { createPostAPI } from '../../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '../../assets/icons/close.svg'

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Title or body can't be empty");
      return;
    }

    setLoading(true);
    let data
    try {
      data = await createPostAPI(title, body);
      toast.success("Post created successfully!");
      setTitle('');
      setBody('');
    } catch (err) {
      toast.error(err.response?.data?.errors?.[0] || "Failed to create post");
    } finally {
      setLoading(false);
      navigate(`/posts/${data.id}`);
    }
  };

  return (
    <div className='w-fit mx-auto mt-8 px-4'>
      <form onSubmit={handleSubmit} className="space-y-4">
        <img src={CloseIcon} alt="close" className='w-7 cursor-pointer' onClick={() => navigate('/') }/>
        <input className="w-full p-2 border rounded" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full p-2 border rounded" placeholder="Body" value={body} onChange={e => setBody(e.target.value)} rows={4} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 font-bold rounded cursor-pointer disabled:opacity-50" disabled={loading} >
          {loading ? 'Posting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
