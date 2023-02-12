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
    });

    return Draw;
};