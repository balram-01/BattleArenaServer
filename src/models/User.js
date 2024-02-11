const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        max: 50,
        default:''
    },
    firstName: {
        type:String,
        default:''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: "",
        required:true   
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: "",
        select:false

    },
    password: {
        type: String,
        select:false
      
    },
   
    mobile: {
        type: String,
        max: 10,
        unique: true
    },
    gender: {
        type: String,
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