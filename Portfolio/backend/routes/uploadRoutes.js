import express from 'express';
import { upload } from '../middleware/upload.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload a single file (image or PDF)
// @access  Private (Admin)
router.post('/', protectAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }

  // Construct relative URL accessible via static middleware
  const fileUrl = `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    message: 'File uploaded successfully'
  });
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple files (gallery images)
// @access  Private (Admin)
router.post('/multiple', protectAdmin, upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }

  const fileUrls = req.files.map(file => `/uploads/${file.filename}`);

  res.json({
    success: true,
    urls: fileUrls,
    count: req.files.length,
    message: `${req.files.length} files uploaded successfully`
  });
});

export default router;
