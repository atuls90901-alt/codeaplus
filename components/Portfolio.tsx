'use client'
import Link from 'next/link'
import { useRef, useCallback } from 'react'

interface Project {
  id: string
  title: string
  description?: string
  image_url?: string
  link?: string
  tags?: string[] | string
  category?: string
}

export default function Portfolio({ projects = [] }: { projects: Project[] }) {
  const displayed = projects.slice(0, 6)

  return (
    <section id="work">
      <div className="port-wrap">

        {/* Header */}
        <div className="port-header">
          <div>
            <span className="port-eyebrow">Selected Work</span>
            <h2 className="port-title">
              Our <em>Portfolio</em>
            </h2>
          </div>
          {projects.length > 6 && (
            <Link href="/projects" className="port-all-top">
              View All ({projects.length}) <span className="arrow">→</span>
            </Link>
          )}
        </div>

        {/* 3D Grid */}
        {displayed.length > 0 ? (
          <div className="port-grid">
            {displayed.map((project, i) => (
              <Card3D key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="port-empty">Projects coming soon...</div>
        )}

        {/* Bottom CTA */}
        <div className="port-cta">
          <Link href="/projects" className="port-btn">
            <span>View All Projects</span>
            <span className="btn-arrow">→</span>
          </Link>
          <p className="port-count">{projects.length} projects delivered</p>
        </div>

      </div>

      <style>{`
        section#work {
          background: #060606;
          padding: 140px 0;
          overflow: hidden;
        }
        .port-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 64px;
        }
        .port-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 80px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .port-eyebrow {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 14px;
        }
        .port-title {
          font-family: var(--font-cormorant);
          font-size: clamp(42px, 6vw, 84px);
          font-weight: 300;
          color: #fff;
          line-height: 1;
          margin: 0;
        }
        .port-title em {
          color: #C9A84C;
          font-style: italic;
        }
        .port-all-top {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(201,168,76,0.2);
          transition: color 0.3s;
          white-space: nowrap;
        }
        .port-all-top:hover { color: #C9A84C; }
        .port-all-top .arrow { color: #C9A84C; }

        /* ── 3D Grid ── */
        .port-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .port-empty {
          text-align: center;
          padding: 80px 0;
          color: rgba(255,255,255,0.12);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* CTA */
        .port-cta {
          text-align: center;
          margin-top: 80px;
          padding-top: 56px;
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .port-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #060606;
          background: #C9A84C;
          padding: 18px 56px;
          text-decoration: none;
          transition: opacity 0.3s, transform 0.3s;
        }
        .port-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        .btn-arrow { font-size: 18px; }
        .port-count {
          margin-top: 16px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.18);
        }

        /* ═══ TABLET ═══ */
        @media (max-width: 1024px) {
          .port-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        /* ═══ MOBILE ═══ */
        @media (max-width: 768px) {
          section#work { padding: 80px 0; }
          .port-wrap { padding: 0 20px; }
          .port-header { flex-direction: column; align-items: flex-start; margin-bottom: 40px; }
          .port-grid { grid-template-columns: 1fr; gap: 14px; }
          .port-cta { margin-top: 48px; padding-top: 40px; }
          .port-btn { padding: 16px 32px; width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .port-wrap { padding: 0 16px; }
        }
      `}</style>
    </section>
  )
}

/* ════════════════════════════════════
   3D TILT CARD
════════════════════════════════════ */
function Card3D({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const accents = ['#C9A84C', '#B8973F', '#D4AF5A', '#A08030', '#C9A84C', '#D4AF5A']
  const accent = accents[index % accents.length]

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glare = glareRef.current
    const content = contentRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = (x - cx) / cx   // -1 to 1
    const dy = (y - cy) / cy   // -1 to 1

    const rotY = dx * 18   // max 18deg
    const rotX = -dy * 12  // max 12deg

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`

    // Glare follows mouse
    if (glare) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201,168,76,0.18) 0%, transparent 65%)`
      glare.style.opacity = '1'
    }

    // Floating content parallax
    if (content) {
      content.style.transform = `translateX(${dx * -8}px) translateY(${dy * -6}px)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glare = glareRef.current
    const content = contentRef.current

    if (card) card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glare) glare.style.opacity = '0'
    if (content) content.style.transform = 'translateX(0) translateY(0)'
  }, [])

  const tags = project.tags
    ? (Array.isArray(project.tags) ? project.tags : String(project.tags).split(','))
    : []

  return (
    <div
      ref={cardRef}
      className="c3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* ── Background image or gradient ── */}
      <div className="c3d-bg">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="c3d-img" />
        ) : (
          <div className="c3d-placeholder" style={{
            background: `radial-gradient(ellipse at 30% 40%, ${accent}22 0%, transparent 60%), linear-gradient(145deg, #0f0f0f, #1a1a1a)`
          }}>
            <span className="c3d-num">{String(index + 1).padStart(2, '0')}</span>
          </div>
        )}
        {/* Dark gradient overlay */}
        <div className="c3d-overlay" />
      </div>

      {/* ── Mouse-track glare ── */}
      <div ref={glareRef} className="c3d-glare" />

      {/* ── Gold border glow ── */}
      <div className="c3d-border" />

      {/* ── Floating badge (top-left) ── */}
      {project.category && (
        <div className="c3d-badge">{project.category}</div>
      )}

      {/* ── Index ── */}
      <div className="c3d-index">{String(index + 1).padStart(2, '0')}</div>

      {/* ── Depth lines (decorative) ── */}
      <div className="c3d-lines">
        <div className="c3d-line" style={{ top: '35%' }} />
        <div className="c3d-line" style={{ top: '65%', opacity: 0.3 }} />
      </div>

      {/* ── Content (parallax on hover) ── */}
      <div ref={contentRef} className="c3d-content">
        <h3 className="c3d-title">{project.title}</h3>
        {project.description && (
          <p className="c3d-desc">{project.description}</p>
        )}
        <div className="c3d-footer">
          <div className="c3d-tags">
            {tags.slice(0, 3).map((t: string) => (
              <span key={t} className="c3d-tag">{t.trim()}</span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="c3d-link"
              onClick={e => e.stopPropagation()}
            >
              Live <span>↗</span>
            </a>
          )}
        </div>
      </div>

      <style>{`
        .c3d {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: default;
          transition: transform 0.12s ease-out, box-shadow 0.3s ease;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .c3d:hover {
          box-shadow:
            0 30px 60px rgba(0,0,0,0.7),
            0 0 40px rgba(201,168,76,0.06),
            0 0 0 1px rgba(201,168,76,0.2);
        }

        /* BG */
        .c3d-bg {
          position: absolute;
          inset: 0;
        }
        .c3d-img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.6;
          transition: opacity 0.4s ease, transform 0.6s ease;
        }
        .c3d:hover .c3d-img {
          opacity: 0.75;
          transform: scale(1.06);
        }
        .c3d-placeholder {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .c3d-num {
          font-family: var(--font-cormorant);
          font-size: 100px;
          color: var(--accent);
          opacity: 0.1;
          font-weight: 700;
          line-height: 1;
          transition: opacity 0.4s;
        }
        .c3d:hover .c3d-num { opacity: 0.2; }

        /* Overlay */
        .c3d-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6,6,6,0.97) 0%,
            rgba(6,6,6,0.55) 40%,
            rgba(6,6,6,0.1) 75%,
            transparent 100%
          );
          transition: background 0.3s;
        }
        .c3d:hover .c3d-overlay {
          background: linear-gradient(
            to top,
            rgba(6,6,6,0.97) 0%,
            rgba(6,6,6,0.6) 45%,
            rgba(6,6,6,0.15) 75%,
            transparent 100%
          );
        }

        /* Glare */
        .c3d-glare {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          z-index: 3;
          border-radius: inherit;
        }

        /* Border glow */
        .c3d-border {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(201,168,76,0.08);
          border-radius: inherit;
          pointer-events: none;
          z-index: 4;
          transition: border-color 0.3s;
        }
        .c3d:hover .c3d-border {
          border-color: rgba(201,168,76,0.25);
          box-shadow: inset 0 0 30px rgba(201,168,76,0.04);
        }

        /* Badge */
        .c3d-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 5;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 4px 10px;
          opacity: 0.8;
          backdrop-filter: blur(8px);
          background: rgba(6,6,6,0.4);
          transition: opacity 0.3s, transform 0.3s;
          transform: translateZ(20px);
        }
        .c3d:hover .c3d-badge {
          opacity: 1;
          transform: translateZ(20px) translateY(-2px);
        }

        /* Index */
        .c3d-index {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 5;
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.05em;
        }

        /* Decorative lines */
        .c3d-lines { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
        .c3d-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.08), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .c3d:hover .c3d-line { opacity: 1; }

        /* Content */
        .c3d-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 28px;
          z-index: 5;
          transition: transform 0.1s ease-out;
          will-change: transform;
        }
        .c3d-title {
          font-family: var(--font-cormorant);
          font-size: clamp(20px, 2vw, 28px);
          font-weight: 400;
          color: #fff;
          margin: 0 0 8px;
          line-height: 1.2;
          transition: color 0.3s;
        }
        .c3d:hover .c3d-title { color: #fff; }
        .c3d-desc {
          font-family: var(--font-outfit);
          font-size: 13px;
          color: rgba(255,255,255,0.42);
          line-height: 1.65;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s;
        }
        .c3d:hover .c3d-desc { color: rgba(255,255,255,0.58); }
        .c3d-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .c3d-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .c3d-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 3px 8px;
          transition: border-color 0.3s, color 0.3s;
        }
        .c3d:hover .c3d-tag {
          border-color: rgba(201,168,76,0.15);
          color: rgba(255,255,255,0.45);
        }
        .c3d-link {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s, transform 0.3s;
          white-space: nowrap;
        }
        .c3d:hover .c3d-link {
          opacity: 1;
          transform: translateX(0);
        }
        .c3d-link span { font-size: 13px; }

        /* ═══ TABLET (1024px) ═══ */
        @media (max-width: 1024px) {
          .c3d { aspect-ratio: 3/2; }
          .c3d-content { padding: 22px; }
        }

        /* ═══ MOBILE (768px) — subtle 3D only ═══ */
        @media (max-width: 768px) {
          .c3d {
            aspect-ratio: 16/9;
            /* On mobile: disable mouse tilt, just keep scale */
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .c3d:hover {
            transform: perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1.02,1.02,1.02) !important;
          }
          .c3d-content { padding: 18px; }
          .c3d-glare { display: none; }
          .c3d-link { opacity: 1; transform: none; }
          .c3d-desc { -webkit-line-clamp: 2; }
          .c3d-title { font-size: 20px; }
        }

        /* ═══ SMALL MOBILE (480px) ═══ */
        @media (max-width: 480px) {
          .c3d { aspect-ratio: 4/3; }
          .c3d-title { font-size: 18px; }
          .c3d-content { padding: 16px; }
        }
      `}</style>
    </div>
  )
}