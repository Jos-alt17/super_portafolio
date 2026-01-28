import { useState } from 'react';
import api from '../api/axios'; // Importa la configuración de Axios que hicimos
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', content: '', category: 'Backend' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos el post al backend (la ruta está protegida, pero axios envía el token automáticamente)
      await api.post('/posts', post);
      setMensaje('✅ ¡Post publicado con éxito!');
      
      // Opcional: Redirigir al blog después de 2 segundos para ver el resultado
      setTimeout(() => navigate('/blog'), 2000);
    } catch (error) {
      setMensaje('❌ Error: ' + (error.response?.data?.message || 'No se pudo publicar'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl text-gray-800">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2 text-blue-900">Crear Nuevo Post Técnico</h2>
      
      {mensaje && (
        <div className={`p-4 mb-6 rounded font-bold ${mensaje.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Título del Post</label>
          <input 
            type="text"
            className="w-full p-3 border-2 border-gray-200 rounded focus:border-blue-500 outline-none transition"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            placeholder="Ej: Tutorial de Implementación de OAuth"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Categoría</label>
          <select 
            className="w-full p-3 border-2 border-gray-200 rounded focus:border-blue-500 outline-none bg-white"
            value={post.category}
            onChange={(e) => setPost({...post, category: e.target.value})}
          >
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Seguridad">Seguridad</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Contenido Técnico (+1000 palabras)</label>
          <textarea 
            className="w-full p-3 border-2 border-gray-200 rounded h-96 focus:border-blue-500 outline-none font-mono text-sm"
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
            placeholder="Pega aquí tu artículo completo..."
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-700 text-white font-bold py-4 rounded shadow-lg hover:bg-blue-800 transform hover:-translate-y-1 transition-all"
        >
          🚀 PUBLICAR EN EL BLOG
        </button>
      </form>
    </div>
  );
};

export default CreatePost;