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
    <section id="work" className="bg-bg-primary py-20 md:py-32 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10 md:mb-16 lg:mb-20 flex-wrap">
          <div>
            <span className="block font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3.5">
              Selected Work
            </span>
            <h2 className="font-cormorant text-[clamp(42px,6vw,84px)] font-light text-white leading-none">
              Our <em className="text-gold italic">Portfolio</em>
            </h2>
          </div>

          {projects.length > 6 && (
            <Link href="/projects"
              className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[.2em] uppercase
                text-white/35 hover:text-gold transition-colors duration-300
                pb-2 border-b border-gold/20 hover:border-gold/50 whitespace-nowrap">
              View All ({projects.length}) <span className="text-gold">→</span>
            </Link>
          )}
        </div>

        {/* ── 3D Grid ── */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 lg:gap-6">
            {displayed.map((project, i) => (
              <Card3D key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 font-mono text-[11px] tracking-[.15em] uppercase text-white/12">
            Projects coming soon...
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-12 md:mt-20 pt-10 md:pt-14 border-t border-gold/[0.08]">
          <Link href="/projects"
            className="relative overflow-hidden group inline-flex items-center justify-center gap-3.5
              font-mono text-[10px] tracking-[.25em] uppercase
              text-bg-primary bg-gold
              px-10 md:px-14 py-4
              w-full sm:w-auto max-w-[340px]
              hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300">
            <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10">View All Projects</span>
            <span className="relative z-10 text-lg">→</span>
          </Link>
          <p className="mt-4 font-mono text-[10px] tracking-[.1em] text-white/18">
            {projects.length} projects delivered
          </p>
        </div>

      </div>
    </section>
  )
}

/* ════════════════════════════════════
   3D TILT CARD
   CSS lives in globals.css (.c3d-*)
════════════════════════════════════ */
function Card3D({ project, index }: { project: Project; index: number }) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const glareRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const accents = ['#C9A84C', '#B8973F', '#D4AF5A', '#A08030', '#C9A84C', '#D4AF5A']
  const accent  = accents[index % accents.length]

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card    = cardRef.current
    const glare   = glareRef.current
    const content = contentRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const cx   = rect.width / 2
    const cy   = rect.height / 2
    const dx   = (x - cx) / cx
    const dy   = (y - cy) / cy

    card.style.transform = `perspective(900px) rotateX(${-dy * 12}deg) rotateY(${dx * 18}deg) scale3d(1.03,1.03,1.03)`

    if (glare) {
      glare.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(201,168,76,0.18) 0%, transparent 65%)`
      glare.style.opacity = '1'
    }
    if (content) {
      content.style.transform = `translateX(${dx * -8}px) translateY(${dy * -6}px)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)    cardRef.current.style.transform    = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glareRef.current)   glareRef.current.style.opacity    = '0'
    if (contentRef.current) contentRef.current.style.transform = 'translateX(0) translateY(0)'
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
      {/* BG */}
      <div className="c3d-bg">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="c3d-img" />
        ) : (
          <div className="c3d-placeholder" style={{
            background: `radial-gradient(ellipse at 30% 40%, ${accent}22 0%, transparent 60%), linear-gradient(145deg,#0f0f0f,#1a1a1a)`
          }}>
            <span className="c3d-num">{String(index + 1).padStart(2, '0')}</span>
          </div>
        )}
        <div className="c3d-overlay" />
      </div>

      <div ref={glareRef}  className="c3d-glare"  />
      <div                 className="c3d-border" />

      {project.category && <div className="c3d-badge">{project.category}</div>}
      <div className="c3d-index">{String(index + 1).padStart(2, '0')}</div>

      <div className="c3d-lines">
        <div className="c3d-line" style={{ top: '35%' }} />
        <div className="c3d-line" style={{ top: '65%', opacity: 0.3 }} />
      </div>

      <div ref={contentRef} className="c3d-content">
        <h3 className="c3d-title">{project.title}</h3>
        {project.description && <p className="c3d-desc">{project.description}</p>}
        <div className="c3d-footer">
          <div className="c3d-tags">
            {tags.slice(0, 3).map((t: string) => (
              <span key={t} className="c3d-tag">{t.trim()}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="c3d-link" onClick={e => e.stopPropagation()}>
              Live <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}