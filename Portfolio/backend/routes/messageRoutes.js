import express from 'express';
import Message from '../models/Message.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/messages
// @desc    Submit a new contact message (Public)
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill out all required fields (name, email, subject, message)'
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received.',
      data: newMessage
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/messages
// @desc    Get all contact messages
// @access  Private (Admin)
router.get('/', protectAdmin, async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status === 'unread') query.isRead = false;
    if (status === 'read') query.isRead = true;

    const messages = await Message.find(query).sort({ createdAt: -1 });
    const unreadCount = await Message.countDocuments({ isRead: false });

    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/messages/:id
// @desc    Get single message details and mark as read
// @access  Private (Admin)
router.get('/:id', protectAdmin, async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    if (!message.isRead) {
      message.isRead = true;
      await message.save();
    }

    res.json({
      success: true,
      data: message
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/messages/:id/read-status
// @desc    Toggle or set read status
// @access  Private (Admin)
router.put('/:id/read-status', protectAdmin, async (req, res, next) => {
  try {
    const { isRead } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.isRead = isRead !== undefined ? isRead : !message.isRead;
    await message.save();

    res.json({
      success: true,
      data: message,
      message: `Message marked as ${message.isRead ? 'read' : 'unread'}`
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
