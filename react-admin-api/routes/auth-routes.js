const express = require("express");
const { auth } = require("../controller/index");
let routerAuth = express.Router();

// routerUser.use(authentication)
routerAuth.post("/", auth.auth);
routerAuth.get("/google", auth.oauth2);
routerAuth.get("/google/redirect", auth.redirect);

module.exports = routerAuth;
