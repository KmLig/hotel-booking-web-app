const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotel');
const adminRoutes = require('./routes/admin');

const MONGODB_URI = "mongodb+srv://khiem-nodejs-complete:fHxYl7XAEo9eVhnV@cluster0.gqkd11r.mongodb.net/hotel?retryWrites=true&w=majority";

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use('/api/auth', authRoutes);

app.use('/api/hotel', hotelRoutes);

app.use('/api/admin', adminRoutes);


app.use((error, req, res, next) => {

    console.log(error.message);
    const status = error.code || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});

mongoose.connect(MONGODB_URI)
    .then((result) => {
        app.listen(5000);
    }).catch((err) => {
        console.log(err);
    });

