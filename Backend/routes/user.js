// node js file for helping create new users accounts
const express = require("express");
//bcrypt is the encryption tools in javascript
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../model/user");
const router = express.Router();

//post for inputting in user sign up requests
router.post("/signup", (req, res, next) => {
  //using hash function to hash the passcode, higher the number then more complex the hash value is
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  // creating the new user object based from previous model. with hash value set as password
  const user = new User({
    email: req.body.email,
    password: hash
  });
  user.save() // save to database
  .then(result => {
    res.status(201).json({
      message: 'User created',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      message: "Invalid authentication credentials" //error message to send to front end
    })
  });
  });
});
//creating a Jason web token for SPA authentication
router.post("/login", (req, res, next) => {
  let fetchUser; //setting a variable for user so it can be used in all then blocks
  //first validate if email exists usign find in database
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    //matching hash value to see if the passcode is the users passcode
    return bcrypt.compare(req.body.password, user.password)
  }) //promise after authorization to see if it worked or not
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    //creating the json web token through sign method with email & user id as input data
    // this token will be sent back to the user for authentication
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_longer',
    {expiresIn: "1h"}); //expires in give the duration for how long this token last till it expires
    res.status(200).json({
      token: token,
      expiresIn: 3600, //3600 seconds (1hr) till it expires
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Invalid login"
    });
  })
});
//exporting the router http calls
module.exports = router;
