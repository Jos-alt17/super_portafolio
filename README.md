# Portfolio Profesional - Fullstack Developer 🚀

Este proyecto es un sistema integral de Portafolio y Blog Técnico desarrollado como proyecto final para el curso de Desarrollo Web. Permite gestionar una hoja de vida dinámica y un blog profesional a través de una interfaz de administración segura.

## 🔗 Enlaces de Despliegue
* **Frontend (Vercel/Netlify):** [INSERTAR_LINK_AQUÍ]
* **Backend (Render/Railway):** [INSERTAR_LINK_AQUÍ]
PORT=5000
MONGO_URI=mongodb+srv://josfrns_db_user:Josf2026@portafolio-db.mect0rq.mongodb.net/?appName=Portafolio-DB
JWT_SECRET=clave_super_secreta_123
NODE_ENV=development
* **Base de Datos:** MongoDB Atlas
mongodb+srv://josfrns_db_user:Josf2026@portafolio-db.mect0rq.mongodb.net/?appName=Portafolio-DB 

---

## 🛠️ Justificación de Tecnologías 

### Frontend: React + Vite + Tailwind CSS
Se seleccionó **React** por su arquitectura basada en componentes, permitiendo una interfaz reactiva donde el estado de autenticación se gestiona de manera eficiente con Hooks (`useState`, `useEffect`). 
* **Vite:** Elegido sobre CRA por su velocidad superior en el arranque y Hot Module Replacement (HMR).
* **Tailwind CSS v4:** Utilizado para garantizar un diseño **responsive y accesible** mediante clases de utilidad, optimizando el tiempo de desarrollo visual.

### Backend: Node.js + Express.js
Se implementó una **API RESTful** con Express debido a su ligereza y gran ecosistema de middlewares de seguridad. La arquitectura permite un manejo centralizado de errores y una comunicación fluida con el frontend mediante **Axios**.

### Base de Datos: MongoDB (NoSQL)
Se eligió **MongoDB con Mongoose** por las siguientes razones:
1.  **Flexibilidad de Esquema:** Los posts del blog y la experiencia laboral no tienen una estructura rígida, permitiendo añadir campos sin afectar registros previos.
2.  **Escalabilidad:** Ideal para aplicaciones de contenido donde la velocidad de lectura es prioritaria.
3.  **Integración:** El formato BSON de MongoDB es nativo para el manejo de objetos JSON en JavaScript.

---

## 🛡️ Seguridad Implementada
* **Autenticación:** Sistema de login protegido mediante **JWT (JSON Web Tokens)**.
* **Protección de Datos:** Uso de **Bcrypt** para el hashing de contraseñas.
* **Middlewares de Seguridad:** * `Helmet`: Para asegurar encabezados HTTP.
    * `CORS`: Configurado para restringir accesos no autorizados.
    * `Express-Rate-Limit`: Protección contra ataques de fuerza bruta.
* **Variables de Entorno:** Gestión de secretos (`JWT_SECRET`, `MONGO_URI`) mediante archivos `.env`.

---

## 🚀 Ejecución Local

### Prerrequisitos
* Node.js (v18 o superior)
* MongoDB local o cuenta en MongoDB Atlas

### Paso 1: Clonar el repositorio
```bash
git clone (https://github.com/Jos-alt17/super_portafolio?tab=readme-ov-file#port5000)
cd MI_PORTAFOLIO_PRO
### Paso 2: Configurar el Backend
1.Entra a la carpeta server: cd server

2.Instala dependencias: npm install

3.Crea un archivo .env y añade:
Fragmento de código
PORT=5000
MONGO_URI=mongodb+srv://josfrns_db_user:Josf2026@portafolio-db.mect0rq.mongodb.net/?
appName=Portafolio-DB
JWT_SECRET=clave_super_secreta_123
NODE_ENV=development
Inicia el servidor: npm run dev

### Paso 3: Configurar el Frontend
1.Abre una nueva terminal en la raíz del proyecto.

2.Entra a la carpeta client: cd client

3.Instala dependencias: npm install

4.Inicia la aplicación: npm run dev

### Blog Posts (Backend)
El blog incluye artículos detallados sobre:

Seguridad en APIs: Mejores prácticas y uso de Helmet/Rate Limit.

MongoDB vs PostgreSQL: Justificación técnica de la elección de base de datos. 