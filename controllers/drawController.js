/* import des modules nécessaires */
const DB = require('../db.config.js');
let Draw = DB.Draw;

/* Controller d'intéraction avec la table draw */

exports.getAllUserDraws = async (request, response) => {
    try {
        // on vérifie si le dessin n'existe pas déjà
        const draws = await Draw.findAll({ where: { user_id: request.decodedToken.id }, raw: true});

        // si il n'y a aucun dessin on renvoie un not found 404
        if(draws.length === 0) {
            return response.status(404).json({ message: `No draws for user: ${request.decodedToken.pseudo}` });
        }

        // sinon on retourne la liste des desins
        return response.json({ data: draws });
    }
    catch(error) {
        return response.status(500).json({ message: `Database Error` });
    }
};

exports.createDraw = async (request, response) => {
    // récupération des valeurs du body
    const { name, data } = request.body;

    // check si les données sont présentes
    if(!name || !data) {
        return response.status(400).json({ message: `Missing data`});
    }

    try {
        // on vérifie si le dessin n'existe pas déjà
        const draw = await Draw.findOne({ where: { name: name, user_id: request.decodedToken.id }, raw: true});
        // si draw non trouvé on envoie une 404
        if(draw !== null) {
            return response.status(409).json({ message: `The Draw ${name} already exist ! Please use another name.`});
        }

        // sinon ajout en BDD du nouveau draw
        let newDraw = await Draw.create({name: name, data: JSON.stringify(data), user_id: request.decodedToken.id });
        return response.json({ message: `Draw added`, data: newDraw });
    }
    catch(error) {
        return response.status(500).json({ message: `Database Error` });
    }
};

exports.updateDraw = async (request, response) => {
    // on récupère l'id du dessin
    let drawId = parseInt(request.params.id);

    // séparation des variables de la requête body
    const { name, data } = request.body;

    // vérification de la validité des variables du body
    if(!name || !data || !drawId) {
        return response.status(400).json({ message: `Missing data` });
    }

    // vérifiacation de l'existence du dessin
    try {
        // on vérifie si le dessin existe
        const draw = await Draw.findOne({ where: { id: drawId, user_id: request.decodedToken.id }, raw: true});

        // si draw non trouvé on envoie une 404
        if(draw === null) {
            return response.status(409).json({ message: `This draw does not exist` });
        }

        // sinon modification en BDD du dessin
        Draw.update({name: name, data: JSON.stringify(data), user_id: request.decodedToken.id }, {where: {id: drawId}});

        // message de retour sur un succès
        return response.json({ message: `Draw updated` });
    }
    catch(error) {
        return response.status(500).json({ message: `Database Error` });
    }

};

exports.destroyDraw = async (request, response) => {
    // on récupère l'id du dessin
    let drawId = parseInt(request.params.id);

    // vérification si le champ id est présent et cohérent
    if(!drawId) {
        return response.status(400).json({ message: `Missing parameter`});
    };

    // vérifiacation de l'existence du dessin
    try {
        // on vérifie si le dessin existe
        const draw = await Draw.findOne({ where: { id: drawId, user_id: request.decodedToken.id }, raw: true});

        // si draw non trouvé on envoie une 404
        if(draw === null) {
            return response.status(409).json({ message: `This draw does not exist` });
        }

        // sinon suppression en BDD du dessin
        Draw.destroy({ where: {id: drawId}, force: true });

        // retour d'un 204 pour coller avec la convention API REST
        return response.status(204).json({});
    }
    catch(error) {
        return response.status(500).json({ message: `Database Error` });
    }
};
