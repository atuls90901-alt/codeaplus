'use client'
import { useEffect, useRef } from 'react'

const cases = [
  {
    client:    'TechVentures',
    industry:  'B2B SaaS',
    num:       '01',
    challenge: 'Outdated website bleeding qualified leads to competitors every month.',
    solution:  'Full Next.js redesign with automated lead capture, CRM integration, and conversion-optimised landing pages.',
    results:   [
      { metric: '3.2×', label: 'More Leads'     },
      { metric: '68%',  label: 'Bounce Rate ↓'  },
      { metric: '4 wks', label: 'Delivered'     },
    ],
    tag:       'Web App',
    // Tailwind-safe bg class instead of inline color
    iconBg:    'bg-[#1a3a5c]',
  },
  {
    client:    'StyleMart',
    industry:  'E-Commerce',
    num:       '02',
    challenge: 'Mobile conversion rate 3× below industry average — customers dropping off at checkout.',
    solution:  'Mobile-first MERN stack rebuild with smart cart, one-tap checkout, and lazy-loaded product images.',
    results:   [
      { metric: '2.8×', label: 'Revenue ↑'      },
      { metric: '45%',  label: 'Mobile Conv. ↑' },
      { metric: '6 wks', label: 'Delivered'     },
    ],
    tag:       'E-Commerce',
    iconBg:    'bg-[#1a2e1a]',
  },
  {
    client:    'NovaBuild',
    industry:  'Construction',
    num:       '03',
    challenge: 'Zero online presence — losing high-value contracts to digital-first competitors daily.',
    solution:  'Premium brochure site with instant quote system, project gallery, and WhatsApp lead capture.',
    results:   [
      { metric: '12×',  label: 'Online Inquiries' },
      { metric: '₹8L',  label: 'First Month Rev.' },
      { metric: '3 wks', label: 'Delivered'       },
    ],
    tag:       'Business Site',
    iconBg:    'bg-[#2e1a0a]',
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
    <section
      ref={ref}
      id="cases"
      className="bg-bg-primary py-14 md:py-20 lg:py-28 px-4 sm:px-8 md:px-16"
    >

      {/* ── Header ── */}
      <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10 md:mb-14 flex-wrap">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3 flex items-center gap-3">
            Case Studies
            <span className="w-10 h-px bg-gold/25" />
          </div>
          <h2 className="font-cormorant font-light leading-[1.05] text-white
            text-[clamp(34px,5vw,68px)]">
            Proof Over{' '}
            <em className="text-gold italic">Promises</em>
          </h2>
        </div>
        <p className="text-[13px] md:text-[14px] text-white/35 font-light leading-[1.7]
          max-w-[260px] sm:text-right">
          Every number is pulled from real client data —<br className="hidden sm:block" />
          no estimates, no projections.
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="flex flex-col gap-4">
        {cases.map((c, i) => (
          <div
            key={i}
            className={`reveal delay-${i + 1}
              border border-gold/10 hover:border-gold/25
              bg-white/[0.01] hover:bg-white/[0.02]
              overflow-hidden transition-all duration-300 group`}
          >

            {/* Top strip */}
            <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-2.5
              border-b border-gold/[0.08] bg-gold/[0.03]">
              <span className="font-mono text-[10px] text-gold/40 tracking-[0.1em]">
                {c.num}
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase
                text-bg-primary bg-gold px-2.5 py-1">
                {c.tag}
              </span>
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase
                text-white/30 ml-auto hidden sm:block">
                {c.industry}
              </span>
            </div>

            {/* Body grid — 3 col desktop, stacked mobile */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_220px] lg:grid-cols-[200px_1fr_260px]">

              {/* Col 1 — Client */}
              <div className="flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-2.5
                p-5 md:p-7 border-b md:border-b-0 md:border-r border-gold/[0.08]">

                {/* Icon badge — Tailwind class, no inline style */}
                <div className={`
                  ${c.iconBg}
                  w-12 h-12 md:w-[48px] md:h-[48px]
                  rounded-[10px] border border-gold/20
                  flex items-center justify-center flex-shrink-0 md:mb-2`}>
                  <span className="font-cormorant text-[22px] font-semibold text-gold">
                    {c.client[0]}
                  </span>
                </div>

                <div>
                  <div className="font-cormorant text-[20px] md:text-[24px] font-normal
                    text-white/90 leading-tight tracking-[0.02em]">
                    {c.client}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30 mt-0.5">
                    {c.industry}
                  </div>
                </div>
              </div>

              {/* Col 2 — Challenge + Solution */}
              <div className="flex flex-col gap-5 p-5 md:p-7
                border-b md:border-b-0 md:border-r border-gold/[0.08]">

                <div>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1.5">
                    Challenge
                  </div>
                  <p className="text-[13px] md:text-[14px] font-light text-white/45 leading-[1.7]">
                    {c.challenge}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold mb-1.5">
                    Our Solution
                  </div>
                  <p className="text-[13px] md:text-[14px] font-light text-white/78 leading-[1.7]">
                    {c.solution}
                  </p>
                </div>
              </div>

              {/* Col 3 — Results */}
              <div className="p-5 md:p-7">
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mb-4">
                  Results
                </div>
                <div className="flex flex-row md:flex-col flex-wrap gap-x-6 gap-y-3 md:gap-4">
                  {c.results.map((r, j) => (
                    <div key={j} className="flex items-baseline gap-2.5">
                      <div className="font-cormorant text-[26px] md:text-[32px] font-normal
                        text-gold leading-none">
                        {r.metric}
                      </div>
                      <div className="font-mono text-[9px] md:text-[10px] tracking-[0.12em]
                        uppercase text-white/50">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivered badge — bottom of results col */}
                <div className="mt-5 md:mt-6 pt-4 md:pt-5 border-t border-gold/[0.08]
                  flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400
                    shadow-[0_0_6px_rgba(74,222,128,0.5)] animate-blink-dot" />
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30">
                    Project Completed
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="reveal text-center mt-12 md:mt-16 pt-10 md:pt-14 border-t border-gold/[0.08]">
        <p className="text-[14px] md:text-[15px] text-white/40 font-light mb-6">
          Your business could be the next success story.
        </p>
        <a
          href="#contact"
          className="
            relative overflow-hidden group
            inline-flex items-center justify-center
            font-mono text-[11px] tracking-[0.22em] uppercase
            text-bg-primary bg-gold
            px-10 md:px-12 py-4
            w-full sm:w-auto max-w-[320px]
            transition-all hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
            group-hover:scale-x-100 transition-transform duration-300" />
          <span className="relative z-10">Start Your Project →</span>
        </a>
      </div>

    </section>
  )
}