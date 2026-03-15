'use client'
import Link from 'next/link'
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

export default function Portfolio({ projects = [] }: { projects: Project[] }) {
  const displayed = projects.slice(0, 6)

  return (
    <section id="work" className="bg-bg-primary py-20 md:py-32 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end
          gap-5 mb-10 md:mb-16 lg:mb-20 flex-wrap">
          <div>
            <span className="block font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3.5">
              Selected Work
            </span>
            <h2 className="font-cormorant font-light text-white leading-none
              text-[clamp(42px,6vw,84px)]">
              Work That{' '}
              <em className="text-gold italic">Speaks</em>
            </h2>
          </div>

          {projects.length > 6 && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em]
                uppercase text-white/35 hover:text-gold transition-colors duration-300
                pb-2 border-b border-gold/20 hover:border-gold/50 whitespace-nowrap"
            >
              View All ({projects.length}){' '}
              <span className="text-gold">→</span>
            </Link>
          )}
        </div>

        {/* ── Grid ── */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 lg:gap-6">
            {displayed.map((project, i) => (
              <Card3D key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 font-mono text-[11px] tracking-[0.15em]
            uppercase text-white/20">
            Projects coming soon...
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-12 md:mt-20 pt-10 md:pt-14 border-t border-gold/[0.08]">
          <Link
            href="/projects"
            className="relative overflow-hidden group
              inline-flex items-center justify-center gap-3.5
              font-mono text-[10px] tracking-[0.25em] uppercase
              text-bg-primary bg-gold
              px-10 md:px-14 py-4
              w-full sm:w-auto max-w-[340px]
              hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
              group-hover:scale-x-100 transition-transform duration-300" />
            <span className="relative z-10">View All Projects</span>
            <span className="relative z-10">→</span>
          </Link>

          <p className="mt-4 font-mono text-[10px] tracking-[0.1em] text-white/20">
            {projects.length} project{projects.length !== 1 ? 's' : ''} delivered
          </p>
        </div>

      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   3D TILT CARD
   Static classes → globals.css (.c3d-*)
   Mouse-tracking transform stays in JS
   (can't be done in Tailwind — needs live values)
════════════════════════════════════════════ */
function Card3D({ project, index }: { project: Project; index: number }) {
  const cardRef    = useRef<HTMLDivElement>(null)
  const glareRef   = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  /* ── Mouse move — 3D tilt (JS-only, unavoidable) ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card    = cardRef.current
    const glare   = glareRef.current
    const content = contentRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const cx   = rect.width  / 2
    const cy   = rect.height / 2
    const dx   = (x - cx) / cx
    const dy   = (y - cy) / cy

    card.style.transform =
      `perspective(900px) rotateX(${-dy * 12}deg) rotateY(${dx * 18}deg) scale3d(1.03,1.03,1.03)`

    if (glare) {
      const px = (x / rect.width)  * 100
      const py = (y / rect.height) * 100
      glare.style.background =
        `radial-gradient(circle at ${px}% ${py}%, rgba(201,168,76,0.18) 0%, transparent 65%)`
      glare.style.opacity = '1'
    }

    if (content) {
      content.style.transform = `translateX(${dx * -8}px) translateY(${dy * -6}px)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    if (glareRef.current)
      glareRef.current.style.opacity = '0'
    if (contentRef.current)
      contentRef.current.style.transform = 'translateX(0) translateY(0)'
  }, [])

  const tags = project.tags
    ? (Array.isArray(project.tags)
        ? project.tags
        : String(project.tags).split(','))
    : []

  const padded = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={cardRef}
      className="c3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── Background image / placeholder ── */}
      <div className="c3d-bg">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="c3d-img"
          />
        ) : (
          /* Placeholder — pure Tailwind, no inline style */
          <div className="c3d-placeholder bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
            <span className="c3d-num">{padded}</span>
          </div>
        )}
        <div className="c3d-overlay" />
      </div>

      {/* Glare + border (CSS classes handle appearance) */}
      <div ref={glareRef} className="c3d-glare" />
      <div               className="c3d-border" />

      {/* Category badge */}
      {project.category && (
        <div className="c3d-badge">{project.category}</div>
      )}

      {/* Index number */}
      <div className="c3d-index">{padded}</div>

      {/* Decorative lines — position via Tailwind, no inline top */}
      <div className="c3d-lines">
        <div className="c3d-line top-[35%]" />
        <div className="c3d-line top-[65%] opacity-30" />
      </div>

      {/* Content */}
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

    </div>
  )
}