import express from "express";
const router = express.Router();
import {upload} from "../middlewares/upload.js";
import { protect } from "../middlewares/verifyToken.js";

router.post('/', protect, upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const url = req.file.path; // Cloudinary URL
  res.json({ url });
});

export default router;