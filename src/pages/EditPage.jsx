import{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTitle(data.title);
        setContent(data.body);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      title,
      body: content,
      userId: 5,
    };

    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update post');
    }
  };

  return (
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Content:</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-60"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
            Update Post
          </button>
        </form>
      </div>
  );
};

export default EditPost;
