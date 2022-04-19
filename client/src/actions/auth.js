// // import { AUTH } from '../constants/actionTypes';
// // import * as api from '../api/index.js';

// // /**
// //  * @function signin
// //  * @param{[]} formData
// //  * @param{[]} history
// //  * @return async function dispatch
// //  * Cette action sera passée au Reducer
// //  */
// // export const signin = (formData, history) => async (dispatch) => {
// //   try {
// //     // Log in the user - After log in the user go to the home page:
// //     //history.push('/');
// //     // Creation of the endpoint in the backend ok
// //     // Creation of Api Endpoints dans api/index.js
// //     // destructure the data from our request
// //     const { data } = await api.signIn(formData);

// //     dispatch({ type: AUTH, data });

// //     history.push('/');
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // export const signup = (formData, history) => async (dispatch) => {
// //   try {
// //     // Signup the user - Creation of the the endpoint in the backend
// //     const { data } = await api.signUp(formData);

// //     dispatch({ type: AUTH, data });

// //     history.push('/');
// //   } catch (error) {
// //       console.log(error);
// //   }
// // };

// import { AUTH } from '../constants/actionTypes';
// import * as api from '../api/index.js';

// export const signin = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await api.signIn(formData);

//     dispatch({ type: AUTH, data });

//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signup = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);

//     dispatch({ type: AUTH, data });

//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
