const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        default:""
        
    },
    mobile: {
        type: String,
        required: true,
        max: 10,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        max: 50
    },
    dob: {
        type: String,
        max: 50
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    followersCount: {
        type: Number,
        default: 0,
    },
    followingCount: {
        type: Number,
        default: 0,
    },
    matches: [{
        type: mongoose.Schema.ObjectId,
        ref: "Match"
    }]
}, { timestamps: true, })
const User = mongoose.model('User', userSchema);

module.exports = User