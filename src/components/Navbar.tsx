import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isDetailView?: boolean;
  onBackToWork?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isDetailView = false,
  onBackToWork,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', id: 'work' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (isDetailView && onBackToWork) {
      onBackToWork();
      setTimeout(() => {
        onNavigate(id);
      }, 100);
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#DDDDD8] py-3.5 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand / Logo */}
          <div className="flex items-center gap-4">
            {isDetailView ? (
              <button
                id="nav-back-button"
                onClick={onBackToWork}
                className="group flex items-center gap-2 text-sm font-medium tracking-tight text-[#111111] hover:text-[#777777] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-semibold tracking-wider text-xs uppercase">Back to Work</span>
              </button>
            ) : (
              <button
                id="nav-logo-button"
                onClick={() => handleLinkClick('hero')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <span className="block font-bold tracking-tight text-base sm:text-lg text-[#111111] group-hover:opacity-75 transition-opacity">
                  {personalInfo.name}
                </span>
                <span className="block text-[11px] uppercase tracking-wider text-[#777777] font-medium">
                  {personalInfo.role}
                </span>
              </button>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && !isDetailView;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm tracking-wide transition-colors relative py-1 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-[#111111] font-semibold'
                      : 'text-[#555555] hover:text-[#111111] font-normal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Availability Badge */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              id="nav-availability-badge"
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#DDDDD8] bg-white/60 hover:bg-white text-xs font-medium text-[#111111] transition-all cursor-pointer shadow-xs hover:border-[#111111]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="whitespace-nowrap">Available for work</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              id="mobile-availability-indicator"
              onClick={() => handleLinkClick('contact')}
              className="flex sm:hidden items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#DDDDD8] bg-white text-[11px] font-medium"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Available</span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:text-[#555555] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] bg-[#F7F7F5] z-40 p-6 flex flex-col justify-between md:hidden border-t border-[#DDDDD8]"
          >
            <div className="space-y-6 pt-4">
              <span className="text-xs uppercase tracking-widest text-[#777777] font-semibold">
                Menu
              </span>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-left text-3xl font-semibold tracking-tight text-[#111111] hover:translate-x-2 transition-transform cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#DDDDD8] pt-6 pb-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-[#111111]">{personalInfo.status}</span>
              </div>
              <p className="text-xs text-[#777777]">
                Based in {personalInfo.location} · Working globally
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#111111] hover:underline"
              >
                {personalInfo.email}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
