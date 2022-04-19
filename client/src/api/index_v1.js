import axios from 'axios';

//const API = axios.create({ baseURL: 'https://anshen-app.herokuapp.com' });
const API = axios.create({ baseURL: 'http://localhost:5000' });

/**
 * @function interceptors a function that's going to happen on each one of our requests
 * @return the actual request
 * Transforme la requête avant qu'Axios envoie nos différentes requêtes:
 * fetchPosts, createPost, likePost, updatePost, deletePost, signIn, signUp.
 * Pourquoi ? Nous devons renvoyer notre jeton à notre backend afin que le
 * middleware backend puisse vérifier que nous sommes réellement connectés
 * Si le profile existe:
 *   if (localStorage.getItem('profile'))
 * Nous rajoutons la chaîne Bearer à notre jeton et nous ajoutons tout cela à
 * chacun de nos requêtes:
 * req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
 *
 */
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
/**
 *
 * @param {*} id
 * @returns
 * create the routes in the backEnd: `/posts/${id}/commentPost`, etc... in the
 * routes folder
 */
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

