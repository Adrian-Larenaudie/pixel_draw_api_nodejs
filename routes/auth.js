/* import des modules nécessaires */
const express = require('express');
const authController = require('../controllers/authController.js');

/* récupération du routeur d'express */
let router = express.Router();

/* middleware pour loguer la date sur toutes les routes de ce fichier */
router.use((request, response, next) => {
    const event = new Date();
    console.log(event.toString());
    next();
})

/* routage de la ressource auth */
router.post('/login', authController.login);

module.exports = router;