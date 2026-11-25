import express from 'express';
import Project from '../models/Project.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all published projects (Public) or all projects including drafts (Admin)
// @access  Public / Admin
router.get('/', async (req, res, next) => {
  try {
    const { category, featured, search, status } = req.query;
    const query = {};

    // Public users can only see published projects
    // Only if admin token is provided and status is specified can drafts be returned
    const isAdmin = req.headers.authorization && req.headers.authorization.startsWith('Bearer');
    if (!isAdmin || status === 'published') {
      query.status = 'published';
    } else if (status && status !== 'all') {
      query.status = status;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/projects/admin/all
// @desc    Get all projects (including drafts) for admin table
// @access  Private (Admin)
router.get('/admin/all', protectAdmin, async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/projects/:idOrSlug
// @desc    Get single project by ID or Slug
// @access  Public
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let project;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(idOrSlug);
    } else {
      project = await Project.findOne({ slug: idOrSlug });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
