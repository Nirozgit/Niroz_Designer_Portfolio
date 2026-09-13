import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const ContactCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowInquiryForm(false);
      setFormData({ name: '', email: '', message: '', budget: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 border-b border-[#DDDDD8] scroll-mt-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Tag */}
        <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-4">
          [ 06 — INQUIRIES & COLLABORATION ]
        </span>

        {/* Massive Editorial Headline */}
        <div className="mb-14 max-w-5xl">
          <h2 className="text-5xl sm:text-7xl lg:text-[96px] font-extrabold tracking-[-0.035em] text-[#111111] leading-[0.95] mb-4">
            Have a project in mind?
          </h2>
          <p className="text-4xl sm:text-6xl lg:text-7xl font-light italic font-serif text-[#555555] tracking-tight">
            Let's make something great.
          </p>
        </div>

        {/* Action Controls & Email */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 mb-16">
          <a
            id="contact-mailto-button"
            href={`mailto:${personalInfo.email}?subject=Project%20Inquiry`}
            className="group inline-flex items-center gap-3 px-8 py-5 bg-[#111111] text-[#F7F7F5] rounded-full text-base font-semibold tracking-wide hover:bg-[#333333] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* Quick Copy Email Button */}
          <button
            id="contact-copy-email"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[#DDDDD8] hover:border-[#111111] bg-white text-sm font-medium text-[#111111] transition-all cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Email copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#777777]" />
                <span>{personalInfo.email}</span>
              </>
            )}
          </button>

          {/* Quick Message Form Toggle */}
          <button
            onClick={() => setShowInquiryForm(!showInquiryForm)}
            className="text-xs font-mono uppercase tracking-wider text-[#666666] hover:text-[#111111] underline underline-offset-4 cursor-pointer sm:ml-auto"
          >
            {showInquiryForm ? 'Close direct form' : 'Or fill out quick brief ↓'}
          </button>
        </div>

        {/* Optional Quick Inquiry Form */}
        {showInquiryForm && (
          <div className="p-8 md:p-12 rounded-2xl bg-white border border-[#DDDDD8] mb-16 shadow-xs max-w-3xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <Check className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-bold text-[#111111]">Thank you for reaching out</h3>
                <p className="text-sm text-[#666666]">
                  Your brief has been recorded. I typically reply within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-[#111111]">Direct Inquiry Brief</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-[#777777] uppercase mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Chen"
                      className="w-full px-4 py-3 rounded-lg border border-[#DDDDD8] focus:border-[#111111] focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#777777] uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maya@company.com"
                      className="w-full px-4 py-3 rounded-lg border border-[#DDDDD8] focus:border-[#111111] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#777777] uppercase mb-2">
                    Estimated Budget / Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. $10k - $25k, Starting May 2026"
                    className="w-full px-4 py-3 rounded-lg border border-[#DDDDD8] focus:border-[#111111] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#777777] uppercase mb-2">
                    Project Overview *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me a bit about your brand, challenges, and goals..."
                    className="w-full px-4 py-3 rounded-lg border border-[#DDDDD8] focus:border-[#111111] focus:outline-none text-sm"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="px-5 py-2.5 text-xs font-mono uppercase text-[#777777] hover:text-[#111111]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#333333] transition-colors cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Social Links Row */}
        <div className="pt-12 border-t border-[#DDDDD8]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-6">
            Elsewhere & Channels
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {personalInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-[#DDDDD8] hover:border-[#111111] bg-white transition-all duration-200"
              >
                <div>
                  <span className="block font-bold text-sm text-[#111111] group-hover:text-[#444444]">
                    {social.name}
                  </span>
                  {social.handle && (
                    <span className="text-xs text-[#777777] font-mono">{social.handle}</span>
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#111111] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
