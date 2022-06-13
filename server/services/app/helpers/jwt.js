const jwt = require('jsonwebtoken');

function signPayload(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY);
}

function verifyPayload(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
    signPayload,
    verifyPayload
}