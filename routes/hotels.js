const express = require("express");


const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} = require("../services/hotelService");
const {verifyAdmin} = require('../utils/verifyToken')

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getHotels);

module.exports = router;
