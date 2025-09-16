require('dotenv').config();
const mongoose = require('mongoose');


const url = process.env.MONGODB_URI;

// asynchronous - returns a promise
mongoose.connect(url)
.then((result) => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;