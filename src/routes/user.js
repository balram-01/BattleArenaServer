const express = require("express");
const { register, login, verifyEmail, validateUserName } = require("../controllers/auth");
const { getUserDetails, updateUser } = require("../controllers/user");
const verifyToken = require("../middlewares/verifyToken")

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.post("/verify-email", verifyEmail);
routes.get('/validate-username/:username', validateUserName);
routes.get('/user-details/:userId', verifyToken, getUserDetails)
routes.put("/update/:id", verifyToken,updateUser)
module.exports = routes;