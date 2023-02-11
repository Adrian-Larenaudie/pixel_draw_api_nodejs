## PROCEDURE

**Sur la base de** https://www.youtube.com/watch?v=iCZcE-JKbyY&list=PLwJWw4Pbl4w_oHjPIjkdVtwLeQECK08jv&index=1&ab_channel=FaisonsLePoint  

I. Il s'agit de développer une petite API node js theme pokémon 1ere génération   

II. Mise en place:
    1. initialisation du projet node `npm init -y`  
    2. installation de express et cors `npm i express cors`    
    3. à la racine création file `server.js`  
    4. une fois paramétré pour exécuter le fichier `node server.js`  

III. Mise en place de nodemon:
    1. installation de nodemon uniquement pour le mode dev `npm i nodemon --save-dev`     
    2. nodemon permet de traquer les modifications apportées sur le projet et met à jour automatiquement sur le server local  
    3. enlever un paquet `npm remove <nomDuPaquet>`  
    4. lancer le serveur avec nodemon `nodemon server.js`  
    5. si cette erreur `nodemon : Impossible de charger le fichier C:\Users\Adrian\AppData\Roaming\npm\nodemon.ps1` supprimer le fichier nodemon.ps1  

IV. Package.json:  
    1. création de scripts  
    2. lancer `npm run dev`  
```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
},
```

V. Les variables d'environnement:  
    1. installation du paquet dotenv `npm i dotenv`  
    2. création d'un file .env et d'une copie d'exemple .env.exemple  
    3. création d'un file .gitignore ajout de `.env` & `/node_modules` dans ce fichier  
    4. pour avoir accès aux variables d'environnements on modifie le script:  
    5. pour accéder aux variables d'environnement dans le code `process.env.<nomDeLaVariable>`  
```json
"scripts": {
    "start": "node -r dotenv/config server.js",
    "dev": "nodemon -r dotenv/config server.js"
},
```

VI. Fichier de connexion à la BDD avec le paquet sequelize:  
    1. installer mysql `npm i mysql` & `npm i mysql2`  
    2. installer l'ORM sequelize `npm i sequelize`  
    3. dans un file déclarer la connexion à la bdd à l'aide du paquet sequelize `db.config.js`  

VII. Lancement API avec la BDD:  
    1. sequelize vient avec une méthode authenticate qui permet de tester la connexion avant dans lancer le server  
```js
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
```

VIII. Création des modèles et de leurs relations:  
    1. voir dans le fichier db.config.js  
    2. voir dans le dossier ./models  

IX. Création des routes:  
    1. voir dans le dossier ./routes  

X. User hashage du mdp:  
    1. installation de bcrypt `npm i bcrypt`  
    2. voir le fichier ./routes/user.js  

**Conclusion:**  
Cette API fonctionne sur la base d'une API REST avec un architecture MVC  
On retrouvera des routes des controlles et des modèles  
La BDD est en sql on utilise un ORM sequelize 
Le server est géré à l'aide du module express  
bcrypt permet de hash les mdp  
Le paquet dotenv permet de gérer les variable d'environnement  

https://www.youtube.com/watch?v=VeIV4NVarZk&list=PLwJWw4Pbl4w_oHjPIjkdVtwLeQECK08jv&index=14&ab_channel=FaisonsLePoint   
