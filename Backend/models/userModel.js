const { Schema, model } = require("../connection");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a username"],
        },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = model("userscollection", userSchema);

module.exports = User;