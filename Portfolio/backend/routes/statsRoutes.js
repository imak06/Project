import express from 'express';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import Message from '../models/Message.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/stats
// @desc    Get dashboard summary statistics and analytics
// @access  Private (Admin)
router.get('/', protectAdmin, async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      totalExperiences,
      totalSkills,
      totalEducation,
      totalCertifications,
      totalMessages,
      unreadMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      Project.countDocuments({ status: 'draft' }),
      Experience.countDocuments(),
      Skill.countDocuments(),
      Education.countDocuments(),
      Certification.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false })
    ]);

    // Categories breakdown
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const skillsByCategory = await Skill.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Recent 5 messages
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt isRead');

    // Recent 5 projects
    const recentProjects = await Project.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('title category status featured updatedAt thumbnail');

    res.json({
      success: true,
      stats: {
        totalProjects,
        publishedProjects,
        draftProjects,
        totalExperiences,
        totalSkills,
        totalEducation,
        totalCertifications,
        totalMessages,
        unreadMessages
      },
      breakdowns: {
        projectsByCategory,
        skillsByCategory
      },
      recentActivity: {
        messages: recentMessages,
        projects: recentProjects
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
