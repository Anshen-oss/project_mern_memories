import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost =  async (req, res) => {
  const post = req.body;

  // On diffuse les valeurs dun post spécifique avec { ...post }
  // puis on définit le créateur du post - Le backend définit automatiquement
  // le créateur d'un message spécifique
  // On ajoute la propriété createdAt
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().ISOString });

  try {
      await newPost.save();

      res.status(201).json(newPost);
  } catch (error) {
     res.status(409).json({ message: error.message });
  }

}


export const updatePost = async (req, res) => {

  // rename id en: _id
  const {id: _id} = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  // Si id valid, update the post
  const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

  res.json(updatePost);
}


export const deletePost = async (req,res) => {
   const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await PostMessage.findByIdAndRemove(id);

  console.log('DELETE');
  res.json({ message: 'Post deleted successfully' })

}

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns number of likes created
 *
 * if you call a middleware like this middleware/auth.js before a specific action
 * like router.patch('/:id/likePost', auth, likePost) in  (router/post.js)
 *
 * in this case then you can populate the request and then you'll have access to
 * that request right into the next action that you have so
 * if we go into our auth and then in here if we populate the request.userid:

 * if(token && isCustomAuth) {
 *   decodedData = jwt.verify(token, 'test');
 *   req.userId = decodedData?.id;
 *  } else {
 *    decodedData = jwt.decode(token);
 *    req.userId = decodedData?.sub;
 * }
 * then we go to the next controller which is going to be the likePost and now
 * the request is going to have that userId :
 * export const likePost = async (req, res) => {
  const { id } = req.params;

 * req.userId....
 * }
*/
export const likePost = async (req, res) => {
  const { id } = req.params;

  // Nous allons vérifier que le user peut liker le post qu'une seule fois
  // Nous ppuvons le faire car nous avons maintenant cette valeur spéciale qui
  // est req.userId grâce au middleware (Voire vidéo 4h15mn)

  if(!req.userId) return res.json({ message: 'Unauthenticated' })

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  const post = await PostMessage.findById(id);

  // Nous allons voir si l'Id du user est déjà dans la section
  // dans le callback nous parcourons tous les Ids afin que chaque like
  // soit l'indentifiant d'une personne unique, ce qui nous permettra de savoir
  // qui a aimé le msg spécifique.
  const index = post.likes.findIndex((id) => id === String(req.userId));

  // Si l'id du user ne se trouve pas dans la variable index alors sa valeur est : -1
  if(index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    //dislike a post
    // La fonction filter qui prend un callback va parcourir tous les Ids
    // et va retourner un  nouveau tableau qui ne contient plus le user qui a liké
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

  res.json(updatedPost);
}


export default router;
