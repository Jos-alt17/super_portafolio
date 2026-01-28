const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  bio: { type: String, default: '' },
  contact: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  languages: [{
    name: String,
    level: Number // Del 1 al 100 para la barra de progreso
  }],
  skills: [String],
  interests: [String],
  experience: [{
    role: String,
    company: String,
    city: String,
    duration: String,
    description: [String] // Array para las viñetas (bullets)
  }],
  education: [{
    degree: String,
    institution: String,
    city: String,
    duration: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);