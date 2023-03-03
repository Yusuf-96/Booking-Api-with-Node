const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../services/userService");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user you are logged in");
// });
// router.get("/checkuser/:id", verifyToken, verifyUser, (req, res, next) => {
//   res.send("hello user you are logged in and you can delete account");
// });

//UPDATE
router.put("/:id", verifyToken, verifyUser,  updateUser);

//DELETE
router.delete("/:id",verifyToken, verifyUser, deleteUser);

//GET
router.get("/:id", verifyToken, verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;
