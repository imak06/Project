import mongoose from 'mongoose';

const WebsiteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Arik Maitra - Portfolio'
  },
  logoText: {
    type: String,
    default: 'ARIK.'
  },
  metaTitle: {
    type: String,
    default: 'Arik Maitra | Full-Stack MERN Developer Portfolio'
  },
  metaDescription: {
    type: String,
    default: 'Personal portfolio of Arik Maitra, a Computer Science Engineering student and aspiring Full-Stack MERN Developer.'
  },
  keywords: {
    type: [String],
    default: ['Arik Maitra', 'Full-Stack Developer', 'MERN Stack', 'React Developer', 'Node.js', 'Portfolio']
  },
  favicon: {
    type: String,
    default: '/favicon.ico'
  },
  footerText: {
    type: String,
    default: 'Designed & Engineered with passion by Arik Maitra. Built with MERN Stack, Tailwind CSS & Framer Motion.'
  },
  resumeFile: {
    type: String,
    default: '/resume.pdf'
  },
  themePreference: {
    type: String,
    enum: ['dark', 'light', 'system'],
    default: 'dark'
  },
  contactEmail: {
    type: String,
    default: 'arikmaitra071@gmail.com'
  },
  socialLinks: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    twitter: { type: String, default: 'https://twitter.com' }
  }
}, { timestamps: true });

export default mongoose.model('WebsiteSettings', WebsiteSettingsSchema);
