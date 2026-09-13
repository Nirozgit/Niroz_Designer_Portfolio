import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 md:py-32 border-b border-[#DDDDD8] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#DDDDD8] mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
            [ 03 — BIOGRAPHY ]
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05]">
            A little about me.
          </h2>
        </div>

        {/* Editorial Layout: Left Narrative & Metadata, Right Studio Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Editorial Text & Structured Metadata */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] leading-[1.3] tracking-tight">
                I'm a multidisciplinary designer focused on creating meaningful digital experiences, visual systems, and campaigns.
              </p>
              <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
                I enjoy combining strategy, visual design, and usability to turn complex ideas into clear, engaging experiences. Over the past five years, I have collaborated with design studios, venture-backed tech startups, and independent cultural brands across Europe, Asia, and North America.
              </p>
              <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
                My approach is rooted in typographic discipline and visual restraint: stripping away decorative noise so the essential story and function can resonate with confidence.
              </p>
            </div>

            {/* Editorial Metadata Table (No Cards!) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-[#DDDDD8]">
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-1.5">
                  Location
                </span>
                <span className="text-sm font-semibold text-[#111111] block">
                  {personalInfo.location}
                </span>
                <span className="text-xs text-[#777777]">GMT +5:45</span>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-1.5">
                  Experience
                </span>
                <span className="text-sm font-semibold text-[#111111] block">
                  {personalInfo.experienceYears}
                </span>
                <span className="text-xs text-[#777777]">Design & Direction</span>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-1.5">
                  Core Focus
                </span>
                <span className="text-sm font-semibold text-[#111111] block">
                  {personalInfo.focus}
                </span>
                <span className="text-xs text-[#777777]">Digital Systems</span>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-1.5">
                  Availability
                </span>
                <span className="text-sm font-semibold text-emerald-700 block">
                  {personalInfo.availability}
                </span>
                <span className="text-xs text-[#777777]">Freelance / Collab</span>
              </div>
            </div>

            {/* Design Principles / Ethos */}
            <div className="pt-8 border-t border-[#DDDDD8] space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777777] block">
                Design Ethos
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-[#111111] mb-1">Purpose Over Trend</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Rejecting short-lived aesthetics in favor of durable visual hierarchy that ages with grace.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111] mb-1">Typographic Rigor</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Obsessing over optical kerning, line-height proportions, and mathematical reading scales.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111111] mb-1">Human-Centric Fluidity</h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Every animation, transition, and micro-gesture exists strictly to orient and delight the user.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Editorial Studio Imagery */}
          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden rounded-2xl bg-[#E8E8E4] border border-[#DDDDD8] shadow-[0_8px_30px_-15px_rgba(0,0,0,0.1)]">
              <img
                src={personalInfo.aboutImage}
                alt="Design Studio Environment"
                loading="lazy"
                className="w-full h-auto aspect-[3/4] object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-[#777777] px-1">
              <span>FIG. 01 — STUDIO ARCHIVE</span>
              <span>WORKSPACE & PROCESS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
