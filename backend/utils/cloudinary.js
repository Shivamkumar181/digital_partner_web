const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "ds51ziztk",
  api_key: "364843757342474",
  api_secret: "l5aL0PV4amMlM9JRsdn5rS0o9NI",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "freelance-projects",
    allowed_formats: ["jpg", "png", "webp"],
  },
});

module.exports = { cloudinary, upload: multer({ storage }) };
