const multer = require("multer");
const path  = require("path")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/uploads/invoices");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
  
var multipleUpload = multer({ storage:storage }).array('files')

module.exports = multipleUpload;