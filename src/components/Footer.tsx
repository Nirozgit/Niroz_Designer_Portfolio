import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="py-12 bg-[#F7F7F5] border-t border-[#DDDDD8] text-xs font-mono text-[#777777]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left */}
          <div>
            <span className="text-[#111111] font-semibold">© {new Date().getFullYear()} {personalInfo.name}</span>
          </div>

          {/* Center */}
          <div className="flex items-center gap-4">
            <span className="text-[#111111] font-medium">{personalInfo.role}</span>
            <span className="text-[#DDDDD8]">|</span>
            <div className="flex items-center gap-3">
              {personalInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#111111] transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Back to top */}
          <button
            id="back-to-top-button"
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 text-[#111111] hover:text-[#555555] transition-colors cursor-pointer font-semibold uppercase tracking-wider"
          >
            <span>Back to top ↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
