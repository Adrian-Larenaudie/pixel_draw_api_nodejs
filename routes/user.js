/* import des modules nécessaires */
const express = require('express');

const bcrypt = require('bcrypt');

const DB = require('../db.config.js');
let User = DB.User;

/* récupération du routeur d'express */
let router = express.Router();

/* routage de la ressource User */

// récupération de toutes les entrées
router.get('', (request, response) => {
    User.findAll()
        .then((Users) => {
            response.json({
                data: Users
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Database Error'
            })
        });
});

// récupération d'une entrée spécifié par un id
router.get('/:id', (request, response) => {
    // va stocker false si il ne s'agit pas d'un number
    let UserId = parseInt(request.params.id);

    // vérification si le champ id est rpésent et cohérent
    if(!UserId) {
        return response.status(400).json({
            message: 'Missing parameter'
        });
    }

    // récupération du user
    User.findOne({where: {id: UserId}, raw: true})
        .then((User) => {
            // User non trouvé on envoie une 404
            if(User === null) {
                return response.status(404).json({message: 'This User does not exist !'})
            }
            // User trouvé on le retourne
            return response.json({
                data: User
            });
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'Database Error'
            });
        });
});

// ajout d'une nouvelle entrée équivalant d'un post
router.put('', (request, response) => {
    // récupération de chacune des entrées dans la requête
    const { pseudo, email, password } = request.body;

    // validation des données reçues
    if(!pseudo || !email || !password) {
        return response.status(400).json({
            message: 'Missing data'
        });
    }
    // si le nom du User est déjà renseigné dans la BDD on retourne un 409 duplicata
    User.findOne({where: { pseudo: pseudo }, raw: true})
        .then((User) => {
            if(User !== null) {
                return response.status(409).json({ message: `The User ${User.pseudo} already exist !`});
            }

            bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then((hash) =>{
                    // ajout en BDD du nouveau User
                    User = DB.User
                    User.create(
                        {
                            pseudo: pseudo,
                            email: email,
                            password: hash
                        })
                    .then(() => {
                        return response.json({ message: `User added`})
                    })
                    .catch((error) => {
                        return response.status(500).json({ message: `Database Error`});
                    })
                })  
                .catch((error) => {
                    return response.status(500).json({ message: `Hash Process Error` });
                });
        });
});

// modification d'une entré spécifiée par un id
router.patch('/:id', (request, response) => {
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
});

// suppression d'une entrée spécifié par un id
router.delete('/:id');

module.exports = router;