//Aquí aplicaremos el middleware protect que creamos antes para que solo el admin pueda crear o borrar.
const express = require('express');
const router = express.Router();
const { getPosts, createPost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', getPosts);

// Rutas protegidas (Requieren Token)
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);

module.exports = router;