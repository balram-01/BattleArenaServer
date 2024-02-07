const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    date: {
        type: Date.now,
        required: true
    },
    map: {
        type: String, 
        required:true
    
    },
    mode: {
        type: String,
        required:true
    },
    maxPlayers: {
        type: Number,
        required:true
    },
    startsOn: {
        type: Date,
        required: true
    },
    joined: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    prize: {
        type: Number,
        required:true
    },
    prizePerKill: {
        type: Number,
        required: true
    },
    entryCoins: {
        type: Number,
        required: true
    },
    hostedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }


}, { timestamps: true });

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
