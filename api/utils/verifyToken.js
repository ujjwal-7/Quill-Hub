const JWT = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (token) => {

    const payload = JWT.verify(token, process.env.JWT_SECRET_KEY);
    if(!payload) {
        throw new Error();
    }
    return payload;
}

module.exports = verifyToken;