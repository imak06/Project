import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secure_portfolio_jwt_secret_key_2026_arik_maitra', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.'
      });
    }

    // Update lastLogin
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
        lastLogin: admin.lastLogin
      }
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/auth/me
// @desc    Get current admin profile
// @access  Private (Admin)
router.get('/me', protectAdmin, async (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

// @route   PUT /api/auth/update-password
// @desc    Update admin password
// @access  Private (Admin)
router.put('/update-password', protectAdmin, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const admin = await Admin.findById(req.admin._id);
    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password'
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/auth/update-profile
// @desc    Update admin info (name, email, avatar)
// @access  Private (Admin)
router.put('/update-profile', protectAdmin, async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (name) admin.name = name;
    if (avatar !== undefined) admin.avatar = avatar;
    if (email && email.toLowerCase() !== admin.email) {
      const existing = await Admin.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists'
        });
      }
      admin.email = email.toLowerCase();
    }

    await admin.save();

    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
