// In sendEmail.js

const nodemailer = require('nodemailer');
const {EMAIL,EMAIL_PASSWORD,EMAIL_SERVICE_PROVIDER} = require("../config/config")
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service:EMAIL_SERVICE_PROVIDER,
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

async function sendOTPByEmail(email, otp) {
    try {
        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: 'OTP for Email Verification',
            text: `Your OTP for email verification is: ${otp}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports = sendOTPByEmail;
