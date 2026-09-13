import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  return (
    <article
      id={`project-card-${project.slug}`}
      onClick={() => onSelect(project)}
      data-cursor="VIEW"
      className="group cursor-pointer flex flex-col focus:outline-none transition-all duration-300"
    >
      {/* Project Image Container */}
      <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-[#E8E8E4] border border-[#DDDDD8] mb-5">
        <div className={`w-full ${project.aspectRatio || 'aspect-[4/3]'} overflow-hidden relative`}>
          <img
            src={project.image}
            alt={project.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />

          {/* Hover Overlay with View Badge */}
          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-6">
            <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] text-[#F7F7F5] text-xs font-semibold tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Small Year Tag on image */}
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#111111]/70 backdrop-blur-xs text-white text-[11px] font-mono tracking-wider">
          {project.year}
        </div>
      </div>

      {/* Editorial Meta & Title */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          {/* Number & Category */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#777777] uppercase">
            <span className="font-semibold text-[#111111]">{project.number}</span>
            <span>—</span>
            <span>{project.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] group-hover:text-[#444444] transition-colors flex items-center gap-2">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#111111]" />
          </h3>

          {/* Short description */}
          <p className="text-sm text-[#666666] line-clamp-2 max-w-xl font-normal leading-relaxed pt-1">
            {project.description}
          </p>
        </div>
      </div>
    </article>
  );
};
