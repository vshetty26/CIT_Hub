'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TESTIMONIALS = [
  {
    quote:
      'CIT Hub team was able to produce a logo that captured our brand attributes with strong attention to detail. The service was delivered in a professional manner in line with our expectations. We look forward to doing more projects with this super talented and creative team. We would highly recommend CIT Hub\'s services to anyone looking for any digital or printing projects.',
    name: 'Gagan Sethi',
    company: 'Wizwealth Finance',
  },
  {
    quote:
      'Working with CIT is an absolute pleasure and worthy experience, these guys discuss and know client requirements, then tailor solutions to meet business\'s digital marketing and branding expectations. We are endorsing CIT for their excellent work to grow our business.',
    name: 'Raghbir Singh',
    company: 'Aucam Cinema',
  },
  {
    quote:
      'We hired CIT Hub to design our logo, banners, and business cards. CIT Hub has been instrumental in providing our brand an impactful yet elegant look to our company\'s logo and other marketing materials by always providing timely and professional services. They went above and beyond in understanding our branding requirements, worked with us on redesigns and rework, creating a hassle-free experience for us. Their creative and valuable input enabled us to get what we wanted! I would highly recommend them for your digital branding needs!',
    name: 'Neha Kapoor Khanna',
    company: 'The Party Factor with Neha',
  },
  {
    quote: 'Amazing service and creativity at its best.',
    name: 'Gaurav Hemani',
    company: 'Werribee Indoor Sports Centre',
  },
  {
    quote:
      'I used the CIT Hub services to design my company logo and a couple of banners for a large event. And, honestly, I couldn\'t be happier with the final product. Every consultation with Manraj was sheer pleasure – he always understood my exact requirements and proactively came up with creative ideas. I was greatly impressed by Manraj\'s knowledge, commitment and professionalism. Look forward to working with CIT Hub again.',
    name: 'Puneet S Sodhi',
    company: 'BPM Vision',
  },
  {
    quote:
      'We would like to thank you for the excellent work you have done to date on our e-mail system and website. Your devotion and personal interest in each minor detail has won us over. The end product was a business identity that exceeded our expectations in regards to creating a fantastic brand image. Your attention to detail and understanding of current design trends allowed us to achieve a result that we are extremely proud of and we would recommend CIT Hub without hesitation to anyone who wants a striking, professional, and functional website.',
    name: 'Harinder Pal Singh',
    company: 'MANSAM International',
  },
  {
    quote:
      'We wholeheartedly endorse CIT Hub for those who want to do things differently when it comes to design. The designer is both analytical and creative in his process and takes the time to genuinely understand the business. He designed website, logo, posters and banners for our society. CIT Hub truly cares about his clients, and even though the project is finished, I still feel supported by him in continuing to build my business!',
    name: 'Admin',
    company: 'Sri Sukhmani Sewak Sabha',
  },
  {
    quote:
      'When I went out looking for a professional to create the identity for my business, I wanted one that shared my passion. In CIT Hub Team I found all of that and more. They worked tirelessly to create artwork that I was happy with and didn\'t stop at that. The team even helped follow through to make sure the printers did their job as they expected them to. The manager even came by to check the final product! I was seriously floored by the professionalism, dedication and commitment they bring to their work. I would happily recommend CIT Hub to anyone.',
    name: 'Sachin Shahi',
    company: 'ElevateIT',
  },
];

