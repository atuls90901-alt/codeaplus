'use client'
import { useEffect, useRef } from 'react'

const services = [
  {
    num: '01',
    icon: '🌐',
    title: 'Website Design & Development',
    desc: 'Premium responsive websites with stunning UI/UX. Built with Next.js for blazing speed and SEO.',
    tags: ['Next.js', 'Tailwind', 'CMS'],
  },
  {
    num: '02',
    icon: '⚙️',
    title: 'Full Stack Web App',
    desc: 'End-to-end MERN stack applications with auth, dashboards, APIs and admin panels.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    num: '03',
    icon: '🛒',
    title: 'E-Commerce Store',
    desc: 'High-converting online stores with payment gateway, inventory and order management.',
    tags: ['Razorpay', 'Stripe', 'Cart'],
  },
  {
    num: '04',
    icon: '🔌',
    title: 'API Development',
    desc: 'Robust REST & GraphQL APIs with proper auth, rate limiting and documentation.',
    tags: ['REST', 'GraphQL', 'JWT'],
  },
  {
    num: '05',
    icon: '🛠️',
    title: 'Website Maintenance',
    desc: 'Regular updates, performance optimization, bug fixes and 24/7 uptime monitoring.',
    tags: ['Support', 'Updates', 'Monitoring'],
  },
  {
    num: '06',
    icon: '📱',
    title: 'UI/UX Design',
    desc: 'Beautiful, conversion-focused designs with Figma prototypes before development begins.',
    tags: ['Figma', 'Prototype', 'Design'],
  },
]

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
    <section ref={ref} id="services" className="bg-bg-secondary py-20 md:py-32 px-4 sm:px-8 md:px-16">

      {/* ── Header ── */}
      <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10 md:mb-16 flex-wrap">
        <div>
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
            What We Do
            <span className="w-10 h-px bg-gold/20" />
          </div>
          <h2 className="font-cormorant text-[clamp(36px,5vw,68px)] font-light leading-[1.05] text-white">
            Our <em className="italic text-gold">Services</em>
          </h2>
        </div>
        <p className="text-[13px] md:text-[14px] text-white/35 font-light leading-[1.7] max-w-[260px] sm:text-right">
          Everything you need to build and grow your digital presence.
        </p>
      </div>

      {/* ── Services Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.08)' }}>
        {services.map((s, i) => (
          <div key={s.num}
            className={`reveal delay-${i % 3} group relative bg-bg-secondary hover:bg-surface
              p-6 sm:p-7 md:p-8 transition-colors duration-300 overflow-hidden`}>

            {/* Hover gold left bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

            {/* Number */}
            <div className="font-mono text-[10px] text-gold/35 tracking-[.1em] mb-4">
              {s.num}
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{s.icon}</span>
              <h3 className="font-cormorant text-[20px] md:text-[22px] font-light text-white/90 leading-tight
                group-hover:text-white transition-colors">
                {s.title}
              </h3>
            </div>

            {/* Desc */}
            <p className="text-[13px] font-light text-white/45 leading-[1.7] mb-5
              group-hover:text-white/60 transition-colors">
              {s.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map(tag => (
                <span key={tag}
                  className="font-mono text-[9px] tracking-[.1em] uppercase
                    text-white/25 bg-white/[0.04] border border-white/[0.06]
                    group-hover:border-gold/15 group-hover:text-white/40
                    px-2 py-1 transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>

            {/* Hover arrow */}
            <div className="absolute bottom-6 right-6 text-gold/0 group-hover:text-gold/50
              text-sm font-mono transition-all duration-300 translate-x-1 group-hover:translate-x-0">
              →
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="reveal text-center mt-10 md:mt-14">
        <p className="text-[14px] text-white/35 font-light mb-5">
          Not sure what you need? Let's figure it out together.
        </p>
        <a href="#contact"
          className="relative overflow-hidden group inline-flex items-center justify-center
            font-mono text-[10px] tracking-[.22em] uppercase
            text-bg-primary bg-gold px-10 py-4
            w-full sm:w-auto max-w-[300px]
            hover:opacity-90 transition-opacity">
          <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          <span className="relative z-10">Get a Free Quote →</span>
        </a>
      </div>

    </section>
  )
}