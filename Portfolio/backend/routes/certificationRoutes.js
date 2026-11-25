import express from 'express';
import Certification from '../models/Certification.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/certifications
// @desc    Get all achievements and certifications
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;

    const certs = await Certification.find(query).sort({ order: 1, issueDate: -1 });
    res.json({
      success: true,
      count: certs.length,
      data: certs
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/certifications
// @desc    Add achievement or certification
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res, next) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json({
      success: true,
      data: cert,
      message: 'Certification added successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/certifications/:id
// @desc    Update certification
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.json({
      success: true,
      data: cert,
      message: 'Certification updated successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/certifications/:id
// @desc    Delete certification
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.json({
      success: true,
      message: 'Certification deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
