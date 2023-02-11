/* import des modules nécessaires */
const express = require('express');

const DB = require('../db.config.js');
const Draw = DB.Draw;

/* récupération du routeur d'express */
let router = express.Router();

/* routage de la ressource Draw */

// récupération de toutes les entrées
router.get('');

// récupération d'une entrée spécifié par un id
router.get('/:id');

// ajout d'une nouvelle entrée équivalant d'un post
router.put('');

// modification d'une entré spécifiée par un id
router.patch('/:id');

// suppression d'une entrée spécifié par un id
router.delete('/:id');

module.exports = router;