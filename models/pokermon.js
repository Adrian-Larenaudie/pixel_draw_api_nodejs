/* import des modules nécessaires */
const { DataTypes } = require('./sequelize');
const DB = require('../db.config.js');

/* définition d'un modèle */
const Pokemon = DB.define('Pokemon', {
        // déclaration des champs explicite
    id: {
        type: DataTypes.INTEGER(10),
        primarykey: true,
        autoIncrement: true
    },
    frenchName: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false,
        unique: true
    },
    romanjiName: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false,
        unique: true
    },
    pokedexNumber: {
        type: DataTypes.INTERGER(10),
        defaultValue: 0,
        allowNull: false,
    },
    imageURL: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false,
        unique: true
    },
}, { paraniod: true }); // ici pour faire du soft delete*

module.exports = Pokemon;

// soft delete* c'est lorsqu'on permet la récupération d'une données supprimées
// exemple sous windows on envoie les données supprimées dasn la corbeille ce qui permet une récupération  