const SLIDE_INTERVAL = 4000; // ms between auto-advances
const CARDS_PER_VIEW = 3;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = TESTIMONIALS.length;

  // ── Auto-slide continuously ────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <section
      id="testimonials"
      style={{ width: '100%', backgroundColor: 'var(--bg)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        /* ── Smooth slide animation ── */
        @keyframes t-slide-in {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes t-slide-out {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-24px); }
        }
        .t-card-enter { animation: t-slide-in 0.6s cubic-bezier(0.25,1,0.3,1) both; }
        .t-card-exit { animation: t-slide-out 0.6s cubic-bezier(0.25,1,0.3,1) both; }

        /* ── Mobile ── */
        @media (max-width: 1024px) {
          .t-cards-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .t-section-inner { padding: 0 20px !important; }
          .t-cards-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .t-card-body { padding: 24px 20px 20px !important; }
          .t-quote-text { font-size: clamp(12px, 4.5vw, 14px) !important; }
          .t-quote-mark { font-size: 48px !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div
        className="t-section-inner"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', marginBottom: '60px' }}
      >
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--secondary)', opacity: 0.6,
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '20px',
        }}>
          <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--secondary)' }} />
          Trusted by Clients
        </div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 700, color: 'var(--text)',
          letterSpacing: '-0.02em', lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          What Our Clients Say
        </h2>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px', fontWeight: 400,
          color: 'var(--secondary)', opacity: 0.7,
          letterSpacing: '0.02em',
        }}>
          Hear from those who've experienced our work
        </p>
        
        {/* Trust indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          marginTop: '24px',
        }}>
          {/* Google Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '100px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <text x="2" y="18" fontSize="16" fontWeight="bold" fill="#3b82f6">G</text>
            </svg>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text)',
              }}>
                4.9/5
              </span>
              <div style={{
                display: 'flex',
                gap: '2px',
              }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{
                    color: '#fbbf24',
                    fontSize: '12px',
                  }}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Client Count */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '100px',
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text)',
            }}>
              ✓ 50+ Happy Clients
            </span>
          </div>

          {/* Verified Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '100px',
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text)',
            }}>
              ✓ Verified Reviews
            </span>
          </div>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div
        className="t-section-inner"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}
      >
        <div
          className="t-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {[...Array(CARDS_PER_VIEW)].map((_, i) => {
            const idx = (active + i) % total;
            const t = TESTIMONIALS[idx];
            return (
              <div
                key={`${active}-${i}`}
                className="t-card t-card-enter"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  padding: '28px 24px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Google Review Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '100px',
                  zIndex: 10,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <text x="1" y="14" fontSize="10" fontWeight="bold" fill="#3b82f6">G</text>
                  </svg>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '9px',
                    fontWeight: 600,
                    color: '#3b82f6',
                    letterSpacing: '0.05em',
                  }}>
                    Verified
                  </span>
                </div>

                {/* Large decorative quote mark */}
                <div className="t-quote-mark" aria-hidden="true" style={{
                  position: 'absolute',
                  top: '8px', left: '20px',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '60px', lineHeight: 1,
                  color: 'var(--text)', opacity: 0.04,
                  fontWeight: 800, userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  "
                </div>

                {/* Quote text */}
                <p
                  className="t-quote-text"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(13px, 1.2vw, 16px)',
                    fontWeight: 500,
                    color: 'var(--text)',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                    marginBottom: '16px',
                    position: 'relative',
                    zIndex: 1,
                    flex: 1,
                  }}
                >
                  "{t.quote}"
                </p>

                {/* Divider */}
                <div style={{
                  width: '28px', height: '1.5px',
                  backgroundColor: 'var(--accent)',
                  opacity: 0.5,
                  marginBottom: '12px',
                }} />

                {/* Attribution */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '12px', fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    {t.name}
                  </span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '10px', fontWeight: 400,
                    color: 'var(--secondary)',
                    letterSpacing: '0.04em',
                    fontStyle: 'italic',
                  }}>
                    {t.company}
                  </span>
                </div>

                {/* Star rating */}
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  marginTop: '8px',
                }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{
                      color: '#fbbf24',
                      fontSize: '12px',
                    }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA Button ── */}
      <div
        style={{
          maxWidth: '1200px', margin: '48px auto 0',
          padding: '0 48px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          style={{
            padding: '12px 28px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '100px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#3b82f6',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
          }}
        >
          ⭐ Leave a Google Review
        </button>
      </div>
    </section>
  );
}
