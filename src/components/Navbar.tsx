'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'About',        id: 'about' },
  { name: 'Work',         id: 'work' },
  { name: 'Capabilities', id: 'capabilities' },
  { name: 'Contact',      id: 'contact' },
];

export default function Navbar() {
  const [scrolled,        setScrolled]        = useState(false);
  const [theme,           setTheme]           = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);

  const pathname  = usePathname();
  const router    = useRouter();
  const isHome    = pathname === '/';

  // ── Sync theme from localStorage on mount ────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // ── Scroll detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close mobile menu on route change ────────────────────────────────────
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  // ── Theme toggle ─────────────────────────────────────────────────────────
  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition');
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 300);
  };

  // ── Navigation handler ───────────────────────────────────────────────────
  // On homepage  → smooth-scroll to section
  // On sub-pages → navigate to /#section (browser handles the hash scroll)
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHome) {
      // Already on homepage — smooth scroll
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On a sub-page — use Next.js router to navigate home then hash
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-container {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 48px;
        }
        .nav-scrolled {
          background-color: var(--nav-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
          padding: 16px 48px;
        }

        /* ── Desktop right group ── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: auto;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--secondary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .nav-link:hover { color: var(--text); }

        .nav-cta {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: var(--bg);
          background-color: var(--text);
          padding: 12px 24px;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: transform 0.2s, background-color 0.2s;
          flex-shrink: 0;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          background-color: var(--secondary);
        }

        .nav-theme-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
          border-radius: 50%;
          color: var(--text);
          transition: background-color 0.2s ease;
          flex-shrink: 0;
        }

        /* ── Mobile controls ── */
        .nav-mobile-controls {
          display: none;
          align-items: center;
          gap: 4px;
        }
        .mobile-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text);
          padding: 8px;
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Mobile full-screen menu ── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background-color: var(--bg);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 32px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(-100%);
          pointer-events: none;
        }
        .mobile-menu.mobile-menu-open {
          transform: translateY(0);
          pointer-events: auto;
        }
        .mobile-link {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
          letter-spacing: -0.02em;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        @media (max-width: 900px) {
          .nav-container  { padding: 20px 24px; }
          .nav-scrolled   { padding: 14px 24px; }
          .nav-right      { display: none !important; }
          .nav-mobile-controls { display: flex !important; }
        }
      `}} />

      {/* ── Main nav bar ── */}
      <nav className={`nav-container${scrolled ? ' nav-scrolled' : ''}`} role="navigation" aria-label="Main navigation">

        {/* LEFT: Logo → always goes to / */}
        <Link
          href="/"
          aria-label="CIT Hub — Home"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 1001, flexShrink: 0 }}
        >
          <Image
            src="/cithublogo.png"
            alt="CIT Hub"
            width={120}
            height={40}
            priority
            style={{
              objectFit: 'contain',
              height: '52px',
              width: 'auto',
              filter: theme === 'dark' ? 'invert(1)' : 'none',
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        {/* RIGHT: Nav links + CTA + Theme (desktop) */}
        <div className="nav-right">
          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <a
                key={item.id}
                href={isHome ? `#${item.id}` : `/#${item.id}`}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href={isHome ? '#contact' : '/#contact'}
            className="nav-cta"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Let's Talk
          </a>

          <button onClick={toggleTheme} className="nav-theme-btn" aria-label="Toggle theme">
            <ThemeIcon theme={theme} />
          </button>
        </div>

        {/* MOBILE: Theme + Hamburger */}
        <div className="nav-mobile-controls">
          <button onClick={toggleTheme} className="nav-theme-btn" aria-label="Toggle theme">
            <ThemeIcon theme={theme} />
          </button>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div className={`mobile-menu${mobileMenuOpen ? ' mobile-menu-open' : ''}`} aria-hidden={!mobileMenuOpen}>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.id}
            href={isHome ? `#${item.id}` : `/#${item.id}`}
            className="mobile-link"
            onClick={(e) => handleNavClick(e, item.id)}
            style={{
              opacity:   mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
              transitionDelay: `${i * 0.05}s`,
            }}
          >
            {item.name}
          </a>
        ))}

        <a
          href={isHome ? '#contact' : '/#contact'}
          onClick={(e) => handleNavClick(e, 'contact')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--bg)',
            backgroundColor: 'var(--text)',
            padding: '16px 40px',
            borderRadius: '100px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginTop: '24px',
            opacity:   mobileMenuOpen ? 1 : 0,
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.2s',
          }}
        >
          Let's Talk
        </a>
      </div>
    </>
  );
}

// ── Theme icon (sun / moon) ───────────────────────────────────────────────────
function ThemeIcon({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div style={{ position: 'relative', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Sun */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'absolute', transition: 'transform 0.5s ease, opacity 0.5s ease',
          opacity: theme === 'dark' ? 1 : 0,
          transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(-90deg)' }}
      >
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      {/* Moon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'absolute', transition: 'transform 0.5s ease, opacity 0.5s ease',
          opacity: theme === 'light' ? 1 : 0,
          transform: theme === 'light' ? 'rotate(0deg)' : 'rotate(90deg)' }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </div>
  );
}
