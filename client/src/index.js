/**
 * Provider va garder trace de ce magasin qui est cet état global et qui nous
 * permet d'accéder à ce magasin de n'importe où dans l'application. Nous
 * n'avons pas besoin d'être exactement dans un parent composant ou dans un
 * composant enfant, nous pouvons accéder à cet état de n'importe où.
 *
 * redux-thunk permet aux créateurs d'action d'inverser le contrôle en
 * répartissant les fonctions. Ils  recevraient le dispatch comme argument et
 * pourraient l'appeler de manière asynchrone.
 * Ces fonctions sont appelées thunks .
 */
import React from 'react';
import ReactDOM from 'react-dom';
/* INITIALIZATION DE REDUX
  * Le composant <Provider> rend le store Redux disponible pour tous les
  * composants imbriqués qui doivent accéder au magasin Redux. On peut
  * accéder ausx states à n'impôrte quel endroit
*/
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';
import './index.css';


/*
  * store : objet qui contient l'état complet de votre application
  * createStore(reducer, [preloadedState]  Crée un magasin Redux qui contient
  * l'arborescence d'état complète de l'application.
  * 1. reducer (Fonction) : Une fonction réductrice qui renvoie l' arbre d'état
  * suivant ,étant donné l'arbre d'état actuel et une action à gérer.
  * [ preloadedState] (tout) : L'état initial.
*/
const store = createStore(reducers, compose(applyMiddleware(thunk)));


/*
  * Une fois le magasin créé, nous pouvons le mettre à disposition de nos
  * composants React en mettant un React Redux <Provider> autour de notre application
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
  );
