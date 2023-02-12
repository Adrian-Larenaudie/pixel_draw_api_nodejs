/* import des modules nécessaires */
const express = require('express');
const userController = require('../controllers/userController.js');
const checkJwtMiddleware = require('../middleware/checkJwt.js');

/* récupération du routeur d'express */
let router = express.Router();

/* routage de la ressource User */

// récupération de toutes les entrées
router.get('', checkJwtMiddleware, userController.getAllUsers);

// récupération d'une entrée spécifié par un id
router.get('/:id', checkJwtMiddleware, userController.getUser);

// ajout d'une nouvelle entrée équivalant d'un post
router.put('', userController.createUser);

// modification d'une entré spécifiée par un id
router.patch('/:id', checkJwtMiddleware, userController.updateUser);

// suppression d'une entrée spécifié par un id
router.delete('/:id', checkJwtMiddleware, userController.destroyUser);

module.exports = router;