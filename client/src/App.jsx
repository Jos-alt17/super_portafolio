import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Blog from './pages/Blog'; 
import CreatePost from './pages/CreatePost'; 
import EditProfile from './pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';

// Componente Home: Aquí se mostrarán los datos que guardes en EditProfile
const Home = () => (
  <div className="text-center mt-20">
    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
      Mi Hoja de Vida
    </h1>
    <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
      Bienvenido a mi portafolio profesional. Aquí puedes encontrar mi trayectoria, 
      habilidades y artículos técnicos sobre desarrollo web.
    </p>
    <div className="mt-10">
      <Link to="/blog" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
        Ver Blog Técnico
      </Link>
    </div>
  </div>
);

function App() {
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Verificación de autenticación para mostrar/ocultar elementos del menú
  const isAuth = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* BARRA DE NAVEGACIÓN */}
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
                {/* Enlace para gestionar Perfil */}
                <Link 
                  to="/admin/profile" 
                  className="text-sm font-medium hover:text-blue-400 border border-gray-600 px-3 py-1.5 rounded-md transition"
                >
                  ⚙️ Perfil
                </Link>
                {/* Enlace para crear Posts */}
                <Link 
                  to="/admin" 
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-bold transition shadow-md"
                >
                  + Nuevo Post
                </Link>
                {/* Botón Salir */}
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
        
        {/* CONTENIDO PRINCIPAL CON MÁXIMO ANCHO PARA LEIBILIDAD */}
        <main className="flex-grow container mx-auto p-6 md:p-12">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
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

        {/* FOOTER SIMPLE PARA CUMPLIR DISEÑO */}
        <footer className="p-6 text-center text-gray-400 text-sm border-t border-gray-200">
          © {new Date().getFullYear()} - Desarrollo Web Fullstack
        </footer>
      </div>
    </Router>
  );
}

export default App;