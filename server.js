/* import de modules */
const express = require('express');
const cors = require('cors');

/* initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* mise en place du routage */
app.get('/', (request, response) => {response.send(`I'm online. Good Job Bro !`)});
app.get('*', (request, response) => {response.status(501).send(`What the helle are you doing??!?`)});

/* start serveur */
app.listen(process.env.SERVER_PORT, () => {
    console.log(`This server is running on port ${process.env.SERVER_PORT}. Enjoy !`);
});
