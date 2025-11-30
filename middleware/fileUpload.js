// 

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "upload",
    allowed_formats: ["jpg", "jpeg", "png"],
    resource_type: "image",
    quality: "auto:best",       // keep original quality
  }),
});

const uploads = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB recommended
  fileFilter: function (req, file, cb) {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("invalid file type"));
    }
    cb(null, true);
  }
});

export default uploads;
