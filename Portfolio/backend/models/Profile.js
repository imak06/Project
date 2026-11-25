import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Arik Maitra'
  },
  title: {
    type: String,
    required: true,
    default: 'Full-Stack Developer | MERN Stack Developer | Tech Enthusiast'
  },
  typingTitles: {
    type: [String],
    default: [
      'Full-Stack Developer',
      'MERN Stack Developer',
      'Frontend Developer',
      'Tech Enthusiast'
    ]
  },
  heroSubtitle: {
    type: String,
    default: 'Building modern digital experiences with code, creativity, and curiosity.'
  },
  aboutMe: {
    type: String,
    required: true,
    default: 'I am a Computer Science Engineering student passionate about building modern, scalable, and interactive web applications. I enjoy exploring new technologies, solving problems, and transforming creative ideas into functional digital experiences.\n\nMy goal is to become a skilled Full-Stack MERN Developer with expertise in cloud computing and AWS.'
  },
  careerGoals: {
    type: String,
    default: 'Mastering modern cloud architecture, microservices, and distributed scalable web systems on AWS while crafting top-tier user experiences.'
  },
  currentLearning: {
    type: String,
    default: 'Deepening expertise in AWS Cloud Computing, Next.js, System Design, and Docker containerization.'
  },
  interests: {
    type: [String],
    default: ['Cricket', 'Badminton', 'Technology and Software Development', 'Open Source', 'UI/UX Design']
  },
  profileImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
  },
  resumeUrl: {
    type: String,
    default: '/resume.pdf'
  },
  email: {
    type: String,
    required: true,
    default: 'arikmaitra071@gmail.com'
  },
  phone: {
    type: String,
    default: '+91 98765 43210'
  },
  location: {
    type: String,
    default: 'Dehradun / Kolkata, India'
  },
  socialLinks: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    twitter: { type: String, default: 'https://twitter.com' },
    leetcode: { type: String, default: 'https://leetcode.com' },
    instagram: { type: String, default: 'https://instagram.com' }
  },
  stats: {
    projectsCount: { type: Number, default: 12 },
    experienceYears: { type: String, default: '2+' },
    skillsCount: { type: Number, default: 15 },
    coffeeCups: { type: Number, default: 450 }
  }
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);
