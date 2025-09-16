const { Schema, model, Types } = require("../connection");

const roomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    owner: { type: Types.ObjectId, ref: "users" },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Room = model("rooms", roomSchema);

module.exports = Room;