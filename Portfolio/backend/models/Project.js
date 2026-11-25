import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  detailedDescription: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    required: true
  },
  gallery: {
    type: [String],
    default: []
  },
  technologies: {
    type: [String],
    required: true,
    default: []
  },
  category: {
    type: String,
    required: true,
    enum: ['Full-Stack', 'MERN Stack', 'Frontend', 'Backend', 'UI/UX Design', 'Other'],
    default: 'Full-Stack'
  },
  githubUrl: {
    type: String,
    default: ''
  },
  liveDemoUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  },
  order: {
    type: Number,
    default: 0
  },
  completionDate: {
    type: String,
    default: '2024'
  }
}, { timestamps: true });

ProjectSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  }
  next();
});

export default mongoose.model('Project', ProjectSchema);
