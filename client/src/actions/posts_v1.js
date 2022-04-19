import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

// actions creator
import * as api from '../api/index.js';


/**
 * @function getPost()
 * @param {*} page
 * @returns a post
 * Creation of the constant FETCH_POST in constants/actionTypes.js
 */
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


// we want to pass a page to it so that it only fetches the posts for that specific page
/**
 *
 * @param {*} page
 * @returns
 * La seule question que nous devons nous poser est de savoir quand voulons-nous
 * commencer à charger dès que nous appelons getPosts juste avant d'essayer
 * de récupérer les posts avec await api.fetchPosts(page)
 */
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
     const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * @function getPostsBySearch
 * @param {*} searchQuery
 * @returns
 */
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    // nous devrons déstructurer les données deux fois la première fois parce
    // que nous faisons une requête axios et la deuxième fois parce que nous les
    // mettons dans un nouvel objet où il a la propriété data
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch(error) {
    console.log(error);
  }
}


/**
 *
 * @function createPost
 * @param {*} post
 * @returns
 */
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createPost(post);

    history.push(`/posts/${data._id}`);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async(dispatch) => {
  try {
    // we're receiving something back once we actually call this api
    const { data } = await api.comment(value, id);

    // payload: the new post include now the comment. the last part we have to
    // do is deal with this data in our redux and then send our comments back to
    // our component commentSection where we'll be able to fetch them and then
    // loop over the real comments
    dispatch({ type: COMMENT, payload: data })

    // after we dispatch that specific comment return:
    return data.comments;

  } catch(error) {
    console.log(error);
  }
}

export const deletePost = (id) => async(dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error){
    console.log(error);
  }
}
