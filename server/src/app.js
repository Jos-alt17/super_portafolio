const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// --- IMPORTAR RUTAS ---
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// --- 1. MIDDLEWARES DE SEGURIDAD GLOBAL (Requisitos Rúbrica) ---

// Helmet: Protege la app configurando cabeceras HTTP de seguridad (XSS, Clickjacking, etc.)
app.use(helmet()); 

// CORS: Permite la comunicación con el frontend (React)
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // En producción se limita al dominio del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 

// Lectura de JSON: Necesario para procesar los cuerpos de las peticiones (Body Parser)
app.use(express.json()); 

// Rate Limiting: Previene ataques de fuerza bruta y DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
  max: 100, // Máximo 100 peticiones por IP
  message: {
    status: 429,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo en 15 minutos'
  }
});
app.use(limiter);

// --- 2. DEFINICIÓN DE RUTAS DE LA API ---

// Ruta base de estado
app.get('/', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'API del Portafolio Funcionando Correctamente' 
  });
});

// Rutas de Autenticación (Login)
app.use('/api/auth', authRoutes);

// Rutas del Blog (Posts técnicos)
app.use('/api/posts', postRoutes);

// Rutas de la Hoja de Vida (Perfil)
app.use('/api/profile', profileRoutes);

// --- 3. MANEJO CENTRALIZADO DE ERRORES (Requisito Rúbrica) ---
app.use((err, req, res, next) => {
  // En desarrollo mostramos el stack, en producción solo el mensaje
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Error interno del servidor',
    // Si estás en desarrollo, podrías incluir: stack: err.stack 
  });
});

module.exports = app;