
const User = require('../models/User');
const sendOTPByEmail = require('../helper/sendOTPByEmail');
const { JWT_SECRET } = require("../config/config")

const getUserDetails = async (req, res) => {
    const { userId } = (req.user ||req.params)??{}
   
    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }
       res.status(200).json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);

        return res.status(500).json({ message: 'Internal server error' });
    }
}
    
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming you're passing user ID in the URL
        const updates = req.body; // Assuming you're sending updates in the request body
        // Update only the fields that are provided in the request body
        const allowedUpdates = ['username', 'firstName', 'lastName', 'email', 'mobile', 'gender', 'dob', 'profilePic', 'coverPic'];
        const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        // Update user details
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};



module.exports = {getUserDetails,updateUser};