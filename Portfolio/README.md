# Arik Maitra — Premium Full-Stack Portfolio & Dynamic Admin CMS

> A high-performance, modern developer portfolio and personal content management system (CMS) engineered with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**, **Tailwind CSS**, and **Framer Motion**.

Designed with the minimalist, futuristic aesthetic of top engineering organizations like **Linear, Apple, and Vercel**, this application functions as both an Awwwards-worthy public portfolio for recruiters and visitors, and an administrative control panel for the developer.

---

## 🌟 Key Architecture & Highlights

### 1. Public Portfolio (`/`)
- **Sticky Navigation Bar (`ARIK.`)**:
  - Smooth section scrolling with scrollspy active navigation indicator.
  - Dark / Light mode toggle with persistent state.
  - Direct download shortcut for the developer's resume.
  - Mobile responsive drawer menu.
  - Direct shortcut into the private Admin Portal.
- **Hero Section**:
  - Dynamic cycling typewriter animation: *Full-Stack Developer | MERN Stack Developer | Frontend Developer | Tech Enthusiast*.
  - Developer Workstation Terminal with interactive code snippet reflecting live profile data.
  - Quick metrics pills: Projects count, MERN core badges, graduation timeline.
- **About Me Section**:
  - Split layout with personal narrative, career goals, current learning trajectory (AWS cloud, Docker, system design).
  - Categorized interests & hobbies tags (*Cricket, Badminton, Technology & Software Development, Competitive Programming*).
  - Academic snapshot (B.Tech in Computer Science Engineering at **ICFAI University Dehradun**, Expected Graduation 2028; Higher Secondary at **DAV Public School**, 2024).
- **Skills & Tech Stack Section**:
  - Dynamically loaded from database.
  - Filterable by categories: *Frontend Development, Backend Development, Database, Programming Languages, Tools and Technologies, Cloud Computing*.
  - Mastery progress indicators and level badges (*Expert, Advanced, Intermediate*).
- **Projects Showcase**:
  - Dynamically fetched from MongoDB (strictly hides draft projects).
  - Search by project title, description, or stack.
  - Category filters (*Full-Stack, MERN Stack, Frontend, Backend, UI/UX Design*).
  - **Special Featured Spotlight: LAMP LOGIN PAGE**:
    - Embedded interactive demo honoring the GSAP Draggable and MorphSVG physics-based hanging lamp concept.
    - Pull the lamp cord to dynamically illuminate ambient lighting and reveal the glassmorphic authentication interface!
  - Project Cards with Cover thumbnails, tech tags, GitHub repository links, and Live Demo buttons.
  - Rich **View Details Modal** with deep-dive architectural overviews and screenshot gallery.
- **Experience Timeline**:
  - Vertical glowing timeline with milestone nodes, roles, company names, employment types (*Internship, Full-time, etc.*), start/end dates, "Currently Working" animated status, and technology chips.
- **Education Section**:
  - Academic cards for undergraduate degree and schooling with graduation status.
- **Achievements & Certifications**:
  - Filterable grid for *Certificates, Hackathons, Achievements, Competitions, Workshops*, with credential verification links.
- **Contact Section & Inbox Submission**:
  - Interactive contact form with real-time feedback, storing submissions directly into MongoDB.
  - Direct contact cards with email (`arikmaitra071@gmail.com`), location, and social media links.
- **Footer**:
  - Minimalist footer with quick navigation, social profiles, and smooth "Back to Top" trigger.

---

### 2. Private Admin Dashboard (`/admin`)
- **Protected Authentication**:
  - Route guard redirects unauthenticated users to `/admin/login`.
  - Secure bcrypt password verification with JSON Web Tokens (JWT).
  - One-click "Auto-fill Demo Credentials" button for testing.
- **Dashboard Overview**:
  - Live analytics counters: Total Projects, Published Projects, Draft Projects, Skills, Experiences, Certifications, and Contact Messages.
  - Category distribution breakdowns and recent activity feeds.
- **Projects CRUD Manager**:
  - Create, read, edit, and delete projects.
  - File upload engine with instant thumbnail preview.
  - Toggle between `published` and `draft` status (drafts never appear on the public site).
  - Star projects to mark them as `featured`.
- **Skills CRUD Manager**:
  - Add and update skills with category assignment, proficiency sliders (10-100%), and difficulty levels.
- **Experience Timeline CRUD**:
  - Add roles, companies, dates, and toggle "I currently work here".
