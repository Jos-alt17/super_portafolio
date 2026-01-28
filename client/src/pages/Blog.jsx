import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener posts:", err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center p-20">Cargando artículos técnicos...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="mb-12 border-l-8 border-blue-600 pl-6">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
          Blog Técnico
        </h1>
        <p className="text-gray-600 mt-2 font-medium">
          Compartiendo mi aprendizaje en el Desarrollo de Software
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article 
              key={post._id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="p-8 flex-grow">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed mb-6">
                  {post.content}
                </p>
              </div>
              
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                <Link 
                  to={`/blog/${post._id}`} 
                  className="text-blue-600 font-bold hover:text-blue-800 transition-colors inline-flex items-center gap-2 group"
                >
                  Leer artículo completo 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-500 italic">Aún no hay publicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;