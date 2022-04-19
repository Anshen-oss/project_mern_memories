import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';


/**
 * Lors de la soumission du formulaire:
 *  <form className={classes.form} onSubmit={handleSubmit}>
 * Vérifier si nous avons accès à tous les états des champs inputs:
 * lastname, firstname, email, apssword et confirmPassword
 */
/** Le nom des states correspondent aux noms des champs inputs */
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

 /**
  * The name of the module: SignUp
  * isSignup {Boolean} -true: show fields First name and Last name in the Form
  * Show the button SIGN UP and the title SIGN UP
  * false - Don't show fields First name and Last name in the Form
  * Show only fields Email address and Password, the title Sign In and the button SIGN IN
*/
const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

/**
 * @function handleShowPassword - Toggle the state of the password
 * S'il il est off met sur on. si password est à on met à off
*/
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

/**
 * @function handleSubmit
 * @param {string} e l'événement
 *
 * Vérifier si nous avons accès à tous les valeurs des inputs du formulaire:
 * const [formData, setFormData] = useState(initialState);
 *
 * Deux types de soumission dépendant des actions signin et signup importées
 * plus haut et dans lesquelles on passe les données des inputs: formData et en
 * 2eme argument: history qui nous permet de naviguer si qqe chose se passe bien.
 */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');


/**
 * @function handleChange - Modifie le state formData et le rempli avec les données
 * @param {string} e : l'événement
 * setFormData({ ...formData, [e.target.name]: e.target.value });
 * @param {...string} formData - Copy the existing properties with the spread operator
 * @param {[]} e - Copie only dans formData la valeur des champs ciblés par l'événement e
*/
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
             clientId="791282828529-133vdvgsojrn8ng882acne3g8f7epeoa.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;

// /** Auth module */

// import React, { useState } from 'react';
// import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import { GoogleLogin } from 'react-google-login';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// import Icon from './icon';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import useStyles from './styles';
// import Input from './Input';
// import { signin, signup } from '../../actions/auth';

// /**
//  * Lors de la soumission du formulaire:
//  *  <form className={classes.form} onSubmit={handleSubmit}>
//  * Vérifier si nous avons accès à tous les états des champs inputs:
//  * lastname, firstname, email, apssword et confirmPassword
//  */

// /** Le nom des states correspondent aux noms des champs inputs */
// const initialState = { firstName: '', lastName: '', email: '', password:'', confirmPassword: '' };

// /** The name of the module: Auth */
//  /**
//   * isSignup {Boolean} -true: show fields First name and Last name in the Form
//   * Show the button SIGN UP and the title SIGN UP
//   * false - Don't show fields First name and Last name in the Form
//   * Show only fields Email address and Password, the title Sign In and the button SIGN IN
// */
// const Auth = () => {
//  const classes = useStyles();
//  const [showPassword, setShowPassword] = useState(false);
//  const [isSignup, setIsSignup] = useState(false);
//  const [formData, setFormData] = useState(initialState);
//  const dispatch = useDispatch();
//  const history = useHistory();

// /**
//  * @function handleSubmit
//  * @param {string} e l'événement
//  *
//  * Vérifier si nous avons accès à tous les valeurs des inputs du formulaire:
//  * const [formData, setFormData] = useState(initialState);
//  *
//  * Deux types de soumission dépendant des actions signin et signup importées
//  * plus haut et dans lesquelles on passe les données des inputs: formData et en
//  * 2eme argument: history qui nous permet de naviguer si qqe chose se passe bien.
//  */
//  const handleSubmit = (e) => {
//    //console.log(formData);
//    e.preventDefault();

//    // console.log(formData);
//    if(isSignup) {
//     dispatch(signup(formData, history));
//    } else {
//     dispatch(signin(formData, history));
//    }
//  };

//  /**
//   * @function handleChange
//   * @param {string} e : l'événement
//   */
//  const handleChange = (e) => {
//   /**
//    * @function - Modifie le state formData et le rempli avec les données
//    * setFormData({ ...formData, [e.target.name]: e.target.value });
//    * @param {...string} formData - Copy the existing properties with the spread operator
//    * @param {[]} e - Copie only dans formData la valeur des champs ciblés par l'événement e
//   */
//    setFormData({ ...formData, [e.target.name]: e.target.value });
//  }

//  /**
//   * @function handleShowPassword - Toggle the state of the password
//   * @param {boolean} prevShowPassword the previous state
//   * S'il il est off met sur on. si password est à on met à off
//   *
// */
//  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

//  /**
//   * This is a function on the button
//   * Return the state og the const IsSignup
//   * Switch the mode from Sign Up to Sign In
//   */
//  const switchMode = () => {
//   setIsSignup((prevIsSignup) => !prevIsSignup);
//   setShowPassword(false);
//   /** Reset the password */
//   //handleShowPassword(false);
//  };

//  /**
//   * @function googleSuccess - Success d'Auth
//   * dispatch() - action type: 'AUTH'
//   * On va envoyer comme data le payload qui est un nouveau objet qui contient
//   * le result et le token:
//   * dispatch({ type: 'AUTH', data: {result, token}});
//   *
//   * On va ajouter le reducer pour cette action : reducers/auths.js
//   *
//   * ?. Opérateur de chaîne optionnel
//    * @Link https://www.delftstack.com/howto/typescript/question-mark-in-typescript/
//    *
//    * Si nous n'avons pas accès à l'objet réponse , res, nous voulons nous
//    * assurer que nous n'obtenons pas d'erreur.
//    */
// const googleSuccess = async (res) => {
//   //console.log(res); // profileObj, tokenId, etc...
//   const result = res?.profileObj;
//   const token = res?.tokenId;

//   try {
//     dispatch({ type: 'AUTH', data: { result, token }})

//     // Back to the home after the dispatch
//     history.push('/');

//   } catch(error) {
//     console.log(error);
//   }
// }

// const googleFailure = (error) => {
//   console.log(error);
//   console.log('Google Sign In was unsuccessful. Try again Later');
// }

// return (
//     <Container component="main" maxWidth="xs">
//       <Paper className={classes.paper} elevation={3}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             { isSignup && (
//             <>
//               <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
//               <Input name="lastName" label="Last Name" handleChange={handleChange} half />
//             </>
//             )}
//             <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
//             <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
//             { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
//           </Grid>
//           <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
//             { isSignup ? 'Sign Up' : 'Sign In' }
//           </Button>
//           <GoogleLogin
//             clientId="791282828529-133vdvgsojrn8ng882acne3g8f7epeoa.apps.googleusercontent.com"
//             render={(renderProps) => (
//               <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
//                 Google Sign In
//               </Button>
//             )}
//             onSuccess={googleSuccess}
//             onFailure={googleFailure}
//             cookiePolicy="single_host_origin"
//           />
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Button onClick={switchMode}>
//                 { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default Auth;
