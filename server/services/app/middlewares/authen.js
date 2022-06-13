const { User } = require("../models");
const { verifyPayload } = require("../helpers/jwt");

async function auth(req, res, next) {
    try {
        const { access_token } = req.headers;
        const payload = verifyPayload(access_token);
        const user = await User.findOne({
            where: {
                id: payload.id,
            },
        });
        if (!user) {
            throw new Error("Access denied");
        }
        req.user = {
            id: user.id,
            role: user.role,
            username: user.username,
        };
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = auth;
