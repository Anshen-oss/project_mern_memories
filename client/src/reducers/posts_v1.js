import { FETCH_ALL, CREATE, FETCH_POST, UPDATE, DELETE, FETCH_BY_SEARCH, LIKE, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 * Spread the state and onli change the state of one variable
 *  return { ...state, isLOading }
 */
const posts = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
   case FETCH_POST:
       return { ...state, post: action.payload };
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // Change the post that just receive the comment...
          if(post._id === action.payload._id)  return action.payload;
          // return all the posts normally
          return post;
        }),
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
       return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
       return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};


export default posts;


