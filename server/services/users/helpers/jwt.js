const jwt = require('jsonwebtoken');

function createToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY);
}

function createPayload(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
}

module.exports = {
    createToken,
    createPayload
}