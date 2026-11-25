import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import Admin from './models/Admin.js';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Certification from './models/Certification.js';
import Message from './models/Message.js';
import WebsiteSettings from './models/WebsiteSettings.js';
import { connectDB } from './config/db.js';

dotenv.config();

export const seedDatabase = async () => {
  console.log('Seeding initial portfolio data for Arik Maitra...');

  try {
    // 1. Seed Admin
    await Admin.deleteMany({});
    const defaultPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
    
    // Admin 1: arikmaitra071@gmail.com
    await Admin.create({
      name: 'Arik Maitra',
      email: (process.env.ADMIN_EMAIL || 'arikmaitra071@gmail.com').toLowerCase(),
      password: defaultPassword,
      role: 'superadmin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    });

    // Also support admin@gmail.com for quick convenience
    await Admin.create({
      name: 'Arik Maitra (Admin)',
      email: 'admin@gmail.com',
      password: defaultPassword,
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    });
    console.log('Admin accounts seeded: arikmaitra071@gmail.com & admin@gmail.com');

    // 2. Seed Profile
    await Profile.deleteMany({});
    await Profile.create({
      name: 'Arik Maitra',
      title: 'Full-Stack Developer | MERN Stack Developer | Tech Enthusiast',
      typingTitles: [
        'Full-Stack Developer',
        'MERN Stack Developer',
        'Frontend Developer',
        'Tech Enthusiast'
      ],
      heroSubtitle: 'Building modern digital experiences with code, creativity, and curiosity.',
      aboutMe: 'I am a Computer Science Engineering student passionate about building modern, scalable, and interactive web applications. I enjoy exploring new technologies, solving problems, and transforming creative ideas into functional digital experiences.\n\nMy goal is to become a skilled Full-Stack MERN Developer with expertise in cloud computing and AWS.',
      careerGoals: 'My goal is to become a skilled Full-Stack MERN Developer with expertise in cloud computing and AWS, architecting robust microservices and delighting users with intuitive interfaces.',
      currentLearning: 'Deepening expertise in AWS Cloud Computing (S3, EC2, Lambda), Docker containerization, and advanced MERN architecture.',
      interests: ['Cricket', 'Badminton', 'Technology and Software Development', 'Competitive Programming', 'Creative Web Animation'],
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      resumeUrl: '/resume.pdf',
      email: 'arikmaitra071@gmail.com',
      phone: '+91 98765 43210',
      location: 'Dehradun / Kolkata, India',
      socialLinks: {
        github: 'https://github.com/arikmaitra',
        linkedin: 'https://linkedin.com/in/arikmaitra',
        twitter: 'https://twitter.com/arikmaitra',
        leetcode: 'https://leetcode.com',
        instagram: 'https://instagram.com'
      },
      stats: {
        projectsCount: 14,
        experienceYears: '2+',
        skillsCount: 16,
        coffeeCups: 520
      }
    });
    console.log('Profile seeded');

    // 3. Seed Projects
    await Project.deleteMany({});
    const projects = [
      {
        title: 'LAMP LOGIN PAGE',
        slug: 'lamp-login-page',
        shortDescription: 'Interactive login interface with a physics-based draggable animated lamp controlling login form visibility.',
        detailedDescription: 'A creative, interactive login interface designed to redefine user authentication UX. It features a custom SVG hanging lamp with realistic draggable cord physics built using GSAP, GSAP Draggable Plugin, and MorphSVG Plugin. Pulling the lamp cord smoothly switches between light and dark ambient modes, activating a glowing glassmorphism login form with micro-animations and validation.',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
        gallery: [
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'SVG', 'GSAP', 'GSAP Draggable', 'MorphSVG Plugin'],
        category: 'Frontend',
        githubUrl: 'https://github.com/arikmaitra/lamp-login-page',
        liveDemoUrl: 'https://lamp-login-demo.vercel.app',
        featured: true,
        status: 'published',
        order: 1,
        completionDate: '2024'
      },
      {
        title: 'DevPulse - Collaborative Workspace',
        slug: 'devpulse-collaborative-workspace',
        shortDescription: 'Full-stack MERN real-time developer workspace with markdown documentation, team chat, and live code playground.',
        detailedDescription: 'Comprehensive developer platform designed for remote engineering teams. Built with React.js, Node.js, Express.js, MongoDB, and Socket.io. Features real-time state synchronization, granular permission roles, JWT security, and interactive API playgrounds.',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
        gallery: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Socket.io'],
        category: 'MERN Stack',
        githubUrl: 'https://github.com/arikmaitra/devpulse',
        liveDemoUrl: 'https://devpulse.vercel.app',
        featured: true,
        status: 'published',
        order: 2,
        completionDate: '2024'
      },
      {
        title: 'CloudSphere - AWS Serverless Hub',
        slug: 'cloudsphere-aws-serverless-hub',
        shortDescription: 'Cloud computing management console visualizing serverless microservices, telemetry, and automated deployment pipelines.',
        detailedDescription: 'Engineered as part of my cloud computing and AWS specialization. Integrates AWS Lambda triggers, S3 media management, and MongoDB Atlas. Provides real-time metrics charts, health monitoring, and IAM access controls.',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
        gallery: [
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000'
        ],
        technologies: ['Node.js', 'Express.js', 'AWS', 'MongoDB', 'Docker', 'React.js'],
        category: 'Full-Stack',
        githubUrl: 'https://github.com/arikmaitra/cloudsphere',
        liveDemoUrl: 'https://cloudsphere-demo.vercel.app',
        featured: true,
        status: 'published',
        order: 3,
        completionDate: '2024'
      },
      {
        title: 'Aura UI - Neo-Brutalist Component Kit',
        slug: 'aura-ui-component-kit',
        shortDescription: 'Accessible, responsive, high-performance UI library crafted with Tailwind CSS and Framer Motion.',
        detailedDescription: 'A production-grade design system and React component suite with zero layout-shift, accessible keyboard navigation, dark/light dynamic theming, and smooth physics-driven transitions.',
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000',
        gallery: [
          'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000'
        ],
        technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'UI/UX Design'],
        category: 'UI/UX Design',
        githubUrl: 'https://github.com/arikmaitra/aura-ui',
        liveDemoUrl: 'https://aura-ui.dev',
        featured: false,
        status: 'published',
        order: 4,
        completionDate: '2024'
      },
      {
        title: 'OmniStore - High Performance E-Commerce API',
        slug: 'omnistore-ecommerce-api',
        shortDescription: 'Scalable RESTful backend service with JWT authentication, cart persistence, payment gateway webhooks, and caching.',
        detailedDescription: 'Production-ready backend architecture built with Express.js and MongoDB. Handles product catalog management, indexed search queries, multi-vendor support, and automated invoice generation.',
        thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
        gallery: [
          'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000'
        ],
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API'],
        category: 'Backend',
        githubUrl: 'https://github.com/arikmaitra/omnistore-api',
        liveDemoUrl: 'https://omnistore-api.onrender.com',
        featured: false,
        status: 'published',
        order: 5,
        completionDate: '2023'
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded');

    // 4. Seed Skills
    await Skill.deleteMany({});
    const skills = [
      // Frontend
      { name: 'React.js', category: 'Frontend Development', proficiency: 92, level: 'Expert', icon: 'Atom', featured: true, order: 1 },
      { name: 'JavaScript (ES6+)', category: 'Frontend Development', proficiency: 95, level: 'Expert', icon: 'Code', featured: true, order: 2 },
      { name: 'HTML5', category: 'Frontend Development', proficiency: 98, level: 'Expert', icon: 'Layout', featured: true, order: 3 },
      { name: 'CSS3', category: 'Frontend Development', proficiency: 95, level: 'Expert', icon: 'Palette', featured: true, order: 4 },
      { name: 'Bootstrap', category: 'Frontend Development', proficiency: 88, level: 'Advanced', icon: 'Box', featured: false, order: 5 },
      { name: 'UI/UX Design', category: 'Frontend Development', proficiency: 86, level: 'Advanced', icon: 'Figma', featured: true, order: 6 },
      { name: 'Frontend Development', category: 'Frontend Development', proficiency: 94, level: 'Expert', icon: 'Monitor', featured: true, order: 7 },

      // Backend
      { name: 'Node.js', category: 'Backend Development', proficiency: 90, level: 'Advanced', icon: 'Server', featured: true, order: 8 },
      { name: 'Express.js', category: 'Backend Development', proficiency: 92, level: 'Expert', icon: 'Cpu', featured: true, order: 9 },
      { name: 'REST API Architecture', category: 'Backend Development', proficiency: 93, level: 'Expert', icon: 'Network', featured: true, order: 10 },

      // Database
      { name: 'MongoDB', category: 'Database', proficiency: 90, level: 'Advanced', icon: 'Database', featured: true, order: 11 },
      { name: 'Mongoose ODM', category: 'Database', proficiency: 91, level: 'Expert', icon: 'Layers', featured: false, order: 12 },

      // Programming Languages
      { name: 'JavaScript', category: 'Programming Languages', proficiency: 95, level: 'Expert', icon: 'FileCode', featured: true, order: 13 },
      { name: 'C++', category: 'Programming Languages', proficiency: 82, level: 'Intermediate', icon: 'Terminal', featured: false, order: 14 },
      { name: 'Python', category: 'Programming Languages', proficiency: 80, level: 'Intermediate', icon: 'Binary', featured: false, order: 15 },

      // Tools & Technologies
      { name: 'Git & GitHub', category: 'Tools and Technologies', proficiency: 90, level: 'Advanced', icon: 'GitBranch', featured: true, order: 16 },
      { name: 'GSAP Animation', category: 'Tools and Technologies', proficiency: 87, level: 'Advanced', icon: 'Sparkles', featured: true, order: 17 },
      { name: 'Tailwind CSS', category: 'Tools and Technologies', proficiency: 96, level: 'Expert', icon: 'Wind', featured: true, order: 18 },
      { name: 'Postman', category: 'Tools and Technologies', proficiency: 89, level: 'Advanced', icon: 'Send', featured: false, order: 19 },

      // Cloud Computing
      { name: 'AWS and Cloud Computing (Learning)', category: 'Cloud Computing', proficiency: 75, level: 'Intermediate', icon: 'Cloud', featured: true, order: 20 },
      { name: 'Docker Containers', category: 'Cloud Computing', proficiency: 70, level: 'Beginner', icon: 'Container', featured: false, order: 21 }
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded');

    // 5. Seed Education
    await Education.deleteMany({});
    const educations = [
      {
        degree: 'B.Tech in Computer Science Engineering',
        institution: 'ICFAI University Dehradun',
        fieldOfStudy: 'Computer Science and Engineering',
        startYear: '2024',
        endYear: '2028',
        expectedGraduation: true,
        grade: 'Current Student',
        description: 'Comprehensive engineering curriculum focusing on Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, and Cloud Architectures.',
        order: 1
      },
      {
        degree: 'Higher Secondary (Senior Secondary Education)',
        institution: 'DAV Public School',
        fieldOfStudy: 'Science & Computer Science',
        startYear: '2022',
        endYear: '2024',
        expectedGraduation: false,
        grade: 'Class of 2024',
        description: 'Completed higher secondary education with strong foundation in Mathematics, Physics, Chemistry, and Computer Science fundamentals.',
        order: 2
      }
    ];
    await Education.insertMany(educations);
    console.log('Education seeded');

    // 6. Seed Experience
    await Experience.deleteMany({});
    const experiences = [
      {
        role: 'Full-Stack Developer Intern & Open Source Builder',
        company: 'Independent / Open Source',
        employmentType: 'Internship',
        location: 'Remote',
        startDate: 'Aug 2024',
        endDate: 'Present',
        current: true,
        description: '• Architecting and developing responsive web applications using React.js, Node.js, and MongoDB.\n• Implemented secure JWT authentication and role-based access control systems.\n• Integrated modern animation libraries (GSAP, Framer Motion) for delightful, accessible user experiences.\n• Exploring cloud computing solutions on AWS to scale application workloads.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'GSAP', 'Tailwind CSS', 'AWS'],
        companyLogo: '',
        order: 1
      },
      {
        role: 'Frontend Engineering Contributor',
        company: 'Campus Tech Society & Hackathons',
        employmentType: 'Part-Time',
        location: 'Dehradun, India',
        startDate: 'Jan 2024',
        endDate: 'Jul 2024',
        current: false,
        description: '• Designed and developed interactive web interfaces for university technical festivals.\n• Collaborated with cross-functional student developer teams to prototype MVP web tools.\n• Mentored peers in modern JavaScript and CSS layout techniques.',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Git'],
        companyLogo: '',
        order: 2
      }
    ];
    await Experience.insertMany(experiences);
    console.log('Experience seeded');

    // 7. Seed Certifications
    await Certification.deleteMany({});
    const certs = [
      {
        title: 'AWS Cloud Practitioner & Cloud Foundations',
        issuer: 'Amazon Web Services / Training',
        issueDate: '2024',
        credentialId: 'AWS-TRN-2024-AM',
        credentialUrl: 'https://aws.amazon.com',
        category: 'Certificates',
        description: 'Foundational understanding of AWS cloud concepts, security, architecture, pricing, and serverless compute services.',
        order: 1
      },
      {
        title: 'Full-Stack Web Development Bootcamp Specialization',
        issuer: 'Online Developer Academy',
        issueDate: '2024',
        credentialId: 'MERN-DEV-98124',
        credentialUrl: '',
        category: 'Certificates',
        description: 'Hands-on mastery of full-stack MERN application engineering, RESTful APIs, Mongoose modeling, and deployment.',
        order: 2
      },
      {
        title: 'Smart India & Campus Hackathon Participant',
        issuer: 'Technical Events & Hackathons',
        issueDate: '2024',
        category: 'Hackathons',
        description: 'Built a real-time collaborative prototype addressing campus logistics within a strict 36-hour sprint.',
        order: 3
      }
    ];
    await Certification.insertMany(certs);
    console.log('Certifications seeded');

    // 8. Seed Messages
    await Message.deleteMany({});
    await Message.create({
      name: 'Sarah Jenkins',
      email: 'sarah.j@techrecruiter.com',
      subject: 'Frontend / Full-Stack Developer Opportunity',
      message: 'Hi Arik, loved your Lamp Login Page and clean portfolio UI! We are looking for an ambitious MERN developer for our modern web team. Would love to schedule a quick chat!',
      isRead: false
    });

    // 9. Seed Website Settings
    await WebsiteSettings.deleteMany({});
    await WebsiteSettings.create({
      siteName: 'Arik Maitra - Portfolio',
      logoText: 'ARIK.',
      metaTitle: 'Arik Maitra | Full-Stack MERN Developer',
      metaDescription: 'Official portfolio of Arik Maitra, Computer Science Engineering student and aspiring Full-Stack MERN Developer building modern, scalable digital experiences.',
      keywords: ['Arik Maitra', 'Full-Stack Developer', 'MERN Stack Developer', 'React.js', 'Node.js', 'Engineering Student Portfolio'],
      footerText: 'Designed & Engineered by Arik Maitra. Built with MERN Stack, Tailwind CSS & Framer Motion.',
      contactEmail: 'arikmaitra071@gmail.com',
      socialLinks: {
        github: 'https://github.com/arikmaitra',
        linkedin: 'https://linkedin.com/in/arikmaitra',
        twitter: 'https://twitter.com/arikmaitra'
      }
    });

    console.log('All seed data completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export const checkAndAutoSeed = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('Database empty, performing automatic initial seed...');
      await seedDatabase();
    } else {
      console.log('Database already initialized.');
    }
  } catch (err) {
    console.error('Check seed error:', err.message);
  }
};

// If run directly via `node seed.js`
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  connectDB().then(async () => {
    await seedDatabase();
    process.exit(0);
  });
}
