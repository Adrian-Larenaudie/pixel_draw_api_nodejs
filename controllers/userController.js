/* import des modules nécessaires */
const express = require('express');
const bcrypt = require('bcrypt');
const DB = require('../db.config.js');
let User = DB.User;

/* récupération du routeur d'express */
let router = express.Router();

// récupération de toutes les entrées
exports.getAllUsers = async (request, response) => {

    try {
        const users = await User.findAll();
        return response.json({data: users});
    }
    catch(error) {
        return response.status(500).json({ message: 'Database Error' })
    }

};

// récupération d'une entrée spécifié par un id
exports.getUser = async (request, response) => {
    // va stocker false si il ne s'agit pas d'un number
    let UserId = parseInt(request.params.id);

    // vérification si le champ id est présent et cohérent
    if(!UserId) {
        return response.status(400).json({
            message: 'Missing parameter'
        });
    }

    // récupération du user
    try {
        const user = await User.findOne({where: {id: UserId}, raw: true});
        // User non trouvé on envoie une 404
        if(user === null) {
            return response.status(404).json({ message: `This User does not exist !` })
        }
        return response.json({data: user});
    }
    catch(error) {
        return response.status(500).json({ message: 'Database Error' })
    }
};

// ajout d'une nouvelle entrée équivalant d'un post
exports.createUser = async (request, response) => {
    // récupération de chacune des entrées dans la requête
    const { pseudo, email, password } = request.body;

    // validation des données reçues
    if(!pseudo || !email || !password) {
        return response.status(400).json({ message: 'Missing data' });
    }

    // si le nom du User est déjà renseigné dans la BDD on retourne un 409 duplicata
    try {
        const user = await User.findOne({where: { pseudo: pseudo }, raw: true});
        // User non trouvé on envoie une 404
        if(user !== null) {
            return response.status(409).json({ message: `The User ${pseudo} already exist !`});
        }

        // hashage du mdp
        const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

        // ajout en BDD du nouveau User
        let newUser = await User.create({pseudo: pseudo, email: email, password: hash });
        return response.json({ message: `User added`, data: newUser });
    }
    catch(error) {
        if(error.name == 'SequelizeDatabaseError') {
            return response.status(500).json({ message: 'Database Error' });
        }
        return response.status(500).json({ message: `Hash Process Error` });
    }
};

// modification d'une entré spécifiée par un id
exports.updateUser = (request, response) => {
    // on récupère l'id
    let userId = parseInt(request.params.id);
    // vérification si le champ id est présent et cohérent
    if(!userId) {
        return response.status(400).json({ message: `Missing parameter`});
    };

    User.findOne({ where: {id: userId}, raw: true})
        .then((user) => {
            // vérifier si le user existe
            if(user === null) {
                return response.status(404).json({ message: `This user does not exist !` })
            }

            // modification de l'utilisateur
            User.update({
                pseudo: request.body.pseudo,
                email: request.body.email,
                password: User.password
            }, {where: {id: userId}})
                .then((user) => {
                    return response.json({ message: `User Updated`});
                })
                .catch((error) => {
                    return response.status(500).json({message: `Database Error`})
                })
        })
        .catch((error) => {
            return response.status(500).json({
                message: `Database Error`
            });
        });
};

// suppression d'une entrée spécifié par un id
exports.destroyUser = (request, response) => {
    // on récupère l'id
    let userId = parseInt(request.params.id);
    // vérification si le champ id est présent et cohérent
    if(!userId) {
        return response.status(400).json({ message: `Missing parameter`});
    };

    // suppression de l'utilisateur
    User.destroy({ where: { id: userId }, force: true })
        .then(() => {
            return response.status(204).json({});
        })
        .catch((error) => {
            return response.status(500).json({ message: `Database Error` });
        });
};
