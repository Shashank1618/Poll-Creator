const mongoose = require('mongoose');

const url = 'mongodb+srv://ayush1210:allsmall2004@mern.ddk0v.mongodb.net/LivePollCreator?retryWrites=true&w=majority&appName=MERN'  // connected to the database

// asynchronous - returns a promise
mongoose.connect(url)
.then((result) => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;