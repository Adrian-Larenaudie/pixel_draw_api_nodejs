/* import des modules nécessaires */
const express = require('express');
const drawController = require('../controllers/drawController.js');
const checkJwtMiddleware = require('../middleware/checkJwt.js');


/* récupération du routeur d'express */
let router = express.Router();

/* routage de la ressource Draw */

// récupération de toutes les entrées
router.get('', checkJwtMiddleware, drawController.getAllUserDraws);

// ajout d'une nouvelle entrée équivalant d'un post
router.put('', checkJwtMiddleware, drawController.createDraw);

// modification d'une entré spécifiée par un id
router.patch('/:id', checkJwtMiddleware, drawController.updateDraw);

// suppression d'une entrée spécifié par un id
router.delete('/:id', checkJwtMiddleware, drawController.destroyDraw);

module.exports = router;