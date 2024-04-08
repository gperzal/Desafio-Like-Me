import express from 'express';
import { getPosts, getPostById, createPost, updateReaction, updatePost, deletePost } from '../controllers/postsController.js';

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:postId', getPostById);
router.post('/posts', createPost);
router.put('/posts/:postId/reaction', updateReaction);
router.put('/posts/:postId', updatePost); 
router.delete('/posts/:postId', deletePost);



export default router;
