// creating routes in the back end using express router
const express = require('express');
// multer is for getting incoming files
const multer = require("multer");
const router = express.Router();
//custom built middleare to allow access for the post/edit features in this program
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const Post = require('../model/post');

const storage = multer.diskStorage({
  // destination is a function meant for saving a file
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "Backend/images") // callback to set the path to images folder
  },
  //getting the file name
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    //extensions for the file type
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext); //calling back the full filename
  }

});

router.post("")
//same as app.post, app.get, but using router name instead
//router post is middleware for dealing wiht post requests
router.post("", checkAuth, //checkauth is the self made function to see if auser has token
multer({storage: storage}).single('image'), (req,res, next)=> { //pass in multer as the function
  //get url of the server from protocol and create the full url
  const url = req.protocol + '://' + req.get('host');
  //requesting the mongoose model from Post model
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  })
  //save to mongo database as document
  post.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Post Added succesfully',
      post: { //creating post json object to be retrieved from rest API
        //spread operator gets all of the properties from the object
        ...result,
        id: result._id
      }
  });
  });
  //everyhting is ok and one resource for 200
});
  // updating value through put request
  router.put("/:id", checkAuth,
  multer({ storage: storage }).single('image'), (req, res, next) => {
    //check if the file exists in the post list then store the url with the new file name
    let imagePath = req.body.imagePath; //if it does then it got it from the upload
    if(req.file) {
      const url = req.protocol + '://' + req.get('host');
      let imagePath = url + "/images/" + req.file.filename;
    }
    //creating new post object
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    })
    console.log(post);
    //mongo db uodates object by id
    Post.updateOne({_id: req.params.id}, post).then(result => {
      console.log(result)
      res.status(200).json({message: 'Update Succesful!'});
    })
  });

//calling in the database to get the data
router.get('', (req, res, next) => {
   //getting the objects from the query parameters put in. use + to convert to numeric
   const pageSize = +req.query.pagesize;
   const currentPage = +req.query.page;
   const postQuery = Post.find();
   let fetchedPosts;
   //check if we passed in pagesize or page query parameter
   if (pageSize && currentPage) {
    postQuery //skip method skips n number of posts
    .skip(pageSize * (currentPage - 1)) //logic is setting page size then based on current page that how many items get skipped
    .limit(pageSize); //limiting the page size
   }
    postQuery.then(documents => {
      //returning count of the number of values in mongodb datbase
      fetchedPosts = documents;
      return Post.count(); //when return in a promise (then). can call another promise
    }).then(count => {
      res.status(200).json({
        message: "Posts fetched succesfully",
        posts: fetchedPosts,
        maxPosts: count
      });
    });
  });


//new get request to route to the right component
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    //checking if posts exists
    if (post) {
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post Not Found'});
    }
  });
});

//creating the delete feature. needs autorization to delete
router.delete("/:id", checkAuth, (req,res,next) => {
  //using mongoose query to delete selected object from database
 Post.deleteOne({ _id: req.params.id }).then(result => {
  console.log(result);
  res.status(200).json({ message: "Post deleted!" });
 });

});

//exporting the router
module.exports = router;
