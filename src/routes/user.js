const express = require("express");
const { register, verifyOTP,login }= require("../controllers/auth")

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.post("/verify-email", verifyOTP);

module.exports = routes;