/* import des modules nécessaires */
const express = require('express');
const bcrypt = require('bcrypt');
const DB = require('../db.config.js');
let User = DB.User;

/* Controller d'intéraction avec la table user */

exports.getAllUsers = async (request, response) => {
    // si il s'agit d'un admin accès au contenu
    if(request.isAdmin) {
        try {
            const users = await User.findAll();
            return response.json({data: users});
        }
        catch(error) {
            return response.status(500).json({ message: 'Database Error' })
        }
    }
    // si il ne s'agit pas d'un admin retourne une 401 unauthorized
    return response.status(401).json({ message: 'Unauthorized' })

};

// TODO gestion des droits
exports.getUser = async (request, response) => {
    console.log(request.isAdmin);
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

exports.createUser = async (request, response) => {
    // récupération de chacune des entrées dans la requête 
    if(request.isAdmin) {
        var { pseudo, email, password, admin } = request.body;
    } else {
        var { pseudo, email, password } = request.body;
        var admin = false;
    }
    
    // validation des données reçues
    if(!pseudo || !email || !password || typeof admin === 'undefined') {
        return response.status(400).json({ message: 'Missing data' });
    }

    // si le nom du User est déjà renseigné dans la BDD on retourne un 409 duplicata
    try {
        // on va vérifierr si le user n'existe pas déjà
        const user = await User.findOne({where: { pseudo: pseudo }, raw: true});

        // si le user existe on renvoit un 409
        if(user !== null) {
            return response.status(409).json({ message: `The User ${pseudo} already exist !`});
        }

        // hashage du mdp
        const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

        // ajout en BDD du nouveau User
        let newUser = await User.create({pseudo: pseudo, email: email, password: hash, admin: admin });
        return response.json({ message: `User added`, data: newUser });
    }
    catch(error) {
        if(error.name == 'SequelizeDatabaseError') {
            return response.status(500).json({ message: 'Database Error' });
        }
        return response.status(500).json({ message: `Hash Process Error` });
    }
};

// TODO gestion des droits
exports.updateUser = (request, response) => {
    console.log(request.isAdmin);
    // on récupère l'id
    let userId = parseInt(request.params.id);
    // vérification si le champ id est présent et cohérent
    if(!userId) {
        return response.status(400).json({ message: `Missing parameter`});
    };

    // on va rechercher le user pour savoir si il existe
    User.findOne({ where: {id: userId}, raw: true})
        .then((user) => {
            // vérifier si le user existe
            if(user === null) {
                return response.status(404).json({ message: `This user does not exist !` })
            }

            // sinon on peut faire la modification de l'utilisateur
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
            return response.status(500).json({ message: `Database Error` });
        });
};

// TODO gestion des droits
exports.destroyUser = (request, response) => {
    console.log(request.isAdmin);
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
