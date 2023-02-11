/* import des modules nécessaires */
const { DataTypes } = require('sequelize');

/* définition d'un modèle */
module.exports = (sequelize) => {
    const Pokemon = sequelize.define('Pokemon', {
        // déclaration des champs explicite
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
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
            type: DataTypes.INTEGER(10),
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

    return Pokemon;
};



// soft delete* c'est lorsqu'on permet la récupération d'une données supprimées
// exemple sous windows on envoie les données supprimées dasn la corbeille ce qui permet une récupération  