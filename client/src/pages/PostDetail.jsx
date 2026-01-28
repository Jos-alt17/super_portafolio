import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar el post:", err);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center p-20">Cargando contenido técnico...</div>;
  if (!post) return <div className="text-center p-20">Post no encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-8 md:p-12 shadow-2xl rounded-xl border border-gray-100">
      <Link to="/blog" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
        ← Volver al Blog
      </Link>
      
      <header className="mb-8">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
          {post.category}
        </span>
        <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Publicado el {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </header>

      <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetail;