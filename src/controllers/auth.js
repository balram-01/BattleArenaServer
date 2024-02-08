// In register.js
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const User = require('../models/User');
const sendOTPByEmail = require('../helper/sendOTPByEmail');
const { JWT_SECRET } = require("../config/config")
const register=async (req, res) => {
    try {
        const { email, password, ...otherParams } = req.body;

        // Check if the email is already registered
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' ,status:true});
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
       
        const newUser = new User({
            email,
            password: hashedPassword,
            otp,
            ...otherParams
        });

        // Save the user to the database
        await newUser.save();

        // Send OTP to user's email
        const emailSent = await sendOTPByEmail(email, otp);
        if (!emailSent) {
            return res.status(500).json({ message: 'Error sending OTP email' ,status:false});
        }

        // Return success message
        res.status(201).json({ message: 'User registered successfully' ,data:newUser,status:true});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' ,status:false});
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required',status:false });
        }

       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' ,status:false});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password',  status:false});
        }

        // Generate JWT token
        console.log(
            "JWT_SECRET" + JWT_SECRET
        )
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // Return token to client
        res.status(200).json({ token, message: 'Login Successful', data: user ,status:true});

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' ,status:false});
    }
}


const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

         if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' ,status:false});
        }

         const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', status: false });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP', status: false });
        }

        user.otp = null;
        user.emailVerified=true
        await user.save();

        console.log(`OTP verified for user with email: ${email}`);

       
        return res.status(200).json({ message: 'OTP verified successfully', status: true });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal Server Error', status: false });
    }
}



module.exports = { register, verifyEmail, login }