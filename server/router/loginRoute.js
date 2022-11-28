const express = require('express');
const route = express.Router();

const loginControl = require("../controller/loginControl");


route.get("/home",loginControl.homepage);
route.get("/auth/profile",loginControl.profilepage);
route.get("/register",loginControl.registerpage);
route.post("/auth/register",loginControl.register);
route.get("/logintemplate",loginControl.logintmp);
route.post("/auth/login",loginControl.login);

module.exports = route;