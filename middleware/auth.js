const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {

        const authHeader = req.get('Authorization');

        if (!authHeader) {
            req.isAuth = false;
            return next();
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token || token === '') {
            req.isAuth = false;
            return next();
        }

        //returns the token object if its a valid token in which give us access to the user's id used during the token creation
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        if (!decodedToken) {
            req.isAuth = false;
            return next();
        }

        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        req.isAuth = false;
        return next();
    }
}