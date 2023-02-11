/* import de modules */
const express = require('express');
const cors = require('cors');

/* import de la connexion à la BDD */
const DB = require('./db.config.js');

/* initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* import des modules de routage */
const pokemon_router = require('./routes/pokemon.js');
const type_router = require('./routes/type.js');

app.use('/pokemon', pokemon_router);
app.use('/pokemon', type_router);

/* mise en place du routage */
app.get('/', (request, response) => {
    response.send(`I'm online. Good Job Bro !`);
});

app.get('*', (request, response) => {
    response.status(501).send(`What the helle are you doing??!?`);
});

/* start serveur avec test de connexion à la BDD */
DB.sequelize.authenticate()
    .then(() => {
        console.log(`Database connection OK bro !`);
    })
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Enjoy !`);
        });
    })
    .catch((error) => {
        console.log(`Database connexion error ${error}`);
    })






