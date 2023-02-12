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
const checkJwtMiddleware = (request, response, next) => {
    // récupération du token dans les en têtes de la requête et extraction du token
    const token = request.headers.authorization && extractBearer(request.headers.authorization);

    if(!token) {
        return response.status(401).json({ message: `Oh le petit malin !!!` });
    }

    // vérifier la validité du token à l'aide de la métode .verify() qui vient avec le module jesonwebtoken
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        // console.log(decodedToken);
        if(error) {
            return response.status(401).json({ message: `Bad token`});
        }

        // on va ajouter le decodage du JWT dans la requête pour l'utiliser dans certaines méthodes de nos controllers
        request.decodedToken = decodedToken;
        
        // si on passe le test alors on peut passer à la suite le middleware est passé avec succès
        next();
    });
};

module.exports = checkJwtMiddleware;
