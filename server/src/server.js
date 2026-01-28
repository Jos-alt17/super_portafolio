require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Conectar a la BD
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});