import express from "express";
const router = express.Router();
import {upload} from "../middlewares/upload.js";
import { protect } from "../middlewares/verifyToken.js";

router.post('/', protect, (req, res, next) => {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      console.error('Multer/Cloudinary error:', err.message || err);
      return res.status(400).json({ 
        message: 'Upload failed', 
        error: err.message || 'Unknown error' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const url = req.file.path;
      res.json({ url });
    } catch (error) {
      console.error('Error accessing file path:', error.message);
      res.status(500).json({ message: 'Error processing upload', error: error.message });
    }
  });
});

export default router;