- **Education CRUD**:
  - Manage degrees, schools, and expected graduation years.
- **Certifications & Achievements CRUD**:
  - Record certifications, hackathon recognitions, and credential URLs.
- **Profile & Bio CMS**:
  - Edit name, professional title, hero subheading, cycling typewriter titles, about me narrative, career goals, current learning topics, profile picture, resume file path, and social media links.
- **Message Inbox**:
  - View all inquiries submitted through the public website.
  - Toggle read/unread statuses.
  - Single-click "Reply via Email" launching pre-filled mail client.
  - Delete messages with confirmation dialog.
- **Global Website Settings**:
  - Adjust navbar brand text, website title, SEO meta tags, and footer text.

---

## 💻 Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, React Router v7, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js, JWT, bcryptjs, Multer, Helmet, Morgan, CORS |
| **Database** | MongoDB, Mongoose ODM |
| **Design System** | Dark-first charcoal aesthetic, glassmorphism, responsive grid & dot mesh patterns |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** running locally on port 27017 or a **MongoDB Atlas URI**

### 2. Clone and Setup Environment
Navigate to the root directory and ensure the `.env` file exists in `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=super_secure_portfolio_jwt_secret_key_2026_arik_maitra
ADMIN_EMAIL=arikmaitra071@gmail.com
ADMIN_PASSWORD=AdminPassword123!
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Install Dependencies
```bash
# Install backend packages
npm install --prefix backend

# Install frontend packages
npm install --prefix frontend
```

### 4. Seed Initial Content & Admin User
Pre-populates the database with Arik Maitra's full profile, skills, education, lamp project, and admin credentials:
```bash
npm run seed --prefix backend
```

### 5. Run the Application

#### Option A: Run Backend Server
```bash
npm run dev --prefix backend
# Server starts on http://localhost:5000
```

#### Option B: Run Frontend Development Server
```bash
npm run dev --prefix frontend
# Frontend runs on http://localhost:5173
```

---

## 🔐 Default Admin Credentials

| Parameter | Value |
|---|---|
| **Admin Route** | [http://localhost:5173/admin](http://localhost:5173/admin) |
| **Email** | `arikmaitra071@gmail.com` *(or `admin@gmail.com`)* |
| **Password** | `AdminPassword123!` |

*(You can also click the **"Auto-fill Demo Credentials"** button on the `/admin/login` page to sign in with one click).*

---

## 📡 REST API Endpoints Overview

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Admin authentication |
| `GET` | `/api/auth/me` | Protected | Current admin session data |
| `GET` | `/api/profile` | Public | Public profile and bio |
| `PUT` | `/api/profile` | Protected | Update profile information |
| `GET` | `/api/projects` | Public | Published projects with filters |
| `GET` | `/api/projects/admin/all` | Protected | All projects (including drafts) |
| `POST` | `/api/projects` | Protected | Create new project |
| `PUT` | `/api/projects/:id` | Protected | Update project |
| `DELETE` | `/api/projects/:id` | Protected | Delete project |
| `GET` | `/api/skills` | Public | Tech stack list & categories |
| `POST` | `/api/skills` | Protected | Add skill |
| `GET` | `/api/experiences` | Public | Experience timeline |
| `GET` | `/api/education` | Public | Academic history |
| `GET` | `/api/certifications` | Public | Credentials & hackathons |
| `POST` | `/api/messages` | Public | Submit contact message |
| `GET` | `/api/messages` | Protected | Admin messages inbox |
| `POST` | `/api/upload` | Protected | Upload project or profile media |
| `GET` | `/api/stats` | Protected | Analytics overview metrics |

---

## 📦 Deployment Instructions

### Backend (Render / Railway / AWS EC2)
1. Set the Root Directory to `backend`.
2. Set Build Command: `npm install`.
3. Set Start Command: `node server.js`.
4. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV=production`.

### Frontend (Vercel / Netlify)
1. Set Root Directory to `frontend`.
2. Build Command: `npm run build`.
3. Output Directory: `dist`.
4. Set Environment Variable: `VITE_API_BASE_URL` pointing to your deployed backend domain.

---

### Author
**Arik Maitra**  
*Full-Stack MERN Developer & Computer Science Engineering Student*  
- Email: [arikmaitra071@gmail.com](mailto:arikmaitra071@gmail.com)  
- ICFAI University Dehradun (Class of 2028)
