/* import des modules nécessaires */
const { DataTypes } = require('sequelize');

/* définition du modèle user */
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        // déclaration des champs explicite
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        pseudo: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    });

    return User;
}; 