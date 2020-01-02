/* built in function to see if user has JWT token
if so grant the user authorization to feature that involve creating apost & deleting
if failed users will only have read-access as a guest to this application*/
const jwt = require("jsonwebtoken");

//exporting the function to validate the jason web token
module.exports = (req, res, next) => {
  //try & catch block to see if there is a token
  try{
  const token = req.headers.authorization.split(" ")[1]//expected to obtain token
  const decodedToken = jwt.verify(token, 'secret_this_should_be_longer'); //verify needs the secret string that was passed in .sign function from user.js
  //creating a new property to req object
  req.userData = { email: decodedToken.email, userId: decodedToken.userId };
  next();
  } catch(error) {
    res.status(401).json( {message: "You are not Authenticated" });
  }
};
