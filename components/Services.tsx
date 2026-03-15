'use client'
import { useEffect, useRef } from 'react'

const services = [
  {
    num:   '01',
    icon:  '🚀',
    title: 'SaaS MVP Development',
    desc:  'Go from idea to live product in 4–6 weeks. Auth, billing, dashboards, onboarding — everything to land your first 100 users.',
    tags:  ['MERN Stack', 'Stripe', 'Auth'],
    price: 'From $4,000',
    hot:   true,
  },
  {
    num:   '02',
    icon:  '🛒',
    title: 'Marketplace Platform',
    desc:  'Two-sided marketplaces with buyer/seller flows, escrow payments, review systems, and admin dashboards.',
    tags:  ['Next.js', 'MongoDB', 'Stripe Connect'],
    price: 'From $5,000',
    hot:   false,
  },
  {
    num:   '03',
    icon:  '⚡',
    title: 'Startup Web Platform',
    desc:  'Complex platforms for funded startups — multi-role access, real-time features, and infrastructure built to raise your Series A.',
    tags:  ['Next.js', 'Socket.io', 'AWS'],
    price: 'From $8,000',
    hot:   false,
  },
  {
    num:   '04',
    icon:  '🛍️',
    title: 'E-Commerce Store',
    desc:  'High-converting storefronts built mobile-first. One-tap checkout, inventory management, and analytics baked in.',
    tags:  ['Next.js', 'Razorpay', 'Stripe'],
    price: 'From $3,000',
    hot:   false,
  },
  {
    num:   '05',
    icon:  '🔌',
    title: 'API & Backend',
    desc:  'Robust REST & GraphQL APIs with rate limiting, JWT auth, webhooks, and full Postman documentation.',
    tags:  ['Node.js', 'GraphQL', 'JWT'],
    price: 'From $2,500',
    hot:   false,
  },
  {
    num:   '06',
    icon:  '🎨',
    title: 'UI/UX Design',
    desc:  'Figma-first design process — wireframes, interactive prototypes, and design systems before a single line of code.',
    tags:  ['Figma', 'Prototype', 'Design System'],
    price: 'From $1,500',
    hot:   false,
  },
]

/* globals.css has delay-1 … delay-5 only — map safely */
const DELAYS = ['delay-1', 'delay-2', 'delay-3', 'delay-1', 'delay-2', 'delay-3'] as const

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="services"
      className="bg-bg-secondary py-20 md:py-32 px-4 sm:px-8 md:px-16"
    >

      {/* ── Header ── */}
      <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end
        gap-5 mb-10 md:mb-16 flex-wrap">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3
            flex items-center gap-3">
            What We Build
            <span className="w-10 h-px bg-gold/20" />
          </div>
          <h2 className="font-cormorant font-light leading-[1.05] text-white
            text-[clamp(36px,5vw,68px)]">
            Premium <em className="italic text-gold">Packages</em>
            <br className="hidden sm:block" />
            for Serious Founders
          </h2>
        </div>
        <p className="text-[13px] md:text-[14px] text-white/35 font-light leading-[1.7]
          max-w-[260px] sm:text-right">
          Not templates. Not WordPress.<br />
          Bespoke products engineered for scale.
        </p>
      </div>

      {/* ── Services Grid ──
          Border trick: outer border on section wrapper,
          inner dividers via [&>*] border classes — zero inline style
      ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        border border-gold/[0.08]">
        {services.map((s, i) => (
          <div
            key={s.num}
            className={`reveal ${DELAYS[i]}
              group relative
              bg-bg-secondary hover:bg-surface
              p-6 sm:p-7 md:p-8
              border-b border-r border-gold/[0.08]
              transition-colors duration-300 overflow-hidden`}
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold
              scale-y-0 group-hover:scale-y-100
              transition-transform duration-300 origin-center" />

            {/* Top row — num + hot badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-gold/35 tracking-[0.1em]">
                {s.num}
              </span>
              {s.hot && (
                <span className="font-mono text-[8px] tracking-[0.15em] uppercase
                  text-bg-primary bg-gold px-2 py-0.5">
                  Most Requested
                </span>
              )}
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">
                {s.icon}
              </span>
              <h3 className="font-cormorant text-[20px] md:text-[22px] font-light
                text-white/90 leading-tight
                group-hover:text-white transition-colors duration-300">
                {s.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-[13px] font-light text-white/45 leading-[1.7] mb-5
              group-hover:text-white/60 transition-colors duration-300">
              {s.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {s.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.1em] uppercase
                    text-white/25 bg-white/[0.04] border border-white/[0.06]
                    group-hover:border-gold/15 group-hover:text-white/40
                    px-2 py-1 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price + Arrow */}
            <div className="flex items-center justify-between pt-4 border-t border-gold/[0.08]">
              <span className="font-mono text-[10px] tracking-[0.1em] text-gold/60
                group-hover:text-gold transition-colors duration-300">
                {s.price}
              </span>
              <span className="font-mono text-sm text-gold/0 group-hover:text-gold/60
                translate-x-1 group-hover:translate-x-0
                transition-all duration-300">
                →
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="reveal text-center mt-10 md:mt-14">
        <p className="text-[14px] text-white/35 font-light mb-5">
          Not sure which package fits? Let's figure it out — free consultation included.
        </p>
        <a
          href="#contact"
          className="relative overflow-hidden group
            inline-flex items-center justify-center
            font-mono text-[10px] tracking-[0.22em] uppercase
            text-bg-primary bg-gold
            px-10 py-4
            w-full sm:w-auto max-w-[300px]
            hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
            group-hover:scale-x-100 transition-transform duration-300" />
          <span className="relative z-10">Get a Free Consultation →</span>
        </a>
      </div>

    </section>
  )
}