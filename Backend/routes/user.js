// node js file for helping create new users accounts
const express = require("express");
const UserController = require("../controllers/user"); //retrieiving the functions for signup and login
const router = express.Router();

//post for inputting in user sign up requests
router.post("/signup", UserController.createUser);
//creating a Jason web token for SPA authentication
router.post("/login", UserController.userLogin);
//exporting the router http calls
module.exports = router;
