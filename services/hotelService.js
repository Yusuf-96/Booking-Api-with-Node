const HotelModel = require("../models/Hotel");

module.exports = {
  createHotel: async (req, res, next) => {
    const newHotel = new HotelModel(req.body);

    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateHotel: async (req, res, next) => {
    try {
      const updatedHotel = await HotelModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteHotel: async (req, res, next) => {
    try {
      await HotelModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Item deleted successefull");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getHotel: async (req, res, next) => {
    try {
      const hotel = await HotelModel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (error) {
      res.status(200).json(error);
    }
  },

  getHotels: async (req, res) => {
    try {
      const hotels = await HotelModel.find();
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
