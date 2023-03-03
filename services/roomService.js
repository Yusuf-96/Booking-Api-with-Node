const HotelModel = require("../models/Hotel");
const RoomModel = require("../models/Room");

module.exports = {
  createRoom: async (req, res, next) => {
    const hotelId = req.params.hotesid;

    const newRoom = new RoomModel(req.body);

    try {
      const savedRoom = await newRoom.save();
      try {
        await HotelModel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (error) {
        next(error);
      }
      res.status(200).json(savedRoom);
    } catch (error) {
      next(error);
    }
  },

  updateRoom: async (req, res, next) => {
    try {
      const updatedRoom = await RoomModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (error) {
      next(error);
    }
  },

    deleteRoom: async (req, res, next) => {
      const hotelId = req.params.hotesid;
    try {
        await RoomModel.finByIdAndDelete(req.params.id);
        try {
          await HotelModel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: req.params.id },
          });
        } catch (error) {
          next(error);
        }
      res.status(200).json("Room deleted successful");
    } catch (error) {
      next(error);
    }
  },

  getRoom: async (req, res, next) => {
    try {
      const room = await RoomModel.findById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  },

  getRooms: async (req, res, next) => {
    try {
      const rooms = RoomModel.find();
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  },
};
