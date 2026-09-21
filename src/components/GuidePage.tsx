import React, { useState, useEffect } from 'react';

export interface ClientGuideData {
  slug: string;
  aliases?: string[];
  clientName: string;
  title?: string;
  category?: string;
  year?: string;
  websiteUrl?: string;
  description?: string;
  fullGuideId?: string;
  fullGuideFilename?: string;
  fullGuideMimeType?: string;
  fullGuideWidth?: number;
  fullGuideHeight?: number;
  fullGuideUrl?: string;
  fallbackFullGuideUrl?: string;
}

const FALLBACK_CLIENTS: ClientGuideData[] = [
  {
    slug: 'ink-contracting',
    aliases: ['logo-ink', 'ink'],
    clientName: 'INK Contracting',
    title: 'INK Contracting — Brand Identity',
    category: 'Basic Brand Guide',
    year: '2024',
    websiteUrl: 'https://inkcontracting.ae/',
    description:
      'Corporate visual identity, custom geometric monogram, architectural application systems, and comprehensive brand guidelines.',
    fullGuideId: '1x1mQ7X7zc59duu77uc-C7liK9IHYxzSP',
    fullGuideFilename: 'INK.jpg',
    fullGuideMimeType: 'image/jpeg',
    fullGuideWidth: 228,
    fullGuideHeight: 1600,
    fullGuideUrl: 'https://lh3.googleusercontent.com/d/1x1mQ7X7zc59duu77uc-C7liK9IHYxzSP',
    fallbackFullGuideUrl: '/images/logo-branding/drive/ink.jpg',
  },
  {
    slug: 'aadhya',
    aliases: ['aadhya-brand'],
    clientName: 'Aadhya',
    title: 'Aadhya — Brand Identity',
    category: 'Basic Brand Guide',
    year: '2024',
    websiteUrl: '',
    description:
      'Comprehensive brand identity system, typography architecture, color palette guidelines, and corporate visual standards.',
    fullGuideId: '16sgw-tXv1V_W4v1javw0q7TUoj_FLEMP',
    fullGuideFilename: 'Aadhya Full Guide.jpg',
    fullGuideMimeType: 'image/jpeg',
    fullGuideWidth: 969,
    fullGuideHeight: 1600,
    fullGuideUrl: 'https://lh3.googleusercontent.com/d/16sgw-tXv1V_W4v1javw0q7TUoj_FLEMP',
    fallbackFullGuideUrl: '/images/logo-branding/drive/aadhya-full-guide.jpg',
  },
  {
    slug: 'kaya-realty',
    aliases: ['kaya'],
    clientName: 'Kaya Realty',
    title: 'Kaya Realty — Brand Identity',
    category: 'Basic Brand Guide',
    year: '2024',
    websiteUrl: '',
    description:
      'Luxury real estate visual identity system, corporate typography hierarchy, color specifications, and brand presentation.',
    fullGuideId: '1BngSz6IyKvrjASIl1VAiv_GA704L5VKJ',
    fullGuideFilename: 'kaya.webp',
    fullGuideMimeType: 'image/jpeg',
    fullGuideWidth: 518,
    fullGuideHeight: 1600,
    fullGuideUrl: 'https://lh3.googleusercontent.com/d/1BngSz6IyKvrjASIl1VAiv_GA704L5VKJ',
    fallbackFullGuideUrl: '/images/logo-branding/drive/kaya.webp',
  },
];

