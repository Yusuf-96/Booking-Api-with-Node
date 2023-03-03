const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

module.exports = {
  register: async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      await newUser.save();
      res.status(200).json("User has been created!");
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ username: req.body.username });
      if (!user) {
        res.status(401).json("user not found");
      }

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        res.status(401).json("Wrong password");
      }

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ otherDetails });
    } catch (error) {
      next(error);
    }
  },
};
