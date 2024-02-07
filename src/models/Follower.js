const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    following: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true, autoIndex: true });

followerSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follower = mongoose.model("Follower", followerSchema);

module.exports = Follower;
