import express from 'express';

import { getPostsBySearch, getPost, getPosts, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

/** On ajoute le middleware avant des actions spécifiques
 * peu importe que les users soient connectés ou non, ils peuvent voir tous les messages,
 * mais pour créer, supprimer, liker et modifier un message,  les users doivent avoir
 * leur propre identifiant, ils doivent être connectés.
 * Nous avons mis le middleware sur la route likePost car bien que tout le monde
 * ait la possibilité de liker, il ne peut pas liker plus d'une fois!
*/


const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);




export default router;
