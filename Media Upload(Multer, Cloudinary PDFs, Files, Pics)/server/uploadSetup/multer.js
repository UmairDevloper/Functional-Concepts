const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "dataStore",
   resource_type: "auto",
    public_id: (req, file) =>
      file.originalname.split(".")[0] + "-" + Date.now(),
  },
});

const uploads = multer({ storage });
module.exports = uploads;
