const express = require("express");
const { register } = require("../controllers/auth");

const routes = express.Router();

routes.post("/login",register);

module.exports = routes;