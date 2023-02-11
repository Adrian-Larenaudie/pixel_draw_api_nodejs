/* import des modules nécessaires */
const { Sequelize } = require('sequelize');

/* connexion à la BDD sql */
let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
);

/* mise en place des relations */
const db = {};

db.sequelize = sequelize;
db.Pokemon = require('./models/pokemon.js')(sequelize);
db.Type = require('./models/type.js')(sequelize);

/* définition d'une relation many to many */
db.Pokemon.belongsToMany(db.Type, {
    through: "pokemon_type",
    as: "Types",
    foreignKey: "Pokemon_id",
});
db.Type.belongsToMany(db.Pokemon, {
    through: "pokemon_type",
    as: "Pokemons",
    foreignKey: "Type_id",
});

sequelize.sync((error) => {
    console.log(`Database sync Error: ${error}`);
});

module.exports = db; 