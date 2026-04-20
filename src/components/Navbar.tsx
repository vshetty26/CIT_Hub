'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // on mount sync with localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setTheme('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition');
    
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }

    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.4s ease',
      backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
      padding: scrolled ? '16px 48px' : '24px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <a 
        href="#home"
        onClick={(e) => scrollToSection(e, 'home')}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--text)',
          textDecoration: 'none',
          letterSpacing: '-0.02em'
        }}
      >
        CIT HUB
      </a>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {[
          { name: 'About', id: 'about' },
          { name: 'Work', id: 'work' },
          { name: 'Capabilities', id: 'capabilities' },
          { name: 'Contact', id: 'contact' },
        ].map(item => (
          <a
            key={item.name}
            href={`#${item.id}`}
            onClick={(e) => scrollToSection(e, item.id)}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
          >
            {item.name}
          </a>
        ))}
        
        {/* Call to action button */}
        <a 
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--bg)',
            backgroundColor: 'var(--text)',
            padding: '12px 24px',
            borderRadius: '100px',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'transform 0.2s, background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = 'var(--secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'var(--text)';
          }}
        >
          Let's Talk
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            color: 'var(--text)',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label="Toggle Theme"
        >
          <div style={{
            position: 'relative',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Sun Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: 'absolute',
                transition: 'transform 0.5s ease, opacity 0.5s ease',
                opacity: theme === 'dark' ? 1 : 0,
                transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(-90deg)',
              }}
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>

            {/* Moon Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: 'absolute',
                transition: 'transform 0.5s ease, opacity 0.5s ease',
                opacity: theme === 'light' ? 1 : 0,
                transform: theme === 'light' ? 'rotate(0deg)' : 'rotate(90deg)',
              }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
        </button>
      </div>
    </nav>
  );
}
