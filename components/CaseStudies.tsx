'use client'
import { useEffect, useRef } from 'react'

const cases = [
  {
    client: 'TechVentures', industry: 'B2B SaaS', num: '01',
    challenge: 'Outdated website losing leads to competitors',
    solution: 'Full Next.js redesign with automated lead capture system',
    results: [{ metric: '3.2×', label: 'More Leads' }, { metric: '68%', label: 'Bounce Rate ↓' }, { metric: '4 wks', label: 'Delivered' }],
    tag: 'Web App', color: '#1a3a5c',
  },
  {
    client: 'StyleMart', industry: 'E-Commerce', num: '02',
    challenge: 'Low conversion rate on mobile devices',
    solution: 'Mobile-first MERN stack e-commerce rebuild with smart cart',
    results: [{ metric: '2.8×', label: 'Revenue ↑' }, { metric: '45%', label: 'Mobile Conv. ↑' }, { metric: '6 wks', label: 'Delivered' }],
    tag: 'E-Commerce', color: '#1a2e1a',
  },
  {
    client: 'NovaBuild', industry: 'Construction', num: '03',
    challenge: 'No online presence, losing clients to digital-first competitors',
    solution: 'Premium brochure site with instant quote request system',
    results: [{ metric: '12×', label: 'Online Inquiries' }, { metric: '₹8L', label: 'First Month' }, { metric: '3 wks', label: 'Delivered' }],
    tag: 'Business Site', color: '#2e1a0a',
  },
]

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="cases" className="bg-bg-primary py-14 md:py-20 lg:py-24 px-4 sm:px-8 md:px-16">

      {/* ── Header ── */}
      <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10 md:mb-14 flex-wrap">
        <div>
          {/* Eyebrow */}
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
            Case Studies
            <span className="w-10 h-px bg-gold/25" />
          </div>
          {/* Title */}
          <h2 className="font-cormorant text-[clamp(34px,5vw,68px)] font-light leading-[1.05] text-white">
            Real Results, <em className="text-gold italic">Real Clients</em>
          </h2>
        </div>
        <p className="text-[13px] md:text-[14px] text-white/35 font-light leading-[1.7] max-w-[260px] sm:text-right">
          Verified outcomes from actual projects — no fluff, just numbers.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="flex flex-col gap-4">
        {cases.map((c, i) => (
          <div key={i} className="reveal border border-gold/10 hover:border-gold/25 bg-white/[0.01] hover:bg-white/[0.02] overflow-hidden transition-all duration-300">

            {/* Strip */}
            <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-2.5 border-b border-gold/[0.08] bg-gold/[0.03]">
              <span className="font-mono text-[10px] text-gold/40 tracking-[.1em]">{c.num}</span>
              <span className="font-mono text-[9px] tracking-[.18em] uppercase text-bg-primary bg-gold px-2.5 py-1">
                {c.tag}
              </span>
              <span className="font-mono text-[9px] tracking-[.15em] uppercase text-white/30 ml-auto hidden sm:block">
                {c.industry}
              </span>
            </div>

            {/* Body — 3 col desktop, stacked mobile */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_220px] lg:grid-cols-[200px_1fr_240px]">

              {/* Col 1 — Client */}
              <div className="flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-2.5 p-5 md:p-7 md:border-r border-b md:border-b-0 border-gold/[0.08]">
                <div className="w-12 h-12 md:w-[48px] md:h-[48px] rounded-[10px] border border-gold/20 flex items-center justify-center flex-shrink-0 md:mb-2"
                  style={{ background: `linear-gradient(135deg, ${c.color}, rgba(201,168,76,0.08))` }}>
                  <span className="font-cormorant text-[22px] font-semibold text-gold">{c.client[0]}</span>
                </div>
                <div>
                  <div className="font-cormorant text-[22px] md:text-[26px] font-normal text-white/90 leading-tight tracking-[.02em]">
                    {c.client}
                  </div>
                  <div className="font-mono text-[9px] tracking-[.15em] uppercase text-white/30 mt-0.5">
                    {c.industry}
                  </div>
                </div>
              </div>

              {/* Col 2 — Challenge + Solution */}
              <div className="flex flex-col gap-5 p-5 md:p-7 border-b md:border-b-0 md:border-r border-gold/[0.08]">
                <div>
                  <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30 mb-1.5">
                    Challenge
                  </div>
                  <p className="text-[13px] md:text-[14px] font-light text-white/45 leading-[1.7]">
                    {c.challenge}
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[.2em] uppercase text-gold mb-1.5">
                    Our Solution
                  </div>
                  <p className="text-[13px] md:text-[14px] font-light text-white/78 leading-[1.7]">
                    {c.solution}
                  </p>
                </div>
              </div>

              {/* Col 3 — Results */}
              <div className="p-5 md:p-7">
                <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30 mb-4">
                  Results
                </div>
                <div className="flex flex-row md:flex-col flex-wrap gap-x-6 gap-y-3 md:gap-3">
                  {c.results.map((r, j) => (
                    <div key={j} className="flex items-baseline gap-2.5">
                      <div className="font-cormorant text-[28px] md:text-[34px] font-normal text-gold leading-none">
                        {r.metric}
                      </div>
                      <div className="font-mono text-[9px] md:text-[10px] tracking-[.12em] uppercase text-white/50">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="reveal text-center mt-12 md:mt-16 pt-10 md:pt-14 border-t border-gold/[0.08]">
        <p className="text-[15px] md:text-[16px] text-white/40 font-light mb-6">
          Your business could be the next success story.
        </p>
        <a href="#contact"
          className="relative overflow-hidden group inline-flex items-center justify-center font-mono text-[11px] tracking-[.22em] uppercase text-bg-primary bg-gold px-10 md:px-12 py-4 w-full sm:w-auto max-w-[320px] transition-all hover:-translate-y-0.5">
          <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          <span className="relative z-10">Start Your Project →</span>
        </a>
      </div>

    </section>
  )
}