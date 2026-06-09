import multer from "multer";
import path from"path";
import cloudinary from "../config/cloudinary.js";
import {CloudinaryStorage} from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rental-listings',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});



const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const valid = allowed.test(path.extname(file.originalname).toLowerCase());
    valid ? cb(null, true) : cb(new Error('Only images allowed'));
  }
});

export  {upload};

