const path = require("path");
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats : ["jpg", "png", "jpeg"]
  }
});

const multerOptions = multer({
  storage
});

module.exports = multerOptions;