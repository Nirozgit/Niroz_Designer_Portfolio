import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { projects } from './data/portfolioData';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { Services } from './components/Services';
import { About } from './components/About';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ProjectDetail } from './components/ProjectDetail';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Handle URL hash routing (e.g. #magicboox or #work)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setSelectedProject(null);
        return;
      }

      // Check if hash matches a project slug
      const found = projects.find((p) => p.slug === hash || `work/${p.slug}` === hash);
      if (found) {
        setSelectedProject(found);
      } else {
        setSelectedProject(null);
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // IntersectionObserver to highlight active section in Navbar
  useEffect(() => {
    if (selectedProject) return;

    const sections = ['hero', 'work', 'services', 'about', 'process', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProject]);

  const handleSelectProject = (project: Project) => {
    window.location.hash = `work/${project.slug}`;
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWork = () => {
    window.location.hash = 'work';
    setSelectedProject(null);
    setTimeout(() => {
      const elem = document.getElementById('work');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleNavigate = (sectionId: string) => {
    if (selectedProject) {
      setSelectedProject(null);
      window.location.hash = sectionId;
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.location.hash = sectionId;
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111111] selection:bg-[#111111] selection:text-[#F7F7F5] relative overflow-x-hidden">
      {/* Desktop Custom Cursor with View Badge */}
      <CustomCursor />

      {/* Sticky Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDetailView={!!selectedProject}
        onBackToWork={handleBackToWork}
      />

      {/* Main Content: Case study if a project is selected, else full editorial single-page portfolio */}
      {selectedProject ? (
        <main id="case-study-main">
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToWork}
            onSelectProject={handleSelectProject}
          />
        </main>
      ) : (
        <main id="portfolio-main">
          <Hero
            onNavigateToWork={() => handleNavigate('work')}
            onNavigateToContact={() => handleNavigate('contact')}
          />
          <SelectedWork onSelectProject={handleSelectProject} />
          <Services />
          <About />
          <Process />
          <Testimonials />
          <ContactCTA />
        </main>
      )}

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
