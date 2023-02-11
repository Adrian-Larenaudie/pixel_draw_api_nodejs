/* import de modules */
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

/* import de la connexion à la BDD */
const DB = require('./db.config.js');

/* initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* /* connexion à la BDD mysql
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection.connect(); */

/* mise en place du routage */
app.get('/', (request, response) => {
    response.send(`I'm online. Good Job Bro !`);
});

app.get('/test', (request, response) => {
    connection.query('SELECT * FROM categories', function (error, results, fields) {
        if (error) throw error;
        response.send(results);
      });
});

app.get('*', (request, response) => {
    response.status(501).send(`What the helle are you doing??!?`);
});

/* start serveur avec test de connexion à la BDD */
DB.authenticate()
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






