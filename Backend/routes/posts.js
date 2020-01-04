// creating routes in the back end using express router
const express = require('express');
// multer is for getting incoming files
const multer = require("multer");
const router = express.Router();
//custom built middleare to allow access for the post/edit features in this program
const checkAuth = require("../middleware/check-auth");
// file that contains all of the http methods
const PostController = require("../controllers/posts");
//retrieve the function to extract image files
const extractFile = require("../middleware/file");


router.post("")
//same as app.post, app.get, but using router name instead
//router post is middleware for dealing wiht post requests
router.post("", checkAuth, //checkauth is the self made function to see if auser has token
extractFile, PostController.createPost);
  // updating value through put request. only user can update their post
  router.put("/:id", checkAuth, extractFile, PostController.updatePost);

//calling in the database to retrive all of the posts
router.get('', PostController.getPosts);


//new request to retrive specific post to edit or delete
router.get("/:id", PostController.getPost);

//creating the delete feature. needs autorization to delete
router.delete("/:id", checkAuth, PostController.deletePost);

//exporting the router
module.exports = router;
