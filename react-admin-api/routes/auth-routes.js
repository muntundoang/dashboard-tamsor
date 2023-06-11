const express = require("express");
const { auth } = require('../controller/index')
let routerAuth = express.Router();

// routerUser.use(authentication)
routerAuth.post("/", auth.auth);

module.exports = routerAuth;