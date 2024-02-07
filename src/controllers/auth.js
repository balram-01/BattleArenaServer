const User = require("../models/User");
const register = async (req, res) => {
    try {
        const { email, mobile, ...otherUserData } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
         const user = new User({
            email,
            mobile,
            ...otherUserData,
        });

        // Save the user to the database
        await user.save();

        return res.status(201).json({ message: "Registered successfully", data: user });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {register}