'use client'
import { useRef, useCallback } from 'react'

interface Project {
  id:           string
  title:        string
  description?: string
  image_url?:   string
  link?:        string
  tags?:        string[] | string
  category?:    string
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <div className="text-center py-28 font-mono text-[11px] tracking-[0.15em] uppercase text-white/15">
        Projects coming soon...
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 lg:gap-6">
      {projects.map((p, i) => (
        <ProjectCard3D key={p.id} project={p} index={i} />
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════
   3D TILT CARD
   Static styles → globals.css (.pc3-*)
   Mouse-tracking transforms stay in JS
   (live pointer coords — cannot use Tailwind)
════════════════════════════════════════════ */
function ProjectCard3D({ project, index }: { project: Project; index: number }) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const glareRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const shineRef   = useRef<HTMLDivElement>(null)

  /* ── 3D tilt on mouse move ── */
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const cx   = rect.width  / 2
    const cy   = rect.height / 2
    const dx   = (x - cx) / cx
    const dy   = (y - cy) / cy

    card.style.transform =
      `perspective(1000px) rotateX(${-dy * 14}deg) rotateY(${dx * 20}deg) scale3d(1.03,1.03,1.03)`

    if (glareRef.current) {
      const px = (x / rect.width)  * 100
      const py = (y / rect.height) * 100
      glareRef.current.style.background =
        `radial-gradient(circle at ${px}% ${py}%, rgba(201,168,76,0.2) 0%, transparent 65%)`
      glareRef.current.style.opacity = '1'
    }
    if (contentRef.current) {
      contentRef.current.style.transform =
        `translateX(${dx * -10}px) translateY(${dy * -7}px)`
    }
    if (shineRef.current) {
      shineRef.current.style.opacity   = '1'
      shineRef.current.style.transform =
        `translateX(${dx * 20}px) translateY(${dy * 15}px)`
    }
  }, [])

  /* ── Reset on mouse leave ── */
  const onLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glareRef.current)
      glareRef.current.style.opacity = '0'
    if (contentRef.current)
      contentRef.current.style.transform = 'translateX(0) translateY(0)'
    if (shineRef.current) {
      shineRef.current.style.opacity   = '0'
      shineRef.current.style.transform = 'translateX(0) translateY(0)'
    }
  }, [])

  const tags   = project.tags
    ? (Array.isArray(project.tags) ? project.tags : String(project.tags).split(','))
    : []
  const padded = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={cardRef}
      className="pc3"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >

      {/* ── Background ── */}
      <div className="pc3-bg">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="pc3-img"
          />
        ) : (
          /* Placeholder — pure Tailwind, no inline style, no CSS var needed */
          <div className="pc3-ph bg-gradient-to-br from-[#0e0e0e] to-[#181818]">
            <span className="pc3-bignum">{padded}</span>
          </div>
        )}
        <div className="pc3-overlay" />
      </div>

      {/* Glare + shine + border (appearance via .pc3-* globals) */}
      <div ref={glareRef} className="pc3-glare"  />
      <div ref={shineRef} className="pc3-shine"  />
      <div               className="pc3-border" />

      {/* Top bar — category + index */}
      <div className="pc3-topbar">
        {project.category && (
          <span className="pc3-cat">{project.category}</span>
        )}
        <span className="pc3-idx">{padded}</span>
      </div>

      {/* Decorative lines (position via .d1/.d2 in globals) */}
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
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pc3-live"
              onClick={e => e.stopPropagation()}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>

    </div>
  )
}