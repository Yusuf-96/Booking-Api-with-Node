const UserModel = require("../models/User");

module.exports = {
  
  updateUser: async (req, res, next) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Item deleted successefull");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(200).json(error);
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
