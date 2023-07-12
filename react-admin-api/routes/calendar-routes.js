const express = require("express");
const { calendar } = require('../controller/index')
let routerCalender = express.Router();

// routerUser.use(calendarentication)
routerCalender.get("/", calendar.addEvent);

module.exports = routerCalender;