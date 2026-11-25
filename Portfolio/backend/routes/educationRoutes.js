import express from 'express';
import Education from '../models/Education.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/education
// @desc    Get all education entries
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const education = await Education.find().sort({ order: 1, endYear: -1 });
    res.json({
      success: true,
      count: education.length,
      data: education
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/education
// @desc    Add education entry
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res, next) => {
  try {
    const entry = await Education.create(req.body);
    res.status(201).json({
      success: true,
      data: entry,
      message: 'Education added successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/education/:id
// @desc    Update education entry
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res, next) => {
  try {
    const entry = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Education entry not found'
      });
    }

    res.json({
      success: true,
      data: entry,
      message: 'Education updated successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/education/:id
// @desc    Delete education entry
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res, next) => {
  try {
    const entry = await Education.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Education entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Education entry deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
