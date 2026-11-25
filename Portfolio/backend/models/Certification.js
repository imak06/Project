import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  issueDate: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    default: ''
  },
  credentialId: {
    type: String,
    default: ''
  },
  credentialUrl: {
    type: String,
    default: ''
  },
  certificateFile: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Certificates', 'Hackathons', 'Achievements', 'Competitions', 'Workshops', 'Technical events'],
    default: 'Certificates'
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

export default mongoose.model('Certification', CertificationSchema);
