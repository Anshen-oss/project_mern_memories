/**
 * L'endroit où nous allons mettre toute la logique complexe
 * de la connexion (siging) et de l'inscription(signup) de l'utilisateur
 * bcrypt est utilisé pour haché le mot de passe
 *
 * jwt c'est un moyen sûr pour nous de stocker l'utilisateur dans
 * un navigateur pendant une certaine période de temps par exemple
 * pour une heure 2 heures ou même une semaine de cette façon si
 * l'utilisateur quitte le site c'est un moyen sûr pour nous de stocker
 * l'utilisateur dans un navigateur pendant une certaine période de temps
 * par exemple pour une heure 2 heures ou même une semaine de cette façon
 * si l'utilisateur il pourra toujours rester connecté
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
const secret = 'test';
/**
 * @function signin - Obtenir du Front-end : email et mot de passe
 * @param {string} req
 * @param {string} res
 * req.body: contient les paramètres envoyés par le client dans le cadre d'une
 * requête POST issue du Front-end
 * POST user[name]=tobi&user[email]=tobi@learnboost.com
 * req.body.user.name
 * => "tobi"
 * req.body.user.email
 * => "tobi@learnboost.com"
 */
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
  // const existingUser cherche un utilisateur par son email dans la BDD
  // Si le password existe et si le password est correct on peut récupérer
  // le token via  const token = jwt.sign()
  const existingUser = await User.findOne({ email });

  if(!existingUser) return res.status(404).json({ message: "User doesn't exist"});

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

  if(!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials"})

  // @function sign()
  // @param {object} Nous fournissons toutes les informations que nous voulons stocker dans le token
  // @param {string} 'test' - Chaîne secrète à mettre dans un fichier séparé .env
  // @param {object} options - expiresIn
  const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, secret, { expiresIn: "1h" });

  // Nous avons le jeton(token),  nous envoyons le résultat qui va être égal au user
  // qui essaie de se connecter et nous envoyons le token que nous venons de créer
  res.status(200).json({ result: existingUser, token })
  } catch(error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

/**
 * @function signup - ajoute l'utilisateur à la Base de données
 * @param {*} req
 * @param {*} res
 * nous récupérons du body l'email, password, confirmPassord, firstName, lastName
 */
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  /**
   * trouver l'utilisateur existant car on ne peut pas créer de compte
   * si un utilisateur existe déjà un problème
   * if(existingUser) return res.status(400).json({ message: "User already exist"});
   */
  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ message: "User already exist"});

    /**
     * Si pas d'utilisateur existant => création de compte
     * - Vérifie d'abord que password et confirmPassword ne sont pas égaux :
     * return res.status(400).json({ message: "User already exist"});
    */
    if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match"});

    /**
     * Si il n'y a pas d'utilisateur existant et si les passwords sont égaux
     * Hash du password
     * création du user
     * @function hash - hache le mot de passe
     * @param{*} password
     * @param{} salt - Niveau de difficulté pour hacher le MDP (généralement 12 est utilisé)
     */
    const hashedPassword = await bcrypt.hash(password, 12);

    /** Création du user */
    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    /** Création du token */
    const token = jwt.sign({ email: result.email, id: result._id}, secret, { expiresIn: "1h" });

    // Successful -Envoi du token
    res.status(200).json({ result, token })
  } catch(error) {
    res.status(500).json({ message: "Something went wrong" });

  }
}
