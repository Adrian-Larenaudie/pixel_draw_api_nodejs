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

/* mise en place des  */
const DB = {};

// l'objet DB reçoit l'orm et chacune des tables (injection de dépendance dans chaque table de sequelize)
DB.sequelize = sequelize;
DB.User = require('./models/user.js')(sequelize);
DB.Draw = require('./models/draw.js')(sequelize);

/* définition d'une relation one to many */
DB.User.hasMany(DB.Draw, {foreignKey: "user_id",});
DB.Draw.belongsTo(DB.User, {foreignKey: "user_id",});

// synchronisation avec la BDD (création des tables et intéraction avec elle sur les différentes routes)
sequelize.sync((error) => {
    console.log(`Database sync Error: ${error}`);
});

module.exports = DB; 