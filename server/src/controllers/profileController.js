///Este controlador usará la técnica de "Upsert" (actualizar si existe, crear si no).
const Profile = require('../models/Profile');

// @desc    Obtener el perfil público
// @route   GET /api/profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

// @desc    Actualizar perfil (PROTEGIDO)
// @route   POST /api/profile
export const updateProfile = async (req, res) => {
  try {
    // Buscamos el único perfil y lo actualizamos, o creamos uno nuevo
    const profile = await Profile.findOneAndUpdate(
      {}, 
      req.body, 
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el perfil' });
  }
};