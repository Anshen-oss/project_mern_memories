// // import jwt from "jsonwebtoken";

// // // A user wants to like a post, nous passons par le middleware
// // // parce que nous ne savons pas s'il a la permission pour le liker
// // // Click the like button => auth middleware
// // // auth middleware confirme ou rejette cette requête
// // // Dans le code ci-dessous, si tout les conditions sont correctes,
// // // next() va être appelé pour dire d'accord, vous aimez ce post, et
// // // c'est à ce moment là que vous appelez le controlleur:
// // // auth middleware (next) => like controller


// // /** NOtre middleware est similaire à notre controller qui a des arguments
// //  * req et res.
// //  * @param{string} next -faire quelque chose et passer à la chose suivante
// //  * Dans le bloc try, nous devons voir si l'utilisateur est vraiment ce qu'il
// //  * prétend être et nous pouvons le faire en utilisant le token Web json
// //  * Nous devons obtenir le token du front-end pour cela. Nous voulons
// //  * que le token soit en première position dans le tableau.
// //  * APrès division du tableau nous aaurons deux types de token, celui de Google Authentication
// //  * et le notre ici, et si sa longueur est inférieur à 500 cest bien le notre:
// //  * const isCustomAuth = token.length < 500;
// //  *
// //  */

// // // wants to like a post
// // // click the like button => auth middleware () => confirms or denies that request
// // // if correct = > okay to like the post:
// // // alors le middleware peut aller au controller: auth middleware (NEXT) => like controller
// // const auth = async(req, res, next) => {
// //   try {
// //     //console.log(req.headers)
// //     // get the token from the front-end
// //     const token = req.headers.authorization.split(" ")[1];
// //     const isCustomAuth = token.length < 500;

// //     // The data that we want to get from the token itself
// //     let decodedData;

// //     /** Si nous avons le token et si c'est le notre, isCustomAuth
// //      * jwt.verify(token, secret); va nous donner les données de chaque token spécifique:
// //      * le username et l'ID.
// //      * @param{string} token -
// //      * @param{string} 'test' - c'est le mêmes secret utilisé lors de la
// //      * création du token dans server/controller/user.js
// //      *
// //     */
// //     if(token && isCustomAuth) {
// //       decodedData = jwt.verify(token, 'test');

// //       /** Nous avons les données décodés, nous savons quel utilisateur
// //        * est connecté, like un post, supprime un post. Nous allons donc
// //        * stocker son ID dans: req.userId
// //       */
// //       req.userId = decodedData?.id;
// //     } else {
// //       //Si vous travaillez avec le token de Google auth
// //       decodedData = jwt.decode(token);

// //       /** sub: est un idendifiant avec lequel on peut différencier les utilisateurs */
// //       req.userId = decodedData?.sub;
// //     }
// //     /** On appelle next pour qu'on puisse passer l'action */
// //     next()

// //   } catch(error) {
// //     console.log(error);
// //   }
// // }

// // export default auth;

// // // On va utiliser ce middleware dans les routes: server/routes/posts.js

// import jwt from "jsonwebtoken";

// const secret = 'test';

// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;

//     let decodedData;

//     if (token && isCustomAuth) {
//       decodedData = jwt.verify(token, secret);

//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
