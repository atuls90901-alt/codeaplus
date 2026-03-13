// components/ProjectsGrid.tsx
'use client'
import { useRef, useCallback } from 'react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description?: string
  image_url?: string
  link?: string
  tags?: string[] | string
  category?: string
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '120px 0',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.15)',
      }}>
        Projects coming soon...
      </div>
    )
  }

  return (
    <>
      <div className="pg-grid">
        {projects.map((p, i) => <ProjectCard3D key={p.id} project={p} index={i} />)}
      </div>

      <style>{`
        .pg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .pg-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 640px) {
          .pg-grid { grid-template-columns: 1fr; gap: 14px; }
        }
      `}</style>
    </>
  )
}

function ProjectCard3D({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const accents = ['#C9A84C', '#B8973F', '#D4AF5A', '#A08030', '#C9A84C', '#D4AF5A']
  const accent = accents[index % accents.length]

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = (x - cx) / cx
    const dy = (y - cy) / cy

    card.style.transform = `perspective(1000px) rotateX(${-dy * 14}deg) rotateY(${dx * 20}deg) scale3d(1.03,1.03,1.03)`

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(201,168,76,0.2) 0%, transparent 65%)`
      glareRef.current.style.opacity = '1'
    }
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${dx * -10}px) translateY(${dy * -7}px)`
    }
    if (shineRef.current) {
      shineRef.current.style.opacity = '1'
      shineRef.current.style.transform = `translateX(${dx * 20}px) translateY(${dy * 15}px)`
    }
  }, [])

  const onLeave = useCallback(() => {
    const card = cardRef.current
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glareRef.current) glareRef.current.style.opacity = '0'
    if (contentRef.current) contentRef.current.style.transform = 'translateX(0) translateY(0)'
    if (shineRef.current) { shineRef.current.style.opacity = '0'; shineRef.current.style.transform = 'translateX(0) translateY(0)' }
  }, [])

  const tags = project.tags
    ? (Array.isArray(project.tags) ? project.tags : String(project.tags).split(','))
    : []

  return (
    <div
      ref={cardRef}
      className="pc3"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ '--ac': accent } as React.CSSProperties}
    >
      {/* BG */}
      <div className="pc3-bg">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="pc3-img" />
        ) : (
          <div className="pc3-ph" style={{
            background: `radial-gradient(ellipse at 35% 45%, ${accent}20 0%, transparent 65%), linear-gradient(145deg,#0e0e0e,#181818)`
          }}>
            <span className="pc3-bignum">{String(index + 1).padStart(2, '0')}</span>
          </div>
        )}
        <div className="pc3-overlay" />
      </div>

      {/* Glare */}
      <div ref={glareRef} className="pc3-glare" />

      {/* Shine streak */}
      <div ref={shineRef} className="pc3-shine" />

      {/* Border */}
      <div className="pc3-border" />

      {/* Top bar */}
      <div className="pc3-topbar">
        {project.category && <span className="pc3-cat">{project.category}</span>}
        <span className="pc3-idx">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Decorative lines */}
      <div className="pc3-deco">
        <div className="pc3-dline d1" />
        <div className="pc3-dline d2" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="pc3-content">
        <h3 className="pc3-title">{project.title}</h3>
        {project.description && (
          <p className="pc3-desc">{project.description}</p>
        )}
        <div className="pc3-footer">
          <div className="pc3-tags">
            {tags.slice(0, 3).map((t: string) => (
              <span key={t} className="pc3-tag">{t.trim()}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="pc3-live" onClick={e => e.stopPropagation()}>
              Live ↗
            </a>
          )}
        </div>
      </div>

      <style>{`
        .pc3 {
          position: relative;
          aspect-ratio: 4/3;
          border-radius: 4px;
          overflow: hidden;
          cursor: default;
          transition: transform 0.12s ease-out, box-shadow 0.35s ease;
          will-change: transform;
          transform-style: preserve-3d;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
        }
        .pc3:hover {
          box-shadow:
            0 35px 70px rgba(0,0,0,0.75),
            0 0 0 1px rgba(201,168,76,0.22),
            0 0 50px rgba(201,168,76,0.05);
        }
        .pc3-bg { position: absolute; inset: 0; }
        .pc3-img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.55;
          transition: opacity 0.4s, transform 0.7s;
        }
        .pc3:hover .pc3-img { opacity: 0.72; transform: scale(1.07); }
        .pc3-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .pc3-bignum {
          font-family: var(--font-cormorant);
          font-size: 110px;
          font-weight: 700;
          color: var(--ac);
          opacity: 0.09;
          transition: opacity 0.4s;
          user-select: none;
        }
        .pc3:hover .pc3-bignum { opacity: 0.18; }
        .pc3-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(6,6,6,.97) 0%, rgba(6,6,6,.5) 42%, rgba(6,6,6,.1) 72%, transparent 100%);
          transition: background 0.35s;
        }
        .pc3:hover .pc3-overlay {
          background: linear-gradient(to top, rgba(6,6,6,.97) 0%, rgba(6,6,6,.6) 48%, rgba(6,6,6,.15) 72%, transparent 100%);
        }
        .pc3-glare {
          position: absolute; inset: 0;
          opacity: 0;
          pointer-events: none;
          z-index: 3;
          transition: opacity 0.15s;
        }
        .pc3-shine {
          position: absolute;
          top: -60%; left: -30%;
          width: 60%; height: 200%;
          background: linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.07) 50%, transparent 60%);
          opacity: 0;
          pointer-events: none;
          z-index: 4;
          transition: opacity 0.3s, transform 0.3s;
        }
        .pc3-border {
          position: absolute; inset: 0;
          border: 1px solid rgba(201,168,76,0.07);
          pointer-events: none;
          z-index: 6;
          transition: border-color 0.35s, box-shadow 0.35s;
          border-radius: inherit;
        }
        .pc3:hover .pc3-border {
          border-color: rgba(201,168,76,0.28);
          box-shadow: inset 0 0 40px rgba(201,168,76,0.04);
        }
        .pc3-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          z-index: 5;
        }
        .pc3-cat {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ac);
          border: 1px solid var(--ac);
          opacity: 0.75;
          padding: 4px 10px;
          backdrop-filter: blur(6px);
          background: rgba(6,6,6,0.35);
          transition: opacity 0.3s, transform 0.3s;
        }
        .pc3:hover .pc3-cat { opacity: 1; transform: translateY(-2px); }
        .pc3-idx {
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(255,255,255,0.12);
          letter-spacing: 0.05em;
        }
        .pc3-deco { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .pc3-dline {
          position: absolute; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .pc3:hover .pc3-dline { opacity: 1; }
        .d1 { top: 32%; }
        .d2 { top: 64%; opacity: 0.4; }
        .pc3-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 26px;
          z-index: 5;
          transition: transform 0.1s ease-out;
        }
        .pc3-title {
          font-family: var(--font-cormorant);
          font-size: clamp(20px, 2.2vw, 30px);
          font-weight: 400;
          color: #fff;
          margin: 0 0 8px;
          line-height: 1.2;
          transition: letter-spacing 0.3s;
        }
        .pc3:hover .pc3-title { letter-spacing: 0.01em; }
        .pc3-desc {
          font-family: var(--font-outfit);
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          line-height: 1.65;
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s;
        }
        .pc3:hover .pc3-desc { color: rgba(255,255,255,0.56); }
        .pc3-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pc3-tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .pc3-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.26);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 3px 7px;
          transition: all 0.3s;
        }
        .pc3:hover .pc3-tag {
          color: rgba(255,255,255,0.45);
          border-color: rgba(201,168,76,0.15);
        }
        .pc3-live {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ac);
          text-decoration: none;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.3s, transform 0.3s;
          white-space: nowrap;
        }
        .pc3:hover .pc3-live { opacity: 1; transform: translateX(0); }

        /* TABLET */
        @media (max-width: 1024px) {
          .pc3 { aspect-ratio: 3/2; }
          .pc3-content { padding: 20px; }
        }
        /* MOBILE */
        @media (max-width: 768px) {
          .pc3 {
            aspect-ratio: 16/9;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .pc3:hover {
            transform: perspective(1000px) rotateX(0) rotateY(0) scale3d(1.02,1.02,1.02) !important;
          }
          .pc3-glare, .pc3-shine { display: none; }
          .pc3-live { opacity: 1; transform: none; }
          .pc3-content { padding: 16px; }
          .pc3-title { font-size: 18px; }
          .pc3-desc { -webkit-line-clamp: 2; }
        }
        @media (max-width: 480px) {
          .pc3 { aspect-ratio: 4/3; }
          .pc3-title { font-size: 16px; }
          .pc3-content { padding: 14px; }
          .pc3-tag { display: none; }
          .pc3-tags:first-child .pc3-tag:first-child { display: inline; }
        }
      `}</style>
    </div>
  )
}