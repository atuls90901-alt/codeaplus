'use client'
import { useEffect, useRef } from 'react'

const cases = [
  {
    client: 'TechVentures',
    industry: 'B2B SaaS',
    challenge: 'Outdated website losing leads to competitors',
    solution: 'Full Next.js redesign with lead capture system',
    results: [
      { metric: '3.2×', label: 'More Leads' },
      { metric: '68%', label: 'Bounce Rate ↓' },
      { metric: '4 weeks', label: 'Delivered In' },
    ],
    gradient: 'linear-gradient(135deg,#0a1628,#1a3a5c)',
    tag: 'Web App',
  },
  {
    client: 'StyleMart',
    industry: 'E-Commerce',
    challenge: 'Low conversion rate on mobile devices',
    solution: 'Mobile-first MERN stack e-commerce rebuild',
    results: [
      { metric: '2.8×', label: 'Revenue ↑' },
      { metric: '45%', label: 'Mobile Conv. ↑' },
      { metric: '6 weeks', label: 'Delivered In' },
    ],
    gradient: 'linear-gradient(135deg,#1a0a28,#3c1a5c)',
    tag: 'E-Commerce',
  },
  {
    client: 'NovaBuild',
    industry: 'Construction',
    challenge: 'No online presence, losing clients to digital-first competitors',
    solution: 'Premium brochure site + quote request system',
    results: [
      { metric: '12×', label: 'Online Inquiries' },
      { metric: '₹8L', label: 'First Month Revenue' },
      { metric: '3 weeks', label: 'Delivered In' },
    ],
    gradient: 'linear-gradient(135deg,#1a1208,#3d2e0a)',
    tag: 'Business Site',
  },
]

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="cases" className="py-32 px-16 bg-[#060606]">
      {/* Header */}
      <div className="reveal flex justify-between items-end mb-16">
        <div>
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
            Case Studies <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
          </div>
          <h2 className="font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05]">
            Real Results, <em className="italic text-gold">Real Clients</em>
          </h2>
        </div>
        <div className="font-mono text-[10px] tracking-[.15em] uppercase text-white/30 text-right">
          Verified outcomes<br />from actual projects
        </div>
      </div>

      {/* Cases */}
      <div className="flex flex-col gap-6">
        {cases.map((c, i) => (
          <div key={i} className={`reveal delay-${i} grid grid-cols-[1fr_1.5fr_1fr] gap-px`}
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.08)' }}>

            {/* Left — Client */}
            <div className="bg-[#060606] p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[9px] tracking-[.2em] uppercase text-gold mb-4">{c.tag}</div>
                <div className="font-cormorant text-[28px] font-light mb-2">{c.client}</div>
                <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40">{c.industry}</div>
              </div>
              <div className="w-12 h-12 rounded flex items-center justify-center mt-6"
                style={{ background: c.gradient, border: '1px solid rgba(201,168,76,0.15)' }}>
                <span className="font-cormorant text-lg font-semibold text-gold">
                  {c.client[0]}
                </span>
              </div>
            </div>

            {/* Middle — Challenge & Solution */}
            <div className="bg-[#060606] p-8">
              <div className="mb-6">
                <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30 mb-2">Challenge</div>
                <p className="text-[14px] font-light text-white/60 leading-[1.7]">{c.challenge}</p>
              </div>
              <div>
                <div className="font-mono text-[9px] tracking-[.2em] uppercase text-gold mb-2">Our Solution</div>
                <p className="text-[14px] font-light text-white/80 leading-[1.7]">{c.solution}</p>
              </div>
            </div>

            {/* Right — Results */}
            <div className="bg-[#060606] p-8">
              <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30 mb-6">Results</div>
              <div className="flex flex-col gap-5">
                {c.results.map((r, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div className="font-cormorant text-[32px] font-light text-gold leading-none">{r.metric}</div>
                    <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/50 leading-relaxed">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="reveal text-center mt-14">
        <p className="text-[15px] text-white/40 font-light mb-5">Your business could be the next success story.</p>
        <a href="#contact"
          className="font-mono text-[11px] tracking-[.2em] uppercase text-[#060606] bg-gold px-10 py-4 inline-block relative overflow-hidden group">
          <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          <span className="relative z-10">Start Your Project →</span>
        </a>
      </div>
    </section>
  )
}