const multer = require('multer');

const storage = multer.diskStorage  ({
  destination: function(req,file,callback) {
    callback(null,'uploads/')
  },
  filename: function(req,file,callback) {
    const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

    callback(null,file.fieldname + '.' + Date.now() + ext);
  }
})

module.exports = store = multer({storage: storage})