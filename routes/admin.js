const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/hotels', adminController.getHotels);

router.get('/hotels/:hotelId', adminController.getHotelById);

router.post('/addHotel', adminController.addHotel);

router.patch('/editHotel/:hotelId', adminController.editHotel);

router.delete('/deleteHotel/:hotelId', adminController.deleteHotel);

router.get('/rooms', adminController.getRooms);

router.get('/rooms/:roomId', adminController.getRoomById);

router.post('/addRoom', adminController.addRoom);

router.patch('/editRoom/:roomId', adminController.editRoom);

router.get('/users', adminController.userList);

router.get('/transactions', adminController.transaction);


module.exports = router;