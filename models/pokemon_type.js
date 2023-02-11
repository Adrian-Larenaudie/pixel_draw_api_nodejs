/* import des modules nécessaires */
const { DataTypes } = require('./sequelize');
const DB = require('../db.config.js');
const Pokemon = require('./pokermon.js');
const Type = require('./Type.js');

/* définition d'un modèle intermédiaire pour une relation many to many */
const Pokemon_Type = DB.define('Pokemon_Type', {
    // champs pour le modèle intermédiaire (facltatif)
});

// définission de la relation entre les tables et de leurs foreingKey de façon explicite
Pokemon_Type.belongsToMany(Pokemon, { foreignKey: 'PokemonID' });
Pokemon_Type.belongsToMany(Type, { foreignKey: 'TypeID' });

module.exports = Pokemon_Type;

