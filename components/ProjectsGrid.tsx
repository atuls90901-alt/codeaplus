// components/ProjectsGrid.tsx
'use client'
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

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <div className="text-center py-28 font-mono text-[11px] tracking-[.15em] uppercase text-white/15">
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

/* ════════════════════════════════════
   3D CARD — CSS lives in globals.css (.pc3-*)
════════════════════════════════════ */
function ProjectCard3D({ project, index }: { project: Project; index: number }) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const glareRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const shineRef   = useRef<HTMLDivElement>(null)

  const accents = ['#C9A84C', '#B8973F', '#D4AF5A', '#A08030', '#C9A84C', '#D4AF5A']
  const accent  = accents[index % accents.length]

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x  = e.clientX - rect.left
    const y  = e.clientY - rect.top
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
    if (cardRef.current)    cardRef.current.style.transform    = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glareRef.current)   glareRef.current.style.opacity    = '0'
    if (contentRef.current) contentRef.current.style.transform = 'translateX(0) translateY(0)'
    if (shineRef.current)   { shineRef.current.style.opacity = '0'; shineRef.current.style.transform = 'translateX(0) translateY(0)' }
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

      <div ref={glareRef}  className="pc3-glare" />
      <div ref={shineRef}  className="pc3-shine" />
      <div                 className="pc3-border" />

      {/* Top bar */}
      <div className="pc3-topbar">
        {project.category && <span className="pc3-cat">{project.category}</span>}
        <span className="pc3-idx">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Deco lines */}
      <div className="pc3-deco">
        <div className="pc3-dline d1" />
        <div className="pc3-dline d2" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="pc3-content">
        <h3 className="pc3-title">{project.title}</h3>
        {project.description && <p className="pc3-desc">{project.description}</p>}
        <div className="pc3-footer">
          <div className="pc3-tags">
            {tags.slice(0, 3).map((t: string) => (
              <span key={t} className="pc3-tag">{t.trim()}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="pc3-live" onClick={e => e.stopPropagation()}>
              Live ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}