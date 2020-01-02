const mongoose = require('mongoose');
//creating the mongoose schema model
const postSchema = mongoose.Schema({
  title: { type: String, required: true},//specifying the metadata
  content: { type: String, required: true},
  imagePath: { type: String, required: true},
  //fields for authorization by checking its mongoode id
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

//turn schema into model
module.exports = mongoose.model('Post', postSchema);
