// import express from 'express';
// import mongoose from 'mongoose';

// import PostMessage from '../models/postMessage.js';

// const router = express.Router();

// /**
//  * @function getPosts
//  * @param {*} req
//  * @param {*} res
//  * const LIMIT - the limit is going to be the number of posts per page - 8 by default (You can change it)
//  * const startIndex - a start index of a post on a specific page for example the
//  * start index of the first post on the third page would be 8 plus 8 plus 8
//  * minus 1 because we start from 0 and that would be 23
//  *
//  * const total - nous avons toujours besoin de savoir quelle est la dernière page
//  * à laquelle nous pouvons faire défiler c'est pourquoi nous avons la variable total
//  *
//  * Nous voulons obtenir les messages du plus récent au plus ancien à cause de cela,
//  * nous devons les trier par identifiant. this is going to give us the newest post first:
//  * const posts = await PostMessage.find().sort({ _id: 1 });
//  * PUIS nous voulons les limiter:
//  * const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT);
//  *
//  * PUIS enfin nous devons ignorer toutes les pages précédentes par exemple si
//  * vous êtes sur la page 2 vous ne voulez pas récupérer à nouveau les 16 premiers
//  * posts, vous voulez ignorer les 8 premiers et à cause de cela nous allons utiliser
//  * .skip() et nous allons sauter jusqu'à l'index de départ:
//  * const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

//  */
// export const getPosts = async (req, res) => {
//     const { page } = req.query;

//     try {
//         const LIMIT = 8;
//         // Get the starting index of every page:
//         const startIndex = (Number(page) - 1) * LIMIT;// get the starting index of every page

//         const total = await PostMessage.countDocuments({});
//         const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

//         res.status(200).json({ data: posts, currentPage: Number(page),numberOfPages: Math.ceil(total / LIMIT) });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// /**
//  *
//  * @param {*} req
//  * @param {*} res
//  * @description
//  * QUERY -> /posts?page=1 -> page = 1
//  * PARAMS -> /posts/:id or /posts/123 -> id = 123
//  *  we use query if you want to well query some data like search
//  * we use params if you want to get some specific resource like posts
//  */
// export const getPostsBySearch = async (req, res) => {
//     const { searchQuery, tags } = req.query;
//     try {
//         // convert title in a regular expression
//        const title = new RegExp(searchQuery, "i"); // Test, test, TEST -> test

//        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

//         res.json({ data: posts });
//     } catch(error) {
//         res.status(404).json({ message: error.message })
//     }
// }

// export const getPost = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const post = await PostMessage.findById(id);

//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }


// /**
//  * @function createPost
//  * @param {*} req
//  * @param {*} res
//  */
// export const createPost = async (req, res) => {
//     const post = req.body;

//     const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

//     try {
//         await newPostMessage.save();

//         res.status(201).json(newPostMessage );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

// /**
//  * @function updatePost
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

// /**
//  * @function deletePost
//  * @param {*} req
//  * @param {*} res
//  * @returns
//  */
// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: "Post deleted successfully." });
// }

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!req.userId) {
//         return res.json({ message: "Unauthenticated" });
//       }

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const post = await PostMessage.findById(id);

//     const index = post.likes.findIndex((id) => id ===String(req.userId));

//     if (index === -1) {
//       post.likes.push(req.userId);
//     } else {
//       post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }
//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
//     res.status(200).json(updatedPost);
// }

// // we want to get a few values from our front end
// export const commentPost = async (req, res) => {
//   const { id } = req.params;
//   const { value } = req.body;

//   // we are getting the post from the database
//   const post = await PostMessage.findById(id);

//   // we are adding the comments to that post
//   post.comments.push(value);

//   // Then, We have to actually update the post it in the database
//  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//  // return res.json(updatedPost);
//  // ce message mis à jour et nous pouvons le recevoir sur le front-end
//  res.json(updatedPost);
// }


// export default router;

import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;
