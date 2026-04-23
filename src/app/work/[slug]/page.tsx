'use client';

import { useEffect, use, useState } from 'react';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const project = projectsData.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div style={{ padding: '20vh 24px', textAlign: 'center', backgroundColor: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
        <Navbar />
        <h1>Project Not Found</h1>
        <p>The project you are looking for does not exist.</p>
        <a href="/" style={{ color: 'var(--accent)', marginTop: '24px', display: 'inline-block' }}>Return Home</a>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Detail Wrapper layout matching mockups (Left: Images stack, Right: Sticky info) */}
      <main style={{
        flex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '160px 48px 100px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr', // Similar to left images / right text
        gap: '80px',
        alignItems: 'start' // Critical for sticky right column
      }}>

        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 900px) {
              .project-grid {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
                padding: 120px 24px 60px !important;
              }
              .sticky-sidebar {
                position: relative !important;
                top: 0 !important;
                order: -1; /* Puts right sidebar above images on mobile */
              }
            }
          `
        }} />

        {/* LEFT COLUMN: Stacked Photos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {project.images.map((imgSrc, i) => (
            <div key={i} style={{
              width: '100%',
              backgroundColor: 'var(--surface)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {/* Using next/image with width and height auto for proportional scaling */}
              <Image 
                src={imgSrc} 
                alt={`${project.title} - Image ${i + 1}`} 
                width={1200}
                height={800}
                quality={85}
                sizes="(max-width: 900px) 100vw, 60vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Please+Place+File+in+/public/projects/';
                }}
              />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Sticky Information */}
        <div className="sticky-sidebar" style={{
          position: 'sticky',
          top: '160px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {/* Title Area */}
          <div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              borderBottom: '1px dashed var(--border-dark-color)',
              paddingBottom: '24px'
            }}>
              {project.title}
            </h1>

            {/* Description Paragraphs */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {project.description.map((para, i) => (
                <p key={i} style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '15px',
                  color: 'var(--secondary)',
                  lineHeight: 1.8
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Meta Information (Client / Field Under) */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px dashed var(--border-dark-color)',
            borderBottom: '1px dashed var(--border-dark-color)',
            padding: '24px 0',
            marginTop: '16px'
          }}>
            <div>
              <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--secondary)', fontSize: '13px', marginBottom: '8px' }}>Client:</span>
              <strong style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', color: 'var(--text)' }}>{project.client}</strong>
            </div>
            <div>
              <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--secondary)', fontSize: '13px', marginBottom: '8px' }}>Filed under:</span>
              <strong style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', color: 'var(--text)' }}>{project.category}</strong>
            </div>
          </div>

          {/* Social Interactions (Likes / Shares placeholder matching concept) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <button style={{
               background: 'transparent',
               border: '1px solid var(--text)',
               color: 'var(--text)',
               borderRadius: '100px',
               padding: '12px 24px',
               display: 'flex',
               alignItems: 'center',
               gap: '8px',
               cursor: 'pointer',
               fontFamily: "'Space Grotesk', sans-serif",
               fontWeight: 600
             }}>
               <span style={{ fontSize: '18px' }}>♡</span> 0 LIKES
             </button>
             
             <div style={{ display: 'flex', gap: '16px' }}>
               <span style={{ color: 'var(--secondary)', cursor: 'pointer' }}>Share</span>
             </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
