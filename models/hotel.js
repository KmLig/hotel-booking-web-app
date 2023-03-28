const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    rooms: {
        type: [String],
        required: true
    }

}, { timestamps: true });
hotelSchema.index({ name: 'text', city: 'text' });
module.exports = mongoose.model('Hotel', hotelSchema);
