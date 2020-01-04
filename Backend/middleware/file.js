// multer is for getting incoming files
const multer = require("multer");
// middleare function to check the file types
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

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
//export in mutler as the middleware for image storage
module.exports = multer({storage: storage}).single('image')
