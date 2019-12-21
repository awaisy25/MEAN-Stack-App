
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//path package to construct path
const path = require("path");

const postsRoutes = require("./routes/posts");


// assigning app to express is in chare of incoming messages and outputting messages
// it is the middleware of everything
const app = express();
//this will parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//middle ware to allow access to fetch images from images folder
app.use("/images", express.static(path.join("backend/images")));
//creating the mongodb database connection
mongoose.connect('mongodb+srv://awais:dragonballz1@mstackcluster-hwzch.mongodb.net/angular-Data?retryWrites=true&w=majority')
.then(() =>{
  console.log("Connected to database");
})
.catch(err => {
  console.log(err);
});
//middleware, to have Cross origin connections, needed to connect angular client side and node server
app.use((req,res, next) => {
  //creating a set header to create a request for access control
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 //header for different http requests
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

  next();
});

//using the route navigation from post routes, putting path in as arguement
app.use("/api/posts", postsRoutes);


//exporting these features by exporting the app, the features come with it
module.exports = app;
