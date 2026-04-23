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

const SLIDE_INTERVAL = 5000; // ms between auto-advances

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const total = TESTIMONIALS.length;

  // ── Navigate ──────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setActive(index);
      setTimeout(() => setAnimating(false), 480);
    },
    [animating]
  );

  const next = useCallback(() => goTo((active + 1) % total, 'next'), [active, goTo, total]);
  const prev = useCallback(() => goTo((active - 1 + total) % total, 'prev'), [active, goTo, total]);

  // ── Auto-slide ────────────────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, SLIDE_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, resetTimer]);

  // ── Touch swipe ───────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 44) {
      if (dx < 0) next(); else prev();
    }
  };

  const t = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      style={{ width: '100%', backgroundColor: 'var(--bg)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}
    >
      <style>{`
        /* ── Slide animation ── */
        @keyframes t-slide-in-next {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes t-slide-in-prev {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .t-card-next { animation: t-slide-in-next 0.48s cubic-bezier(0.25,1,0.3,1) both; }
        .t-card-prev { animation: t-slide-in-prev 0.48s cubic-bezier(0.25,1,0.3,1) both; }

        /* ── Arrow buttons ── */
        .t-arrow {
          width: 48px; height: 48px; border-radius: 50%;
          border: 1px solid var(--border-dark-color);
          background: transparent;
          color: var(--text);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .t-arrow:hover {
          background: var(--text);
          color: var(--bg);
          transform: scale(1.08);
        }

        /* ── Dot ── */
        .t-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--border-dark-color);
          border: none; padding: 0; cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .t-dot.active {
          width: 24px; border-radius: 3px;
          background: var(--text);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .t-section-inner { padding: 0 20px !important; }
          .t-card-body { padding: 40px 28px 36px !important; }
          .t-quote-text { font-size: clamp(16px, 4.5vw, 20px) !important; }
          .t-controls { padding: 0 20px !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div
        className="t-section-inner"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', marginBottom: '40px' }}
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
          Client Stories
        </div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 700, color: 'var(--text)',
          letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          What Our Clients Say
        </h2>
      </div>

      {/* ── Card ── */}
      <div
        ref={trackRef}
        className="t-section-inner"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          key={active}
          className={`t-card-body ${direction === 'next' ? 't-card-next' : 't-card-prev'}`}
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '28px',
            padding: '64px 72px 56px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Large decorative quote mark */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: '32px', left: '56px',
            fontFamily: "'Syne', sans-serif",
            fontSize: '120px', lineHeight: 1,
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
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              fontWeight: 500,
              color: 'var(--text)',
              lineHeight: 1.65,
              letterSpacing: '-0.01em',
              maxWidth: '900px',
              marginBottom: '48px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            "{t.quote}"
          </p>

          {/* Divider */}
          <div style={{
            width: '48px', height: '2px',
            backgroundColor: 'var(--accent)',
            opacity: 0.5,
            marginBottom: '28px',
          }} />

          {/* Attribution */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '16px', fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {t.name}
            </span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px', fontWeight: 400,
              color: 'var(--secondary)',
              letterSpacing: '0.04em',
              fontStyle: 'italic',
            }}>
              {t.company}
            </span>
          </div>

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: '40px', right: '56px',
            fontFamily: "'Syne', sans-serif",
            fontSize: '13px', fontWeight: 700,
            color: 'var(--text)', opacity: 0.12,
            letterSpacing: '0.08em',
          }}>
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* ── Controls: arrows + dots ── */}
      <div
        className="t-controls"
        style={{
          maxWidth: '1200px', margin: '40px auto 0',
          padding: '0 48px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === active ? 'active' : ''}`}
              onClick={() => goTo(i, i > active ? 'next' : 'prev')}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <button className="t-arrow" onClick={prev} aria-label="Previous testimonial">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="t-arrow" onClick={next} aria-label="Next testimonial">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
