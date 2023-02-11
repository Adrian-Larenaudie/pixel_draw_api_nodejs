/* import des modules nécessaires */
const { DataTypes } = require('sequelize');

/* définition d'un modèle */
module.exports = (sequelize) => {
    const Draw = sequelize.define('Draw', {
        // déclaration des champs explicite
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
        },
    }, { paraniod: true }); // ici pour faire du soft delete*

    return Draw;
};

// soft delete* c'est lorsqu'on permet la récupération d'une données supprimées
// exemple sous windows on envoie les données supprimées dasn la corbeille ce qui permet une récupération  