import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Blog from './pages/Blog'; 
import PostDetail from './pages/PostDetail'; // Importamos la nueva página de detalle
import CreatePost from './pages/CreatePost'; 
import EditProfile from './pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home'; 

function App() {
  // 1. Convertimos isAuth en un estado para que React reaccione al cambio
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  // 2. Sincronizamos el estado cuando el usuario inicia o cierra sesión
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem('token'));
    };

    // Escuchamos eventos de storage por si se cambia en otra pestaña
    window.addEventListener('storage', checkAuth);
    
    // Intervalo de seguridad para detectar cambios locales inmediatos
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false); // Actualizamos el estado localmente
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* BARRA DE NAVEGACIÓN DINÁMICA */}
        <nav className="p-4 bg-gray-900 text-white flex justify-between items-center shadow-2xl border-b border-gray-700">
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-xl font-black tracking-tighter hover:text-blue-400 transition">
              PORTFOLIO.PRO
            </Link>
            <div className="hidden md:flex gap-6">
              <Link to="/" className="text-sm font-semibold hover:text-blue-400 transition">Inicio</Link>
              <Link to="/blog" className="text-sm font-semibold hover:text-blue-400 transition">Blog</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuth ? (
              <div className="flex gap-3 items-center">
                <Link 
                  to="/admin/profile" 
                  className="text-sm font-medium hover:text-blue-400 border border-gray-600 px-3 py-1.5 rounded-md transition"
                >
                  ⚙️ Perfil
                </Link>
                <Link 
                  to="/admin" 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-bold transition shadow-md"
                >
                  + Nuevo Post
                </Link>
                <button 
                  onClick={logout} 
                  className="ml-2 text-red-400 hover:text-red-300 text-xs font-black uppercase tracking-widest transition"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded-md text-sm transition"
              >
                Admin Login
              </Link>
            )}
          </div>
        </nav>
        
        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow container mx-auto p-6 md:p-12">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<PostDetail />} /> {/* RUTA DINÁMICA PARA LEER MÁS */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas Privadas Protegidas */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <CreatePost /> 
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/profile" 
              element={
                <ProtectedRoute>
                  <EditProfile /> 
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <footer className="p-6 text-center text-gray-400 text-sm border-t border-gray-200">
          © {new Date().getFullYear()} - Desarrollo Web Fullstack | Hoja de Vida Profesional
        </footer>
      </div>
    </Router>
  );
}

export default App;