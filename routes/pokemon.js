/* import des modules nécessaires */
const express = require('express');

const DB = require('../db.config.js');
const Pokemon = DB.Pokemon;

/* récupération du routeur d'express */
let router = express.Router();

/* routage de la ressource Pokemon */

// récupération de toutes les entrées
router.get('', (request, response) => {
    Pokemon.findAll()
        .then((pokemons) => {
            response.json({
                data: pokemons
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
    let pokemonId = parseInt(request.params.id);

    // vérification si le champ id est rpésent et cohérent
    if(!pokemonId) {
        return response.status(400).json({
            message: 'Missing parameter'
        });
    }

    // récupération du pokémon
    Pokemon.findOne({where: {id: pokemonId}, raw: true})
        .then((pokemon) => {
            // pokemon non trouvé on envoie une 404
            if(pokemon === null) {
                return response.status(404).json({message: 'This pokemon does not exist !'})
            }
            // pokemon trouvé on le retourne
            return response.json({
                data: pokemon
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
    const { frenchName, romanjiName, pokedexNumber, imageURL } = request.body;

    // validation des données reçues
    if(!frenchName || !romanjiName || !pokedexNumber || !imageURL) {
        return response.status(400).json({
            message: 'Missing data'
        });
    }
    
    // si le nom du pokemon est déjà renseigné dans la BDD on retourne un 409 duplicata
    Pokemon.findOne({where: { frenchName: frenchName }, raw: true})
        .then((pokemon) => {
            if(pokemon !== null) {
                return response.status(409).json({ message: `The pokemon ${pokemon.frenchName} already exist !`});
            }
            // ajout en BDD du nouveau pokemon
            Pokemon.create(
                {
                    frenchName: frenchName,
                    romanjiName: romanjiName,
                    pokedexNumber: pokedexNumber,
                    imageURL: imageURL
                }
            ).then(() => {
                return response.json({ message: `Pokemon added`})
            })
            .catch((error) => {
                return response.status(500).json({ message: `Database Error ${error}`});
            })
        });
});

// modification d'une entré spécifiée par un id
router.patch('/:id');

// suppression d'une entrée spécifié par un id
router.delete('/:id');

module.exports = router;