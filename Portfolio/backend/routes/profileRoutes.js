import express from 'express';
import Profile from '../models/Profile.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/profile
// @desc    Get public profile data
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/profile
// @desc    Update profile data
// @access  Private (Admin)
router.put('/', protectAdmin, async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();

    res.json({
      success: true,
      data: profile,
      message: 'Profile updated successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
