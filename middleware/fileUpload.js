import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "upload",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ height: 200, width: 200, crop: "limit" }]
  }),
});

const uploads = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("invalid file type"));
    }
    cb(null, true);
  }
});

export default uploads;
