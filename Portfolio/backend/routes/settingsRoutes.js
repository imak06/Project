import express from 'express';
import WebsiteSettings from '../models/WebsiteSettings.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/settings
// @desc    Get website global settings
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.json({
      success: true,
      data: settings
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/settings
// @desc    Update website global settings
// @access  Private (Admin)
router.put('/', protectAdmin, async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();

    res.json({
      success: true,
      data: settings,
      message: 'Website settings saved successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
