const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  experience: [{
    company: String,
    role: String,
    years: String,
    description: String
  }],
  skills: [String],
  education: [{
    school: String,
    degree: String,
    year: String
  }],
  contactEmail: String
});

module.exports = mongoose.model('Profile', profileSchema);