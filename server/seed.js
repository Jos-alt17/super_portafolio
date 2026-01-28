require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

const seedUser = async () => {
  console.log('--- Iniciando proceso de Seed ---');
  
  // LOG DE SEGURIDAD: Esto te dirá si el script realmente está viendo tu clave
  if (!process.env.MONGO_URI) {
    console.error('Error: La variable MONGO_URI no está definida en el archivo .env');
    process.exit(1);
  }
  
  console.log('Intentando conectar a MongoDB Atlas...');

  try {
    // 1. Conexión a la base de datos
    await connectDB();
    console.log('Conexión establecida correctamente.');

    // 2. Limpieza (Opcional): Borra usuarios existentes para evitar duplicados
    // await User.deleteMany({}); 

    // 3. Creación del usuario
    const admin = new User({
      username: 'admin',
      password: 'password123' // Recuerda que esto debería encriptarse en el modelo User
    });

    await admin.save();
    
    console.log('------------------------------------------');
    console.log('¡Usuario administrador creado con éxito!');
    console.log('Username: admin');
    console.log('------------------------------------------');
    
    process.exit(0);
  } catch (error) {
    console.error('--- ERROR DURANTE EL SEED ---');
    console.error('Mensaje:', error.message);
    
    // Si el error es de autenticación, te lo dirá aquí
    if (error.message.includes('Authentication failed')) {
      console.error('CAUSA: La contraseña o el usuario en el .env son incorrectos.');
    }
    
    process.exit(1);
  }
};

seedUser();