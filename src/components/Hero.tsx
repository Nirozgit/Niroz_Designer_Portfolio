import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onNavigateToWork: () => void;
  onNavigateToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToWork, onNavigateToContact }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col justify-center border-b border-[#DDDDD8]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        {/* Editorial Personal Info Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 border-b border-[#DDDDD8] mb-12 text-xs uppercase tracking-widest text-[#777777]"
        >
          <div>
            <span className="text-[#111111] font-semibold block">{personalInfo.name}</span>
            <span>{personalInfo.role}</span>
          </div>
          <div>
            <span className="text-[#111111] font-medium block">Location</span>
            <span>{personalInfo.location}</span>
          </div>
          <div>
            <span className="text-[#111111] font-medium block">Scope</span>
            <span>Working Globally / Remote</span>
          </div>
          <div>
            <span className="text-[#111111] font-medium block">Status</span>
            <span className="text-emerald-700 font-medium">● {personalInfo.status}</span>
          </div>
        </motion.div>

        {/* Two-Column Editorial Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Massive Headline, Intro, & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-extrabold tracking-[-0.035em] text-[#111111] leading-[1.04] mb-8 select-none"
            >
              From Concept to Creation,
              <br />
              <span className="italic font-serif font-normal text-[#222222]">Let’s Build</span> Your Brand.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#555555] font-normal leading-relaxed max-w-xl mb-10"
            >
              {personalInfo.intro}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2"
            >
              <button
                id="hero-cta-primary"
                onClick={onNavigateToContact}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#111111] text-[#F7F7F5] rounded-full text-sm font-semibold tracking-wide hover:bg-[#333333] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Let's work together</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                id="hero-cta-secondary"
                onClick={onNavigateToWork}
                className="group inline-flex items-center gap-2 px-3 py-4 text-sm font-semibold text-[#111111] hover:text-[#555555] transition-colors cursor-pointer border-b border-[#111111] hover:border-[#555555]"
              >
                <span>View selected work</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Large Editorial Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group overflow-hidden rounded-2xl bg-[#EBEBE8] border border-[#DDDDD8] shadow-[0_10px_35px_-15px_rgba(0,0,0,0.12)]">
              <img
                id="hero-portrait-image"
                src={personalInfo.portraitImage}
                alt={`${personalInfo.name} Portrait`}
                loading="eager"
                className="w-full h-auto aspect-[4/5] object-cover filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center">
                <span>{personalInfo.name}</span>
                <span>STUDIO · 2026</span>
              </div>
            </div>

            {/* Subtle floating caption */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#777777] px-1 font-mono">
              <span>FIG. 00 — CREATIVE PROFILE</span>
              <span>KATHMANDU / REMOTE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
