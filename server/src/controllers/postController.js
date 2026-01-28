//Aquí definiremos cómo crear, leer, actualizar y borrar posts.
const Post = require('../models/Post');

// @desc    Obtener todos los posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts' });
  }
};

// @desc    Crear un post (PROTEGIDO)
// @route   POST /api/posts
const createPost = async (req, res) => {
  const { title, content, category, tags } = req.body;
  try {
    const newPost = new Post({ title, content, category, tags });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el post' });
  }
};

// @desc    Borrar un post (PROTEGIDO)
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ message: 'Post no encontrado' });
  }
};

module.exports = { getPosts, createPost, deletePost };