const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// Middleware para encriptar contraseña antes de guardar
userSchema.pre('save', async function() {
  // Solo encriptar si la contraseña es nueva o ha sido modificada
  if (!this.isModified('password')) return;

  try {
    // IMPORTANTE: Asegúrate de que sea genSalt (con 'n') y no getSalt
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error; 
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);