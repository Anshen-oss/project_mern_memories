// import { AUTH, LOGOUT } from '../constants/actionTypes';

// /**
//  *
//  * @param {*} state
//  * @param {*} action
//  * Nous voulons obtenir tous les détails à l'intérieur du payload avec:
//  * console.log(action?.data);
//  */

// const authReducer = (state = { authData: null }, action) => {
//   switch(action.type) {
//     case AUTH:
//       // console.log(action?.data);
//       // On stocke les données dans le localStorage
//       localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

//       return { ...state, authData: action?.data }
//     case LOGOUT:
//       localStorage.clear();

//       return { ...state, authData: null }
//     default:
//       /** Return the old state */
//       return state;
//   }
// }

// export default authReducer;

import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
