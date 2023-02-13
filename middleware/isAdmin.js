/* Ce middleware permet de retourner une valeur true ou false sur request.isAdmin 
ce qui permet de faire un traitement différent dans le controller selon le statut de l'utilisateur  */

/* import des modules nécessaires */
const jwt = require('jsonwebtoken');

/* extraction du token */
const extractBearer = (authorization) => {
    if(typeof authorization !== 'string') {
        return false;
    }

    // on isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    // console.log(matches);
    // console.log(matches[2]);

    // matches doit être true et matches[2] contient le token isolé du string bearer
    return matches && matches[2];
};

/* vérification de la présence du token */
const isAdmin = (request, response, next) => {
    // récupération du token dans les en têtes de la requête et extraction du token
    const token = request.headers.authorization && extractBearer(request.headers.authorization);

    // si le token n'existe pas on modifie la valeur de isAdmin à false
    if(!token) {
        request.isAdmin = false;
    // sinon vérification de la validité du token à l'aide de la métode .verify() qui vient avec le module jesonwebtoken
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            // si il y a une erreur on renvoit isAdmin à false
            if(error) {
                request.isAdmin = false;
            // sinon si il ne s'agit pas d'un admin
            } else if (decodedToken.admin) {
                // on renvoit false
                request.isAdmin = false;
            // enfin si on arrive ici c'est que le user est un admin on renvoit true
            } else {
                request.isAdmin = true;
            } 
        });
    }
    // une fois le test passé on enchaine avec la suite 
    next();
};

module.exports = isAdmin;
