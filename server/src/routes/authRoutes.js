const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { login } = require('../controllers/authController');

// --- MIDDLEWARE DE VALIDACIÓN LOCAL ---
// Esto intercepta la petición y verifica si hay errores antes de llegar al controlador
const validateLogin = [
  check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'fail',
        errors: errors.array() 
      });
    }
    next();
  }
];

// --- RUTAS ---

/**
 * @route   POST /api/auth/login
 * @desc    Autenticar usuario y obtener token
 * @access  Public
 */
router.post('/login', validateLogin, login);

module.exports = router;