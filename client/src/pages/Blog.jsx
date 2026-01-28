import { useEffect, useState } from 'react';
import api from '../api/axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await api.get('/posts');
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid gap-8">
      {posts.map(post => (
        <article key={post._id} className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-blue-800">{post.title}</h2>
          <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">{post.category}</span>
          <p className="mt-4 text-gray-700 whitespace-pre-wrap">{post.content.substring(0, 300)}...</p>
          <button className="mt-4 text-blue-500 font-semibold">Leer más</button>
        </article>
      ))}
    </div>
  );
};

export default Blog;