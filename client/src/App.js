import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';

import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

/**
 *
 * Si nous sommes connectés, en allant à l'url http://localhost:3000/auth le
 * user verra le formulaire pour s'inscrire/connecter. Nous ne voulons pas cela.
 * On va vérifier si le user est connecté. On peut faire cela car les infos du user
 * sont stockés dans le localStorage avec :
 * const user = JSON.parse(localStorage.getItem('profile'));
 * Selon l'état du user on pourra rendre qqe chose de différent dans la route:
 * <Route path="/auth" exact component={Auth} />
 * Si le user n'est pas connecté il va sur la page du formulaire pour s'inscrire/connecter
 * sinon il est redirigé vers la page des posts:
 * <Route path="/auth" exact component={() => (!user ? <Auth />) : <Redirect to="/posts" /> } />
 */
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return(
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path="*" exact component={NotFound}/>
        </Switch>
    </Container>
  </BrowserRouter>
  )

}

export default App;
