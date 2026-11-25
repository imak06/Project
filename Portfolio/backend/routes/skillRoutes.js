import express from 'express';
import Skill from '../models/Skill.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills, optionally grouped by category
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category, grouped } = req.query;
    const query = {};
    if (category) query.category = category;

    const skills = await Skill.find(query).sort({ order: 1, proficiency: -1 });

    if (grouped === 'true') {
      const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {});

      return res.json({
        success: true,
        data: groupedSkills
      });
    }

    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/skills
// @desc    Add new skill
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      data: skill,
      message: 'Skill added successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      data: skill,
      message: 'Skill updated successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
