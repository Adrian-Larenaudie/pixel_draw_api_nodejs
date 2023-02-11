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
db.User = require('./models/user.js')(sequelize);
db.Draw = require('./models/draw.js')(sequelize);

/* définition d'une relation many to many */
db.User.hasMany(db.Draw, {foreignKey: "user_id",});
db.Draw.belongsTo(db.User, {foreignKey: "user_id",});

sequelize.sync((error) => {
    console.log(`Database sync Error: ${error}`);
});

module.exports = db; 