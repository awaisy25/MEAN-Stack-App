//functions for http calls in back end
const Post = require('../model/post');
exports.createPost = (req,res, next)=> { //pass in multer as the function
  //get url of the server from protocol and create the full url
  const url = req.protocol + '://' + req.get('host');
  //requesting the mongoose model from Post model
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
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
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a post failed!"
    });
  })
  //everyhting is ok and one resource for 200
}

exports.updatePost = (req, res, next) => {
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
    imagePath: imagePath,
    creator: req.userData.userId
  })

  //mongo db updates object by post id & user login id
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    // checking if it got modified & send response
    if (result.n > 0) {
    res.status(200).json({message: 'Update Succesful!'});
    } else{
      res.status(401).json({message: "Not authorized"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update posts"
    })
  })
}

exports.getPosts = (req, res, next) => {
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
   })
   .catch(error => {
     res.status(500).json({
       message: "Fetching posts failed!"
     });
   });
 };

 exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    //checking if posts exists
    if (post) {
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post Not Found'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
}

exports.deletePost = (req,res,next) => {
  //using mongoose query to delete selected object from database
 Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    // checking if it got deleted & send response
    if (result.n> 0) {
      res.status(200).json({message: 'Deletion Succesful!'});
      } else{
        res.status(401).json({message: "Not authorized"});
      }
 })
 .catch(error => {
  res.status(500).json({
    message: "Fetching posts failed!"
  });
});
};
