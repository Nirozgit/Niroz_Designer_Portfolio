import React from 'react';
import { testimonials } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 border-b border-[#DDDDD8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="pb-12 md:pb-16 border-b border-[#DDDDD8] mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
            [ 05 — ENDORSEMENTS ]
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05]">
            What clients say
          </h2>
        </div>

        {/* Editorial Testimonial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {testimonials.map((item, index) => (
            <div
              key={index}
              id={`testimonial-${index}`}
              className="flex flex-col justify-between space-y-8"
            >
              <p className="text-lg sm:text-xl text-[#222222] font-normal leading-relaxed tracking-tight">
                “{item.quote}”
              </p>

              <div className="pt-6 border-t border-[#DDDDD8]">
                <span className="block font-bold text-sm text-[#111111] tracking-tight">
                  {item.author}
                </span>
                <span className="block text-xs text-[#666666] mt-0.5 font-normal">
                  {item.role}, {item.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
