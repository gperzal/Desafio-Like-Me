// Importa el modelo de Post
import Post from '../models/Post.js';

// Controlador para obtener posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
};

// En postsController.js
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al recuperar el post');
  }
};

// Controlador para crear un post
export const createPost = async (req, res) => {
  const { titulo, descripcion, img } = req.body;
  try {
    const newPost = await Post.create({ titulo, descripcion, img });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

// Controlador para editar un post
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { titulo, img, descripcion } = req.body;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    await post.update({ titulo, img, descripcion });
    res.json(post);
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};


// En tu controlador de posts
export const updateReaction = async (req, res) => {
  const { postId } = req.params;
  const { reaction } = req.body; // 'like', 'dislike'

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Incrementa o decrementa el contador de likes/dislikes según la reacción
    if (reaction === 'like') {
      post.likeCount++;
    } else if (reaction === 'dislike') {
      post.dislikeCount++;
    }

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reacción', error });
  }
};




// Controlador para borrar un post
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await Post.destroy({
      where: { id: postId } // Asegúrate de que 'id' sea el nombre correcto de la columna de clave primaria en tu modelo de Post
    });

    if (result > 0) {
      res.status(204).end(); // No Content
    } else {
      res.status(404).json({ message: "Post no encontrado" }); // No se encontró ningún post para eliminar
    }
  } catch (error) {
    res.status(500).json({ message: "Error al borrar el post", error });
  }
};




