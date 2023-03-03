const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(401).json("You're not authenticated");
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Invalid Token provided");
      }
      req.user = user;
      next();
    });
  },

  verifyUser: (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) {
        res.status(403).json("You are not Authorized");
      }
    }
  },

  verifyAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      if (err) {
        res.status(403).json("You are not Authorized");
      }
    }
  },
};
