/* import des modules nécessaires */
const { DataTypes } = require('sequelize');

/* définition d'un modèle */
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
    }, { paraniod: true }); // ici pour faire du soft delete*

    return User;
};

// soft delete* c'est lorsqu'on permet la récupération d'une données supprimées
// exemple sous windows on envoie les données supprimées dasn la corbeille ce qui permet une récupération  