import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
    trim: true
  },
  institution: {
    type: String,
    required: true,
    trim: true
  },
  fieldOfStudy: {
    type: String,
    default: 'Computer Science'
  },
  startYear: {
    type: String,
    required: true
  },
  endYear: {
    type: String,
    required: true
  },
  expectedGraduation: {
    type: Boolean,
    default: false
  },
  grade: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Education', EducationSchema);
