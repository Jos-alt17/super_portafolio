const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Genera un JWT firmado
 * @param {string} id - ID del usuario de la base de datos
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expira en 30 días
  });
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Buscar si el usuario existe
    const user = await User.findOne({ username });

    // 2. Verificar contraseña usando el método que creamos en el Modelo
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      // Usamos 401 (No autorizado) para credenciales incorrectas
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor al intentar loguear' });
  }
};

module.exports = { login };