const express = require("express");
const { register,login, verifyEmail }= require("../controllers/auth")

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.post("/verify-email", verifyEmail);

module.exports = routes;