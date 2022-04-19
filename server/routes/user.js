import express from 'express';
const router = express.Router();

import { signin, signup } from '../controllers/user.js';


/**
 * Nous avons besoin d'envoyer les informations du formulaire de connexion au Backend
 * @param {string} '/signin'
 * @param {} signin - Le controller
 * Nous devons envoyer toutes les données du formulaire de connexion (POST)
 * au Back-end
 */
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
