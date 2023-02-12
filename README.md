# pixel_draw_api_nodejs

**Présentation:**  
Cette API a pour objectif d'être reliée avec l'application pixel_art_canvas.  
Le but ici est de permettre aux visiteurs de se créer un compte afin de passer au statut d'utilisateur.  
Le statut utilisateur permet de gérer ses dessins (CRUD).  

**L'API est codée en NODEJS et permet d'interagir avec deux tables:**  
- Une table qui contient les utilisateurs    
- Une seconde table qui contient les dessins liés à un utilisateur  

**Un système de connexion JWT permet à un utilisateur de gérer ses dessins en CRUD:** 
- création  
- modification  
- suppression  
- lecture  

**Prérequis:**  
Avoir installer nodejs, npm et mysql  

**Pour lancer le projet:**  
- cloner le repo  
- lancer la commande `npm install`
- Editer les variable d'environnements
- Créer une BDD mysql avec le nom choisit dans l'environnement
- puis lancer la commande `npm run dev` sequelize se charge de créer les tables  

