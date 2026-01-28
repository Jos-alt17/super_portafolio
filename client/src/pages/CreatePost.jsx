import { useState, useEffect } from 'react'; // Se añade useEffect para cargar los posts
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', content: '', category: 'Backend' });
  const [mensaje, setMensaje] = useState('');
  const [myPosts, setMyPosts] = useState([]); // Estado para listar tus posts actuales
  const navigate = useNavigate();

  // Cargar posts al inicio para poder gestionarlos
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      setMyPosts(data);
    } catch (err) {
      console.error("Error al cargar posts para gestión");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', post);
      setMensaje('✅ ¡Post publicado con éxito!');
      setPost({ title: '', content: '', category: 'Backend' }); // Limpiar formulario
      fetchPosts(); // Actualizar lista
      setTimeout(() => navigate('/blog'), 2000);
    } catch (error) {
      setMensaje('❌ Error: ' + (error.response?.data?.message || 'No se pudo publicar'));
    }
  };

  // --- FUNCIÓN PARA ELIMINAR POSTS ---
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
      try {
        await api.delete(`/posts/${id}`);
        setMensaje('🗑️ Post eliminado correctamente');
        fetchPosts(); // Refrescar la lista
      } catch (error) {
        setMensaje('❌ Error al eliminar el post');
      }
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
          <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Contenido Técnico </label>
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

      {/* --- SECCIÓN DE GESTIÓN (BORRADO) --- */}
      <div className="mt-16">
        <h3 className="text-xl font-bold mb-4 text-gray-700 border-l-4 border-red-500 pl-3">Gestionar / Eliminar Posts</h3>
        <div className="space-y-3">
          {myPosts.map((p) => (
            <div key={p._id} className="flex justify-between items-center p-4 bg-gray-50 border rounded">
              <div>
                <p className="font-bold text-gray-800">{p.title}</p>
                <span className="text-xs text-blue-600 font-semibold">{p.category}</span>
              </div>
              <button 
                onClick={() => handleDelete(p._id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;