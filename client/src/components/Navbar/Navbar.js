import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memoriesLogo.gif';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';


/**
 *
 * @returns Appbar
 * Nous allons immédiatement essayer de récupérer  l'utilisateur réel du
 * localStorage avec:
 * useState(JSON.parse(localStorage.getItem('profile')));
 * @example https://blog.logrocket.com/localstorage-javascript-complete-guide/#webstorageapi
 *
 */
const Navbar = () => {
  const classes = useStyles();
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  /**
   * @function logout - Se déconnecter
   * Redirige  vers la page d'accueil
   * Met le user à null:
   * setUser(null);
   */
  const logout = () => {
   dispatch({ type: actionType.LOGOUT });
    //redirect to the Home after dispatch
    history.push('/auth');

    setUser(null);
  }

  /**
   * @function useEffect()
   * Appelle useEffect lorsque l'url passe de
   * Lorsque location change définir l'url passe de http://localhost:3000/
   * à http://localhost:3000/auth
   * On utilise donc le hook useLocation()
  */
  useEffect(() => {
    const token = user?.token;

    // ON déconnecte le user au bout d'une heure de connexion
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);

  return (
      <AppBar className={classes.appBar} position="static" color="transparent">
        <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45px" />
          <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    );
};

export default Navbar;

