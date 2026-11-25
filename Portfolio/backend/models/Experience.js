import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Internship', 'Freelance', 'Contract', 'Open Source'],
    default: 'Internship'
  },
  location: {
    type: String,
    default: 'Remote'
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    default: ''
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    default: []
  },
  companyLogo: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Experience', ExperienceSchema);
