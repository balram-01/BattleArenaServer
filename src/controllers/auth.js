// In register.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const sendOTPByEmail = require('../helper/sendOTPByEmail');

const register=async (req, res) => {
    try {
        const { email, password, ...otherParams } = req.body;

        // Check if the email is already registered
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
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
            return res.status(500).json({ message: 'Error sending OTP email' });
        }

        // Return success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports={register}