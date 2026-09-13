import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data/portfolioData';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Determine prev and next projects
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <article
      id="project-detail-view"
      className="pt-28 md:pt-36 pb-28 min-h-screen bg-[#F7F7F5] text-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Navigation Bar / Back */}
        <div className="flex items-center justify-between pb-8 mb-10 border-b border-[#DDDDD8]">
          <button
            id="back-to-portfolio-button"
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#111111] hover:text-[#777777] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← Back to Selected Work</span>
          </button>

          <div className="text-xs font-mono text-[#777777] tracking-wider uppercase">
            <span>PROJECT {project.number} OF {projects.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-widest text-[#777777] uppercase mb-4">
            <span className="text-[#111111] font-semibold">{project.number}</span>
            <span>/</span>
            <span>{project.category}</span>
            <span>/</span>
            <span>{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight text-[#111111] leading-[0.98] mb-6">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-[#555555] font-normal leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* Hero Full-Bleed Showcase Image */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#E8E8E4] border border-[#DDDDD8] mb-16 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.12)]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-[750px] object-cover"
          />
        </div>

        {/* 4-Column Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-[#DDDDD8] mb-20 text-sm">
          <div>
            <span className="block text-xs font-mono text-[#777777] uppercase tracking-wider mb-1.5">
              Client
            </span>
            <span className="font-semibold text-[#111111] text-base">{project.client}</span>
          </div>

          <div>
            <span className="block text-xs font-mono text-[#777777] uppercase tracking-wider mb-1.5">
              Role & Responsibility
            </span>
            <span className="font-semibold text-[#111111] text-base">{project.role}</span>
          </div>

          <div>
            <span className="block text-xs font-mono text-[#777777] uppercase tracking-wider mb-1.5">
              Duration
            </span>
            <span className="font-semibold text-[#111111] text-base">{project.duration}</span>
          </div>

          <div>
            <span className="block text-xs font-mono text-[#777777] uppercase tracking-wider mb-1.5">
              Year
            </span>
            <span className="font-semibold text-[#111111] text-base">{project.year}</span>
          </div>
        </div>

        {/* Deliverables tags */}
        <div className="mb-20">
          <span className="block text-xs font-mono text-[#777777] uppercase tracking-widest mb-3">
            Core Deliverables
          </span>
          <div className="flex flex-wrap gap-2.5">
            {project.deliverables.map((item, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full border border-[#DDDDD8] bg-white text-xs font-medium text-[#222222]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* In-Depth Case Study Sections */}
        <div className="space-y-20 max-w-4xl">
          {/* Overview */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#777777] uppercase tracking-widest">
                01 / OVERVIEW
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#111111] mt-2">
                The Assignment
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
                {project.description}
              </p>
            </div>
          </section>

          {/* The Challenge */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-[#DDDDD8]">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#777777] uppercase tracking-widest">
                02 / THE CHALLENGE
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#111111] mt-2">
                Problem & Constraints
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </section>

          {/* The Approach */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-[#DDDDD8]">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#777777] uppercase tracking-widest">
                03 / THE APPROACH
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#111111] mt-2">
                Strategy & Ideation
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
                {project.approach}
              </p>
            </div>
          </section>

          {/* The Solution */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-[#DDDDD8]">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#777777] uppercase tracking-widest">
                04 / THE SOLUTION
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#111111] mt-2">
                System & Execution
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-[#444444] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Results & Impact */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-12 border-t border-[#DDDDD8]">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#777777] uppercase tracking-widest">
                05 / OUTCOME
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-[#111111] mt-2">
                Results & Metrics
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="p-6 rounded-xl bg-white border border-[#DDDDD8] shadow-xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-base sm:text-lg text-[#111111] font-medium leading-relaxed">
                    {project.results}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Gallery / Supporting Visual Artifacts */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#DDDDD8]">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10">
              <h3 className="text-3xl font-bold tracking-tight text-[#111111]">
                Visual Artifacts & Spreads
              </h3>
              <span className="text-xs font-mono text-[#777777] uppercase tracking-wider">
                DOCUMENTATION GALLERY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className={`space-y-3 ${idx === 0 ? 'md:col-span-2' : 'md:col-span-1'}`}
                >
                  <div className="overflow-hidden rounded-xl bg-[#EBEBE8] border border-[#DDDDD8]">
                    <img
                      src={item.url}
                      alt={item.caption}
                      loading="lazy"
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <p className="text-xs font-mono text-[#666666] px-1">
                    [ FIG. {project.number}.{idx + 1} ] — {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous & Next Project Navigation */}
        <div className="mt-28 pt-12 border-t border-[#DDDDD8]">
          <span className="block text-xs font-mono text-[#777777] uppercase tracking-widest mb-6">
            Continue Reading
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous */}
            <button
              id="prev-project-card"
              onClick={() => onSelectProject(prevProject)}
              className="group text-left p-6 sm:p-8 rounded-xl bg-white border border-[#DDDDD8] hover:border-[#111111] transition-all cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#777777] uppercase mb-2">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Previous Project</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#444444] transition-colors">
                {prevProject.title}
              </h4>
              <span className="text-xs text-[#777777] block mt-1">{prevProject.category}</span>
            </button>

            {/* Next */}
            <button
              id="next-project-card"
              onClick={() => onSelectProject(nextProject)}
              className="group text-left p-6 sm:p-8 rounded-xl bg-white border border-[#DDDDD8] hover:border-[#111111] transition-all cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#777777] uppercase mb-2">
                <span>Next Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#444444] transition-colors">
                {nextProject.title}
              </h4>
              <span className="text-xs text-[#777777] block mt-1">{nextProject.category}</span>
            </button>
          </div>
        </div>

        {/* Return Button */}
        <div className="mt-16 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#111111] text-[#F7F7F5] text-sm font-semibold hover:bg-[#333333] transition-colors cursor-pointer shadow-sm"
          >
            <span>Return to Portfolio Grid</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
