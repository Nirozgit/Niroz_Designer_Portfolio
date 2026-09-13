import React, { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { services } from '../data/portfolioData';

export const Services: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="services"
      className="py-24 md:py-32 border-b border-[#DDDDD8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-16 border-b border-[#DDDDD8]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
              [ 02 — CAPABILITIES ]
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05]">
              What I do
            </h2>
          </div>
          <div className="md:max-w-xs text-sm text-[#666666] leading-relaxed">
            Crafting enduring digital solutions at the intersection of aesthetic discipline, behavioral psychology, and engineering precision.
          </div>
        </div>

        {/* Editorial Service List with Horizontal Separators */}
        <div className="divide-y divide-[#DDDDD8]">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={service.number}
                id={`service-row-${service.number}`}
                onClick={() => toggleExpand(index)}
                className="group py-8 sm:py-10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8">
                  {/* Left: Number & Service Name */}
                  <div className="flex items-baseline gap-6 md:gap-12 md:w-1/2">
                    <span className="font-mono text-sm sm:text-base font-semibold text-[#888888] group-hover:text-[#111111] transition-colors">
                      {service.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111] group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-3">
                      <span>{service.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#111111] hidden sm:inline-block" />
                    </h3>
                  </div>

                  {/* Right: Short Description & Toggle */}
                  <div className="md:w-1/2 flex items-start justify-between gap-6 pl-10 md:pl-0">
                    <p className="text-sm sm:text-base text-[#666666] group-hover:text-[#222222] transition-colors leading-relaxed">
                      {service.description}
                    </p>
                    <button
                      type="button"
                      aria-label="Toggle details"
                      className="p-1 text-[#777777] group-hover:text-[#111111] shrink-0 transition-colors"
                    >
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Deliverables Pill Sub-list */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[#E8E8E4] pl-10 md:pl-20">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#777777] block mb-3">
                      Key Deliverables & Artefacts
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((deliv, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-3.5 py-1.5 rounded-full bg-white border border-[#DDDDD8] text-xs font-medium text-[#222222]"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#777777] gap-4">
          <span>ALL SERVICES ARE TAILORED TO PROJECT SCOPE & TIMELINE</span>
          <span className="text-[#111111] font-semibold">CUSTOM PACKAGES AVAILABLE FOR STARTUPS & AGENCIES</span>
        </div>
      </div>
    </section>
  );
};
