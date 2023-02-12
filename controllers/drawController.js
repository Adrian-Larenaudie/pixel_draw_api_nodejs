/* import des modules nécessaires */
const express = require('express');
const DB = require('../db.config.js');
let Draw = DB.Draw;

/* récupération du routeur d'express */
let router = express.Router();


// récupération de toutes les entrées liées au user
exports.getAllUserDraws = (request, response) => {
    // on veut récupérer tous les dessins liés à un user
    console.log(request.decodedToken);
    return response.json({ message: true });
};

// ajout d'une nouvelle entrée équivalant d'un post
exports.createDraw = async (request, response) => {
    // on veut ajouter un dessin lié au user du jwt token
    console.log(request.decodedToken);
    // récupération des valeurs du body
    const { name, data } = request.body;

    // check si les données sont présentes
    if(!name || !data) {
        return response.status(400).json({ message: `Missing data`});
    }

    try {
        // on vérifie si le dessin n'existe pas déjà
        const draw = await Draw.findOne({ where: { name: name, user_id: request.decodedToken.id }, raw: true});
        // si draw non trouvé on envoit une 404
        if(draw !== null) {
            return response.status(409).json({ message: `The Draw ${name} already exist ! Please use another name.`});
        }

        // sinon ajout en BDD du nouveau draw
        let newDraw = await Draw.create({name: name, data: JSON.stringify(data), user_id: request.decodedToken.id });
        return response.json({ message: `Draw added`, data: newDraw });
    }
    catch(error) {
        return response.status(500).json({ message: `Database Error ${error}` });
    }
};

// modification d'une entré spécifiée par un id
exports.updateDraw = (request, response) => {
    console.log(request.decodedToken);
    return true
};

// suppression d'une entrée spécifié par un id
exports.destroyDraw = (request, response) => {
    console.log(request.decodedToken);
    return true
};
