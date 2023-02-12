/* import des modules nécessaires */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB = require('../db.config.js');

const User = DB.User;

/* récupération du routeur d'express */
let router = express.Router();

/* middleware pour loguer la date sur toutes les routes de ce fichier */
router.use((reuqest, response, next) => {
    const event = new Date();
    console.log(event.toString());
    next();
})

/* routage de la ressource auth */
router.post('/login', async (request, response) => {
    // on sépare les variable dans le body de la requête
    const { email, password } = request.body;

    // 1er check si les variable sont présente 
    if(!email || !password) {
        return response.status(400).json({ message: `Bad email or password` });
    }

    try {
        // on récupère le user en BDD
        const user = await User.findOne({ where: { email: email }, raw: true });
        
        // vérification si le user existe sinon on renvoit une rerreur
        if(user === null) {
            return response.status(404).json({message: 'This User does not exist !'})
        }

        // vérification du mdp à l'aide de bcrypt le méthode .compare() permet de vérifier si le mdp matche avec le user récupéré en BDD
        const test = await bcrypt.compare(password, user.password);

        // si le résultat du test bcrypt ne correspond pas on renvoit un message mdp invalide
        if(!test) {
            return response.status(401).json({ message: `Password invalid`});
        }

        // sinon on va générer un token à l'aide du module jsonwebtoken et de la méthode .sign() qui prend trois paramètres 
        const token = jwt.sign(
            { id: user.id, pseudo: user.pseudo, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_DURING }
        );

        // retourne le token généré avec le module jsonwebtoken et la méthode .sign()
        return response.json({ access_token: token });
    }
    catch(error) {
        // les erreurs sont catchées et renvoyées ici
        if(error.name == 'SequelizeDatabaseError') {
            return response.status(500).json({ message: 'Database Error' });
        }
        return response.status(500).json({ message: `Login process failed ${error}` });
    }
    

    /* User.findOne({ where: { email: email }, raw: true })
        .then((user) => {
            // vérification si le user existe
            if(User === null) {
                return response.status(404).json({message: 'This User does not exist !'})
            }

            // vérification du mdp
            bcrypt.compare(password, user.password)
                .then((test) => {
                    // si le résultat du test bcrypt ne correspond pas on renvoit un message mdp invalide
                    if(!test) {
                        return response.status(401).json({ message: `Password invalid`});
                    }
                    // sinon on va générer un token à l'aide du module jsonwebtoken et de la méthode .sign() qui prend trois paramètres 
                    const token = jwt.sign({ 
                        id: user.id,
                        pseudo: user.pseudo,
                        email: user.email
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING } );

                    return response.json({ access_token: token });
                })
                .catch((error) => {
                    return response.status(500).json({ message: `Login process failed ${error}` });
                });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Database Error'
            })
        }); */
});

module.exports = router;