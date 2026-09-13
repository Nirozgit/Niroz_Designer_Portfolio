import React from 'react';
import { processSteps } from '../data/portfolioData';

export const Process: React.FC = () => {
  return (
    <section
      id="process"
      className="py-24 md:py-32 border-b border-[#DDDDD8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-16 border-b border-[#DDDDD8]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
              [ 04 — METHODOLOGY ]
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05]">
              How I work
            </h2>
          </div>
          <div className="md:max-w-xs text-sm text-[#666666] leading-relaxed">
            A battle-tested 4-phase creative framework ensuring strategic alignment, swift execution, and zero surprises.
          </div>
        </div>

        {/* Process Steps: Desktop Horizontal Editorial Grid / Mobile Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 pt-12">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              id={`process-step-${step.number}`}
              className="relative flex flex-col justify-between pt-6 border-t-2 border-[#111111] md:min-h-[300px] group"
            >
              <div>
                {/* Step Number */}
                <span className="font-mono text-xs font-bold tracking-widest text-[#777777] uppercase block mb-4">
                  STAGE {step.number}
                </span>

                {/* Step Title */}
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] mb-3 group-hover:text-[#444444] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm font-medium text-[#111111] mb-3 leading-snug">
                  {step.description}
                </p>

                {/* In-depth detail */}
                <p className="text-xs text-[#666666] leading-relaxed">
                  {step.detail}
                </p>
              </div>

              {/* Bottom indicator */}
              <div className="pt-8 mt-auto flex items-center gap-2">
                <div className="h-1 w-6 bg-[#111111] group-hover:w-12 transition-all duration-300" />
                <span className="text-[10px] font-mono text-[#888888] uppercase">PHASE 0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
