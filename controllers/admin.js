const Hotel = require('../models/hotel');
const Room = require('../models/room');
const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.getHotels = async (req, res, next) => {
    const hotels = await Hotel.find().populate('rooms');
    res.status(200).json({ message: 'Fetch hotels', hotels: hotels });
};

exports.getHotelById = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    console.log(hotelId);
    const hotel = await Hotel.findById(hotelId);
    // const rooms = await Room.find({ '_id': { $in: hotel.rooms } });
    res.status(200).json({ message: 'Fetch hotel by id', hotel: hotel });
};

exports.addHotel = async (req, res, next) => {
    console.log('req body add', req.body);
    const newHotel = new Hotel({
        name: req.body.name,
        title: req.body.title,
        type: req.body.type,
        city: req.body.city,
        address: req.body.address,
        distance: req.body.distance,
        photos: req.body.photos,
        desc: req.body.desc,
        cheapestPrice: req.body.cheapestPrice,
        rating: parseInt(req.body.rating),
        featured: req.body.featured === 'true' ? true : false,
        rooms: req.body.rooms
    });
    const result = await newHotel.save();
    res.status(200).json({ message: 'add hotel', newHotel: result });
};

exports.editHotel = async (req, res, next) => {
    console.log('req body', req.body);
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    hotel.name = req.body.name;
    hotel.title = req.body.title;
    hotel.type = req.body.type;
    hotel.city = req.body.city;
    hotel.address = req.body.address;
    hotel.distance = req.body.distance;
    hotel.photos = req.body.photos;
    hotel.desc = req.body.desc;
    hotel.cheapestPrice = req.body.cheapestPrice;
    hotel.rating = parseInt(req.body.rating);
    hotel.featured = req.body.featured === 'true' ? true : false;
    hotel.rooms = req.body.rooms;

    const result = await hotel.save();
    res.status(200).json({
        message: 'edited hotel',
        result: result
    });

};

exports.deleteHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const result = await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ message: 'delete hotel', result: result });
};

exports.userList = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ message: 'Fetch hotels', users: users });
};

exports.transaction = async (req, res, next) => {
    const transactions = await Transaction.find().populate('user').populate('hotel').sort({ updatedAt: -1 }).limit(8);
    res.status(200).json({ message: "fetch transactions", transactions: transactions });
};

exports.getRooms = async (req, res, next) => {
    const rooms = await Room.find();
    res.status(200).json({ message: 'fetch room', rooms: rooms });
};

exports.getRoomById = async (req, res, next) => {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);

    res.status(200).json({ message: 'room by Id', room: room });
};

exports.addRoom = async (req, res, next) => {
    // to make sure rNumbers are number
    const roomNumbers = req.body.roomNumbers.map(rN => parseInt(rN));
    const newRoom = new Room({
        title: req.body.title,
        desc: req.body.desc,
        maxPeople: req.body.maxPeople,
        price: req.body.price,
        roomNumbers: roomNumbers
    });
    const result = await newRoom.save();
    res.status(200).json({ message: 'add room', newRoom: result });
};

exports.editRoom = async (req, res, next) => {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    room.title = req.body.title;
    room.desc = req.body.desc;
    room.maxPeople = req.body.maxPeople;
    room.price = req.body.price;
    room.roomNumbers = req.body.roomNumbers;


    const result = await room.save();
    res.status(200).json({ message: 'edit room', result: result });
};