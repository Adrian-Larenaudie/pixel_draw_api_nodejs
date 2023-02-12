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
const user_router = require('./routes/user.js');
const draw_router = require('./routes/draw.js');

const auth_router = require('./routes/auth.js');

/* ajout des routes au server express app */
app.use('/user', user_router);
app.use('/draw', draw_router);

app.use('/auth', auth_router);

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






