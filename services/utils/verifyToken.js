const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: async (req, res, next) => {
        const token = req.cookies.access_token;
        if (!token) {
            next(401, "You're not authenticated")
        }
    }
}