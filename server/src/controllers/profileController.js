const Profile = require('../models/Profile');

// @desc    Obtener el perfil público
// @route   GET /api/profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

// @desc    Actualizar perfil (PROTEGIDO)
// @route   POST /api/profile
const updateProfile = async (req, res) => {
  try {
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

// Exportar al estilo CommonJS
module.exports = { getProfile, updateProfile };