const JWT = require("jsonwebtoken");
const TokenBlacklist = require('../models/tokenBlacklist');
require('dotenv').config();

const generateAuthToken = (user) => {

    const payload = {
        id: user.id,
        email: user.email,
        timestamp: Date.now()
    }

    const token = JWT.sign(payload, process.env.JWT_SECRET_KEY);
    return token;
}

module.exports = generateAuthToken;