const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true }, // Aquí irán las >1000 palabras
  author: { type: String, default: 'Tu Nombre' },
  category: { type: String, enum: ['Backend', 'Frontend', 'Seguridad'], default: 'Backend' },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);