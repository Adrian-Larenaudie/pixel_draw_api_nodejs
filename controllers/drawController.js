/* import des modules nécessaires */
const express = require('express');
const DB = require('../db.config.js');
let User = DB.Draw;

/* récupération du routeur d'express */
let router = express.Router();


// récupération de toutes les entrées liées au user
exports.getAllUserDraws = (request, response) => {

};

// ajout d'une nouvelle entrée équivalant d'un post
exports.createDraw = (request, response) => {

};

// modification d'une entré spécifiée par un id
exports.updateDraw = (request, response) => {
    
};

// suppression d'une entrée spécifié par un id
exports.destroyDraw = (request, response) => {
    
};
