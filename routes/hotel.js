const express = require('express');
const router = express.Router();

const hotelController = require('../controllers/hotel');


router.get('/hotels', hotelController.getHotels);

router.get('/search', hotelController.bySearchKey);

router.get('/byrating', hotelController.byRating);

router.get('/:hotelId', hotelController.byhotelId);

router.post('/:hotelId/booking', hotelController.booking);

router.post('/transaction', hotelController.transaction);

module.exports = router;