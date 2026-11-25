import express from 'express';
import Experience from '../models/Experience.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/experiences
// @desc    Get all experience entries (sorted by order and startDate)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/experiences
// @desc    Add new experience entry
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({
      success: true,
      data: experience,
      message: 'Experience added successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/experiences/:id
// @desc    Update experience entry
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found'
      });
    }

    res.json({
      success: true,
      data: experience,
      message: 'Experience updated successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/experiences/:id
// @desc    Delete experience entry
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
