import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/public/HeroSection';
import AboutSection from '../components/public/AboutSection';
import SkillsSection from '../components/public/SkillsSection';
import ProjectsSection from '../components/public/ProjectsSection';
import ExperienceSection from '../components/public/ExperienceSection';
import EducationSection from '../components/public/EducationSection';
import AchievementsSection from '../components/public/AchievementsSection';
import ContactSection from '../components/public/ContactSection';
import api from '../api/client';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          profileRes,
          projectsRes,
          skillsRes,
          expRes,
          eduRes,
          certsRes,
          settingsRes
        ] = await Promise.all([
          api.get('/profile').catch(() => ({ data: { data: null } })),
          api.get('/projects').catch(() => ({ data: { data: [] } })),
          api.get('/skills').catch(() => ({ data: { data: [] } })),
          api.get('/experiences').catch(() => ({ data: { data: [] } })),
          api.get('/education').catch(() => ({ data: { data: [] } })),
          api.get('/certifications').catch(() => ({ data: { data: [] } })),
          api.get('/settings').catch(() => ({ data: { data: null } }))
        ]);

        if (profileRes.data?.data) setProfile(profileRes.data.data);
        if (projectsRes.data?.data) setProjects(projectsRes.data.data);
        if (skillsRes.data?.data) setSkills(skillsRes.data.data);
        if (expRes.data?.data) setExperiences(expRes.data.data);
        if (eduRes.data?.data) setEducation(eduRes.data.data);
        if (certsRes.data?.data) setCertifications(certsRes.data.data);
        if (settingsRes.data?.data) setSettings(settingsRes.data.data);
      } catch (err) {
        console.error('Error fetching portfolio content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-brand-400">
            A
          </div>
        </div>
        <p className="text-xs font-mono text-slate-400 tracking-wider uppercase animate-pulse">
          Loading Portfolio Engine...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-brand-500/30 selection:text-white">
      <Navbar profile={profile} settings={settings} />
      
      <main className="flex-1">
        <HeroSection profile={profile} settings={settings} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <EducationSection education={education} />
        <AchievementsSection certifications={certifications} />
        <ContactSection profile={profile} settings={settings} />
      </main>

      <Footer profile={profile} settings={settings} />
    </div>
  );
}
