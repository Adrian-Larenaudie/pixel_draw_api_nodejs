/* import des modules nécessaires */
const express = require('express');
const drawController = require('../controllers/drawController.js');
const checkJwtMiddleware = require('../middleware/checkJwt.js');

/* LISTE DES ROUTES VERS LA TABLE DRAW */

/* récupération du routeur d'express */
let router = express.Router();

/* routage de la ressource Draw */

// récupération de tous les dessins lié au user jwt
router.get('', checkJwtMiddleware, drawController.getAllUserDraws);

// ajout d'un nouveau dessin lié au user jwt
router.put('', checkJwtMiddleware, drawController.createDraw);

// modification d'un dessin lié au user jwt
router.patch('/:id', checkJwtMiddleware, drawController.updateDraw);

// suppression d'un dessin lié au user jwt
router.delete('/:id', checkJwtMiddleware, drawController.destroyDraw);

module.exports = router;