interface GuidePageProps {
  slug?: string;
  onBack?: () => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ slug: propSlug, onBack }) => {
  const [client, setClient] = useState<ClientGuideData | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copyToastVisible, setCopyToastVisible] = useState(false);

  // 1. Resolve requested slug from prop, path (/guide/:slug), query (?client=), or hash
  const activeSlug = React.useMemo(() => {
    if (propSlug) return propSlug.toLowerCase();

    const path = window.location.pathname;
    const pathMatch = path.match(/\/(?:guide|guide\.html)\/([a-zA-Z0-9_-]+)/i);
    if (pathMatch && pathMatch[1]) {
      return pathMatch[1].toLowerCase();
    }

    const params = new URLSearchParams(window.location.search);
    const querySlug = params.get('client') || params.get('id') || params.get('project');
    if (querySlug) {
      return querySlug.toLowerCase();
    }

    if (window.location.hash) {
      const cleanHash = window.location.hash.replace(/^#\/?(?:guide\/)?/, '').trim().toLowerCase();
      if (cleanHash) return cleanHash;
    }

    return 'ink-contracting';
  }, [propSlug]);

  // 2. Fetch live data from Google Drive Folder API & sync with fallback
  useEffect(() => {
    let isMounted = true;

    async function loadClientData() {
      // Find initial matching from fallback
      const initialMatch =
        FALLBACK_CLIENTS.find(
          (c) =>
            c.slug === activeSlug ||
            (c.aliases && c.aliases.includes(activeSlug)) ||
            c.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeSlug
        ) || FALLBACK_CLIENTS[0];

      if (isMounted) {
        setClient(initialMatch);
        const primaryUrl = initialMatch.fullGuideUrl || initialMatch.fallbackFullGuideUrl || '';
        setImgSrc(primaryUrl);
        setImageLoaded(false);
      }

      try {
        const res = await fetch(
          '/api/drive-folder-images?folderId=1JPKtgjLMcRf2a6-YPQvWXqsivNeGUNnf'
        );
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.images)) {
            const apiMatch = json.images.find((img: any) => {
              const s = (img.slug || img.clientName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                s === activeSlug ||
                (img.slug && img.slug.toLowerCase() === activeSlug) ||
                (img.clientName && img.clientName.toLowerCase() === activeSlug) ||
                (img.title && img.title.toLowerCase().includes(activeSlug))
              );
            });

            if (apiMatch && isMounted) {
              const resolvedClient: ClientGuideData = {
                slug: apiMatch.slug || activeSlug,
                clientName: apiMatch.clientName || initialMatch.clientName,
                title: apiMatch.title || initialMatch.title,
                category: apiMatch.category || initialMatch.category || 'Basic Brand Guide',
                year: apiMatch.year || initialMatch.year || '2024',
                websiteUrl: apiMatch.websiteUrl || initialMatch.websiteUrl || '',
                description: apiMatch.description || initialMatch.description || '',
                fullGuideId: apiMatch.fullGuideId || initialMatch.fullGuideId,
                fullGuideFilename: apiMatch.fullGuideFilename || initialMatch.fullGuideFilename,
                fullGuideMimeType: apiMatch.fullGuideMimeType || initialMatch.fullGuideMimeType,
                fullGuideWidth: apiMatch.fullGuideWidth || initialMatch.fullGuideWidth,
                fullGuideHeight: apiMatch.fullGuideHeight || initialMatch.fullGuideHeight,
                fullGuideUrl:
                  apiMatch.fullGuideUrl ||
                  initialMatch.fullGuideUrl ||
                  (apiMatch.fullGuideId
                    ? `https://lh3.googleusercontent.com/d/${apiMatch.fullGuideId}`
                    : ''),
                fallbackFullGuideUrl: initialMatch.fallbackFullGuideUrl,
              };

              setClient(resolvedClient);
              const resolvedUrl =
                resolvedClient.fullGuideUrl || resolvedClient.fallbackFullGuideUrl || '';
              if (resolvedUrl) {
                setImgSrc(resolvedUrl);
              }
            }
          }
        }
      } catch (err) {
        console.warn('Google Drive client sync info:', err);
      }
    }

    loadClientData();

    return () => {
      isMounted = false;
    };
  }, [activeSlug]);

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onBack) {
      onBack();
      return;
    }
    if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
      window.history.back();
    } else {
      window.location.href = '/logo-and-branding.html';
    }
  };

  const handleImageError = () => {
    if (client && client.fallbackFullGuideUrl && imgSrc !== client.fallbackFullGuideUrl) {
      setImgSrc(client.fallbackFullGuideUrl);
    }
  };

  const isPdf =
    client?.fullGuideMimeType === 'application/pdf' ||
    Boolean(client?.fullGuideFilename?.toLowerCase().endsWith('.pdf'));

  return (
    <div className="guide-page-wrapper theme-dark bg-[#0E0E10] text-[#FAF9F6] min-h-screen">
      {/* Sticky Site Navigation Bar */}
      <header className="site-nav" id="site-nav">
        <div className="wrap nav-inner">
          <div className="nav-left-group">
            <button
              onClick={handleBack}
              className="nav-back-btn"
              id="navBackBtn"
              aria-label="Go back to logo and branding"
              title="Back to Logos & Branding"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Back</span>
            </button>
            <a href="/index.html" className="brand" id="nav-brand">
              <span className="brand-avatar">
                <img src="/assets/profile/niroz.png" alt="Niroz Shrestha" width="36" height="36" />
              </span>
              <span className="brand-meta">
                <strong className="brand-name">Niroz Shrestha</strong>
                <span className="brand-title">Freelance Designer</span>
              </span>
            </a>
          </div>

          <nav className="links" aria-label="Main Navigation">
            <a href="/index.html#work" className="nav-link active">
              Work
            </a>
            <a href="/index.html#clients" className="nav-link">
              Clients
            </a>
          </nav>

          <div className="nav-right">
            <a
              className="cv-link"
              href="https://drive.google.com/drive/folders/1CuDtOsaQlmSE1qufDi-5Z5csikM16_yi?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-cv-link"
            >
              <span>Download CV</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <button
              className="menu-btn"
              id="menuBtn"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`wrap mobile-panel ${isMobileMenuOpen ? 'open' : ''}`} id="mobilePanel">
          <a href="/index.html#work" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
            Work
          </a>
          <a
            href="/index.html#clients"
            className="mobile-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Clients
          </a>
          <div className="mobile-actions">
            <a
              href="https://drive.google.com/drive/folders/1CuDtOsaQlmSE1qufDi-5Z5csikM16_yi?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cv-mobile"
            >
              Download CV
            </a>
            <div className="mobile-socials">
              <a href="https://np.linkedin.com/in/nirojshrestha" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/_niroz_" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://www.behance.net/nirozshrestha" target="_blank" rel="noopener noreferrer">
                Behance
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="top" className="guide-main pt-24 pb-20">
        {/* Client Project Header (Matching https://niroz.framer.website/logo-ink) */}
        <section className="guide-hero-section">
          <div className="guide-hero-wrap">
            <span className="guide-eyebrow" id="guideEyebrow">
              {client?.category || 'Basic Brand Guide'}
            </span>
            <h1 className="guide-hero-title" id="guideClientTitle">
              {client?.title || `${client?.clientName || 'Client'} — Brand Identity`}
            </h1>

            <div className="guide-meta-bar">
              <div className="guide-meta-left">
                <span className="guide-meta-pill" id="guideYearPill">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span id="guideYearText">{client?.year || '2024'}</span>
                </span>
                <span className="guide-meta-pill" id="guideCategoryPill">
                  Brand Identity &amp; System
                </span>

                {client?.websiteUrl && (
                  <a
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="guide-meta-link"
                    id="guideWebsiteLink"
                  >
                    <span id="guideWebsiteText">
                      {client.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {client?.description && (
              <p className="guide-description text-[#9A9895] text-base md:text-lg max-w-3xl mt-7 md:mt-8 mb-4 leading-[1.85] tracking-[0.015em] font-normal">
                {client.description}
              </p>
            )}
          </div>
        </section>

        {/* 3. Full Guide Presentation Visual Section (Natural Aspect Ratio, No Cropping) */}
        <section className="guide-visual-section" aria-label="Brand Guide Presentation">
          <div className="guide-visual-wrap">
            <div className="guide-visual-frame" id="guideVisualFrame">
              {/* Spinner while loading */}
              {!imageLoaded && (
                <div className="guide-status-box" id="guideLoadingState">
                  <div className="guide-spin-icon"></div>
                  <p>Loading original brand guide...</p>
                </div>
              )}

              {/* PDF Guide Viewer */}
              {isPdf && imgSrc ? (
                <iframe
                  id="guideVisualPdf"
                  className="guide-visual-pdf"
                  src={imgSrc}
                  title={`${client?.clientName} Brand Guide`}
                  onLoad={() => setImageLoaded(true)}
                />
              ) : null}

              {/* Original Guide Image (Natural Aspect Ratio, width: 100%, height: auto, display: block) */}
              {!isPdf && imgSrc ? (
                <img
                  id="guideVisualImg"
                  className="guide-visual-img"
                  src={imgSrc}
                  alt={`${client?.clientName || 'Client'} Brand Guide`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: imageLoaded ? 'block' : 'none',
                    objectFit: 'contain',
                  }}
                />
              ) : null}
            </div>
          </div>
        </section>

        {/* 4. Email Me to Start Project Section */}
        <section className="connect-banner-section" id="contact" aria-label="Start a Project">
          <div className="wrap">
            <div className="connect-banner-card">
              <div className="connect-banner-text">
                <h2 className="connect-banner-title">Email me to start a project.</h2>
                <p className="connect-banner-sub">
                  Quick replies on WhatsApp:{' '}
                  <a
                    href="https://wa.me/9779842366531"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wa-link"
                  >
                    +977-9842366531
                  </a>
                </p>
              </div>
              <div className="connect-banner-actions">
                <a
                  href="mailto:niroz.xtha@gmail.com"
                  className="banner-pill-btn banner-pill-orange"
                  id="emailMeBtn"
                >
                  <span>Email me &rarr;</span>
                </a>
                <a
                  href="https://wa.me/9779842366531"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-pill-btn banner-pill-dark"
                >
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://www.behance.net/nirozshrestha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-pill-btn banner-pill-dark"
                >
                  <span>Behance &nearr;</span>
                </a>
                <a
                  href="https://np.linkedin.com/in/nirojshrestha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-pill-btn banner-pill-dark"
                >
                  <span>LinkedIn &nearr;</span>
                </a>
                <a
                  href="https://www.instagram.com/_niroz_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-pill-btn banner-pill-dark"
                >
                  <span>Instagram &nearr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site Footer */}
      <footer>
        <div className="wrap footer-inner">
          <div className="footer-copy">@2026 Niroz Shrestha, All rights reserved.</div>
        </div>
      </footer>

      {/* Notification Toast */}
      {copyToastVisible && (
        <div className="toast-notice show" id="toastNotice" role="status" aria-live="polite">
          Email copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default GuidePage;
