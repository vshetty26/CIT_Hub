'use client';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      backgroundColor: 'var(--bg)',
      borderTop: '1px solid var(--border-color)',
      padding: '64px 48px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.02em'
          }}>
            CIT HUB
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

        <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            color: 'var(--secondary)',
            letterSpacing: '0.02em'
        }}>
          © {new Date().getFullYear()} Creative IT Hub. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy Policy', 'Terms of Service'].map(item => (
            <a key={item} href="#" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              color: 'var(--secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--secondary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--secondary)'}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
