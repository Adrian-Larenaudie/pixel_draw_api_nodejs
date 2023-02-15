/* import des modules nécessaires */
const express = require('express');
const userController = require('../controllers/userController.js');
const isAdminMiddleware = require('../middleware/isAdmin.js');
const checkJwtMiddleware = require('../middleware/checkJwt.js');

/* LISTE DES ROUTES VERS LA TABLE USER */

/* récupération du routeur d'express */
let router = express.Router();

/* routage de la ressource User */

// récupération de tous les users seulement les admins peuvent le faire
router.get('', checkJwtMiddleware, isAdminMiddleware, userController.getAllUsers);

// récupération d'un user seulement les admins peuvent récupérer d'autres users
router.get('/:id', checkJwtMiddleware, isAdminMiddleware, userController.getUser);

// création d'un user ou admin seul les admins peuvent créer d'autres admins
router.put('', isAdminMiddleware, userController.createUser);

// modification d'un user ou d'un admin seul les admins peuvent modifier d'autres users mais un admin ne peut pas modifier un autre admin
router.patch('/:id', checkJwtMiddleware, isAdminMiddleware, userController.updateUser);

// suppression d'un user ou d'un admin seul les admins peuvent supprimer d'autres users mais un admin ne peut pas supprimer un autre admin
router.delete('/:id', checkJwtMiddleware, isAdminMiddleware, userController.destroyUser);

module.exports = router;
