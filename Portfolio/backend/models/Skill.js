import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Frontend Development',
      'Backend Development',
      'Database',
      'Programming Languages',
      'Tools and Technologies',
      'Cloud Computing'
    ]
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 85
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Advanced'
  },
  icon: {
    type: String,
    default: 'Code'
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Skill', SkillSchema);
