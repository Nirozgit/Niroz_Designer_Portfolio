import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { projects } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'E-Commerce / UI', value: 'e-commerce' },
    { label: 'Brand & Identity', value: 'branding' },
    { label: 'Art Direction', value: 'direction' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'e-commerce') return p.category.toLowerCase().includes('commerce') || p.category.toLowerCase().includes('ui/ux');
    if (filter === 'branding') return p.category.toLowerCase().includes('brand') || p.category.toLowerCase().includes('identity');
    if (filter === 'direction') return p.category.toLowerCase().includes('art') || p.category.toLowerCase().includes('campaign') || p.category.toLowerCase().includes('direction');
    return true;
  });

  return (
    <section
      id="work"
      className="py-24 md:py-32 border-b border-[#DDDDD8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-16 border-b border-[#DDDDD8]">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
              [ 01 — PORTFOLIO ]
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05]">
              Selected Work
            </h2>
          </div>

          <div className="md:max-w-xs text-sm text-[#666666] leading-relaxed">
            A selection of projects across digital design, branding, campaigns, and creative systems.
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                filter === cat.value
                  ? 'bg-[#111111] text-[#F7F7F5] shadow-xs'
                  : 'bg-transparent text-[#666666] hover:text-[#111111] hover:bg-[#EBEBE8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto hidden sm:block text-xs font-mono text-[#888888]">
            SHOWING {filteredProjects.length} OF {projects.length} WORKS
          </span>
        </div>

        {/* Editorial Project Grid: 2 columns on desktop with generous spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-24">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={project}
                onSelect={onSelectProject}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* Notice on dummy images & custom work note */}
        <div className="mt-20 pt-8 border-t border-[#DDDDD8] flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#777777] gap-4">
          <span>ALL PROJECTS ARE FULL CASE STUDIES WITH WIREFRAMES & SPECS</span>
          <span className="text-[#111111] font-medium">CLICK ANY PROJECT TO READ IN-DEPTH STUDY ↗</span>
        </div>
      </div>
    </section>
  );
};
