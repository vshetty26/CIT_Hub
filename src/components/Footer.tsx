'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="footer-section"
      style={{
        width: '100%',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-section {
          padding: 64px 48px;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 64px;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid var(--border-color);
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .footer-section {
            padding: 64px 24px 40px;
          }
          .footer-top {
            flex-direction: column;
            gap: 48px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 32px;
          }
          .footer-links-group {
            width: 100%;
            justify-content: space-between !important;
            gap: 32px !important;
          }
        }
      `}} />

      <div className="footer-top">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Image
              src="/cithublogo.png"
              alt="CIT Hub"
              width={140}
              height={48}
              style={{
                objectFit: 'contain',
                height: '44px',
                width: 'auto',
                filter: 'var(--logo-filter)',
              }}
            />
          </div>
          <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              color: 'var(--secondary)',
              lineHeight: 1.6,
              maxWidth: '300px'
          }}>
            A digital innovation studio pushing the boundaries of web experiences.
          </div>
        </div>

        <div className="footer-links-group" style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Navigation</span>
            {['Home', 'About', 'Work', 'Capabilities', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: 'var(--secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                 onMouseLeave={e => e.currentTarget.style.color = 'var(--secondary)'}>
                {item}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Social</span>
            {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'].map(item => (
              <a key={item} href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: 'var(--secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                 onMouseLeave={e => e.currentTarget.style.color = 'var(--secondary)'}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            color: 'var(--secondary)',
            letterSpacing: '0.02em'
        }}>
          © {new Date().getFullYear()} Creative IT Hub. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {['Privacy Policy', 'Terms of Service'].map(item => (
            <a key={item} href="#" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              color: 'var(--secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--secondary)'}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
