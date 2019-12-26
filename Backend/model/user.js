const mongoose = require("mongoose");
//unique validator package to allow only unique emails
const uniqueValidator = require("mongoose-unique-validator");
//creating the mongoose schema model for users
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},//specifying the metadata
  password: { type: String, required: true}
});
//provides validation if email already exists
userSchema.plugin(uniqueValidator);

//exporting the model
module.exports = mongoose.model('User', userSchema);
