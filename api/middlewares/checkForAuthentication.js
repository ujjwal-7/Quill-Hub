const verifyToken = require("../utils/verifyToken");
const TokenBlacklist = require('../models/tokenBlacklist');

const checkForAthentication = async (req, res, next) => {

    try {

        const bearerHeader = req.headers["authorization"];

        if(typeof bearerHeader === undefined) {
            throw new Error();
        }
        
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        const isBlacklisted = await TokenBlacklist.exists({ token });
        if (isBlacklisted) {
            return res.status(403).json("Token not valid!");
        }

        const userPayload = verifyToken(token);
        
        req.user = userPayload;
        next();
        
    } catch(error) {
        res.status(401).json({error: 'Please authenticate'});
    }
}

module.exports = checkForAthentication;