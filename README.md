Portafolio Profesional Fullstack - Final Project
Este proyecto es un sistema de portafolio y blog técnico robusto, diseñado con un enfoque en seguridad, escalabilidad y una experiencia de usuario fluida. Permite gestionar una hoja de vida dinámica y publicar artículos técnicos a través de una interfaz de administración protegida.

🚀 Tecnologías Utilizadas
Frontend
React + Vite: Para una interfaz reactiva y tiempos de compilación ultra rápidos.

Tailwind CSS: Framework de utilidades para un diseño responsivo y moderno.

React Router: Gestión de navegación SPA (Single Page Application).

Axios: Cliente HTTP para la comunicación con la API.

Backend
Node.js + Express.js: Entorno de ejecución y framework para la API RESTful.

MongoDB + Mongoose: Base de datos NoSQL para persistencia de datos.

JWT (JSON Web Tokens): Sistema de autenticación basado en tokens.

Bcryptjs: Encriptación de contraseñas con hashing seguro.

🛠️ Justificaciones Técnicas (Requisitos Rúbrica)
1. Base de Datos: ¿Por qué MongoDB (NoSQL)?
Se seleccionó MongoDB sobre PostgreSQL por las siguientes razones:

Flexibilidad de Esquema: Los posts del blog y los campos de la hoja de vida pueden evolucionar sin necesidad de migraciones complejas de tablas.

Modelado de Datos: La capacidad de usar documentos embebidos (como arrays de habilidades o etiquetas) permite consultas más rápidas sin múltiples JOINs.

Nativo JSON: Al trabajar con JavaScript en todo el stack (MERN), el intercambio de datos es directo y eficiente.

2. Seguridad Implementada
Para cumplir con los estándares de seguridad exigidos, se integraron:

Helmet.js: Configuración de cabeceras HTTP para prevenir ataques XSS y Clickjacking.

CORS: Restricción de acceso a la API solo desde dominios autorizados.

Express Rate Limit: Protección contra ataques de fuerza bruta limitando peticiones por IP.

Variables de Entorno: Uso de .env para proteger secretos como el JWT_SECRET y la MONGO_URI.

💻 Instalación y Ejecución Local
Requisitos previos
Node.js instalado.

Instancia de MongoDB (Local o Atlas).

Paso 1: Clonar y configurar el servidor
Bash
cd server
npm install
# Crear archivo .env con:
# PORT=5000
# MONGO_URI=tu_url_de_mongodb
# JWT_SECRET=tu_clave_secreta
npm run dev
Paso 2: Configurar el cliente
Bash
cd client
npm install
npm run dev
📑 Documentación de la API
La API sigue una arquitectura RESTful:

POST /api/auth/login - Autenticación de administrador.

GET /api/posts - Obtener todos los artículos.

POST /api/posts - Crear artículo (Protegido).

GET /api/profile - Ver hoja de vida.

POST /api/profile - Editar hoja de vida (Protegido).

🔗 Enlaces de Despliegue
Frontend: [Tu enlace de Vercel/Netlify aquí]

Backend: [Tu enlace de Render/Railway aquí]