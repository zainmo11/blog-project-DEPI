import { useState } from 'react';

const Addpage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      title,
      body: content,
      userId: 5,
    };

    try {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      alert('Post added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add post');
    }
  };

  return (
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
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
          <button type="submit" className="w-full bg-blue-950 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-950">
            Add Post
          </button>
        </form>
      </div>
  );
};


export default Addpage;
