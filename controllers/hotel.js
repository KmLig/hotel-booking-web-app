const Hotel = require('../models/hotel');
const Room = require('../models/room');
const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.getHotels = async (req, res, next) => {
    const hotels = await Hotel.find().populate('rooms');
    res.status(200).json({ message: 'Fetch hotels', hotels: hotels });
};


exports.bySearchKey = async (req, res, next) => {
    const destination = req.query.destination;

    const hotels = await Hotel.find({ $text: { $search: destination } });
    res.status(200).json({ message: `Hotels in ${destination}`, hotels: hotels });
};

exports.byRating = async (req, res, next) => {
    const hotels = await Hotel.find().sort({ rating: -1 }).limit(3);
    // const hs = hotels.map(function (u) { return u.rating; });
    res.status(200).json({ message: 'Hotels by rating', hotels: hotels });
};

exports.byhotelId = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    const rooms = await Room.find({ '_id': { $in: hotel.rooms } });
    res.status(200).json({ message: 'Fetch hotels', hotel: hotel, rooms: rooms });
};

exports.booking = async (req, res, next) => {
    const { user, hotel, room, dateStart, dateEnd, price, payment, status } = req.body;
    const existingUser = await User.findById(user);
    if (!existingUser) {
        const error = new Error('User not found.');
        error.code = 404;
        throw error;
    }
    const transaction = new Transaction({
        user: user,
        hotel: hotel,
        room: room,
        dateStart: dateStart,
        dateEnd: dateEnd,
        price: price,
        payment: payment,
        status: status
    });
    const results = await transaction.save();
    res.status(200).json({ message: 'booking', results: results });
};

exports.transaction = async (req, res, next) => {
    const { user } = req.body;
    const transactions = await Transaction.find({ user: user }).populate('hotel');
    console.log(transactions);
    res.status(200).json({ message: "fetch transactions", transactions: transactions });
};