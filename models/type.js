/* import des modules nécessaires */
const { DataTypes } = require('./sequelize');
const DB = require('../db.config.js');

/* définition d'un modèle */
const Type = DB.define('Type', {
    // déclaration des champs explicite
    id: {
        type: DataTypes.INTEGER(10),
        primarykey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false,
        unique: true
    },
    color: {
        type: DataTypes.STRING(100),
        defaultValue: '#fff',
        allowNull: false,
    },
}, { paraniod: true }); // ici pour faire du soft delete*

module.exports = Type;

// soft delete* c'est lorsqu'on permet la récupération d'une données supprimées
// exemple sous windows on envoie les données supprimées dasn la corbeille ce qui permet une récupération  