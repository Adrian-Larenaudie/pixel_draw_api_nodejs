/* import des modules nécessaires */
const bcrypt = require('bcrypt');
const DB = require('../db.config.js');
let User = DB.User;

/* Controller d'intéraction avec la table user */

exports.getAllUsers = async (request, response) => {
    // si il s'agit d'un admin accès au contenu
    if(request.isAdmin) {
        console.log(request);
        try {
            const users = await User.findAll();
            return response.json({data: users});
        }
        catch(error) {
            return response.status(500).json({ message: 'Database Error' })
        }
    }
    // si il ne s'agit pas d'un admin retourne une 401 unauthorized
    return response.status(401).json({ message: 'Unauthorized' })

};

exports.getUser = async (request, response) => {
    // va stocker false si il ne s'agit pas d'un number
    let UserId = parseInt(request.params.id);

    // vérification si le champ id est présent et cohérent
    if(!UserId) {
        return response.status(400).json({ message: 'Missing parameter' });
    }

    // si le userId passé en paramètre est le même que celui du token ou si il s'agit d'un admin
    if(UserId === request.decodedToken.id || request.decodedToken.admin ) {
        // récupération du user autorisée
        try {
            let user = await User.findOne({where: {id: UserId}, raw: true});
            // User non trouvé on envoie une 404
            if(user === null) {
                return response.status(404).json({ message: `This User does not exist !` })
            }
            // on retourne le user sans le MDP
            user = { id : user.id, pseudo : user.pseudo, admin: user.admin, email : user.email };
            return response.json({data: user});
        }
        catch(error) {
            return response.status(500).json({ message: 'Database Error' })
        }

    } else {
        // sinon on retourne unauthorized
        return response.status(403).json({ message: 'Unauthorized' });
    }  
};

exports.createUser = async (request, response) => {
    // récupération de chacune des entrées dans la requête 
    if(request.isAdmin) {
        var { pseudo, email, password, admin } = request.body;
    } else {
        var { pseudo, email, password } = request.body;
        var admin = false;
    }
    
    // validation des données reçues
    if(!pseudo || !email || !password || typeof admin === 'undefined') {
        return response.status(400).json({ message: 'Missing data' });
    }

    // si le nom ou l'email du User est déjà renseigné dans la BDD on retourne un 409 duplicata
    try {
        // on va vérifierr si le nom du user n'existe pas déjà
        let user = await User.findOne({where: { pseudo: pseudo }, raw: true});

        // si le user existe on renvoie un 409
        if(user !== null) {
            return response.status(409).json({ message: `The User ${pseudo} already exist !`});
        }
        
        // on va vérifierr si l'email n'existe pas déjà
        user = await User.findOne({where: { email: email }, raw: true});

        // si le user existe on renvoie un 409
        if(user !== null) {
            return response.status(409).json({ message: `The Email ${email} already used !`});
        }

        // hashage du mdp
        const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

        // ajout en BDD du nouveau User
        let newUser = await User.create({pseudo: pseudo, email: email, password: hash, admin: admin });
        return response.json({ message: `User added`, data: newUser });
    }
    catch(error) {
        if(error.name == 'SequelizeDatabaseError') {
            return response.status(500).json({ message: 'Database Error' });
        }
        return response.status(500).json({ message: `Hash Process Error` });
    }
};

exports.updateUser = async (request, response) => {
    // on récupère l'id
    let UserId = parseInt(request.params.id);

    // vérification si le champ id est présent et cohérent
    if(!UserId) {
        return response.status(400).json({ message: `Missing parameter`});
    };

    // à l'aide de l'id on va récupérer le user
    try {
        var searchedUser = await User.findOne({where: {id: UserId}, raw: true});
        // User non trouvé on envoie une 404
        if(searchedUser === null) {
            return response.status(404).json({ message: `This User does not exist !` })
        }
    }
    catch(error) {
        return response.status(500).json({ message: 'Database Error' })
    }

    // l'utilisateur peux modifier son pseudo et son email
    if(UserId === request.decodedToken.id) {
        // récupération de chacune des entrées dans la requête
        const { pseudo, email } = request.body; 
        
        // validation des données reçues
        if(!pseudo || !email ) {
            return response.status(400).json({ message: 'Missing data' });
        }
        User.update({
            pseudo: pseudo,
            email: email,
        }, {where: {id: UserId}})
            .then((updatedUser) => {
                return response.json({ message: `User Updated`});
            })
            .catch((error) => {
                return response.status(500).json({message: `Database Error`})
            });
    // un admin peut modifier un autre utilisateur qui n'est pas admin
    } else if (UserId !== request.decodedToken.id && request.isAdmin && !searchedUser.admin) {
        // récupération de chacune des entrées dans la requête
        const { pseudo, email, admin } = request.body; 

        // validation des données reçues
        if(!pseudo || !email || typeof admin === 'undefined') {
            return response.status(400).json({ message: 'Missing data' });
        }
        User.update({
            pseudo: pseudo,
            email: email,
            admin: admin,
        }, {where: {id: UserId}})
            .then((updatedUser) => {
                return response.json({ message: `User Updated`});
            })
            .catch((error) => {
                return response.status(500).json({message: `Database Error ${error}`})
            });
    } else {
        // sinon on retourne unauthorized
        return response.status(403).json({ message: 'Unauthorized' });
    }
};

exports.destroyUser = async (request, response) => {
    // on récupère l'id
    let UserId = parseInt(request.params.id);
    // vérification si le champ id est présent et cohérent
    if(!UserId) {
        return response.status(400).json({ message: `Missing parameter`});
    };
    
    // à l'aide de l'id on va récupérer le user
    try {
        var searchedUser = await User.findOne({where: {id: UserId}, raw: true});
        // User non trouvé on envoie une 404
        if(searchedUser === null) {
            return response.status(404).json({ message: `This User does not exist !` })
        }
    }
    catch(error) {
        return response.status(500).json({ message: 'Database Error' })
    }
    
    // si le user connecté est le même que l'id passé en paramètre ou 
    // si le user passé en paramètre n'est pas admin et que le user connecté est admin
    if (UserId === request.decodedToken.id || (!searchedUser.admin && request.isAdmin)) {
        // suppression de l'utilisateur
        User.destroy({ where: { id: UserId }, force: true })
            .then(() => {
                return response.status(204).json({});
            })
            .catch((error) => {
                return response.status(500).json({ message: `Database Error` });
            });    
    } else {
        // sinon on retourne unauthorized
        return response.status(403).json({ message: 'Unauthorized' });
    }
    
};
