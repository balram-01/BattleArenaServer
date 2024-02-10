const express = require("express");
const { register, login, verifyEmail, validateUserName }= require("../controllers/auth")

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.post("/verify-email", verifyEmail);
routes.get('/validate-username/:username', validateUserName)
module.exports = routes;