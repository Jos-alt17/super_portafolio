//Aquí aplicaremos el middleware protect que creamos antes para que solo el admin pueda crear o borrar.
const express = require('express');
const router = express.Router();
const { getPosts, getPostById, createPost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/', getPosts);
router.get('/:id', getPostById); // <--- ESTA ES LA RUTA QUE FALTABA

// Rutas protegidas (Requieren Token)
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);

module.exports = router;