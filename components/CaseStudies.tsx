'use client'
import { useEffect, useRef } from 'react'

const cases = [
  {
    client: 'TechVentures', industry: 'B2B SaaS',
    challenge: 'Outdated website losing leads to competitors',
    solution: 'Full Next.js redesign with lead capture system',
    results: [{ metric: '3.2×', label: 'More Leads' }, { metric: '68%', label: 'Bounce Rate ↓' }, { metric: '4 weeks', label: 'Delivered In' }],
    tag: 'Web App',
  },
  {
    client: 'StyleMart', industry: 'E-Commerce',
    challenge: 'Low conversion rate on mobile devices',
    solution: 'Mobile-first MERN stack e-commerce rebuild',
    results: [{ metric: '2.8×', label: 'Revenue ↑' }, { metric: '45%', label: 'Mobile Conv. ↑' }, { metric: '6 weeks', label: 'Delivered In' }],
    tag: 'E-Commerce',
  },
  {
    client: 'NovaBuild', industry: 'Construction',
    challenge: 'No online presence, losing clients to digital-first competitors',
    solution: 'Premium brochure site + quote request system',
    results: [{ metric: '12×', label: 'Online Inquiries' }, { metric: '₹8L', label: 'First Month Revenue' }, { metric: '3 weeks', label: 'Delivered In' }],
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
    <section ref={ref} id="cases" className="py-20 md:py-32 px-6 md:px-16 bg-[#060606]">
      <div className="reveal flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16">
        <div>
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
            Case Studies <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
          </div>
          <h2 className="font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05]">
            Real Results, <em className="italic text-gold">Real Clients</em>
          </h2>
        </div>
        <div className="font-mono text-[10px] tracking-[.15em] uppercase text-white/30">
          Verified outcomes<br/>from actual projects
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        {cases.map((c, i) => (
          <div key={i} className={`reveal delay-${i}`}
            style={{ border: '1px solid rgba(201,168,76,0.08)' }}>
            {/* Mobile: stacked, Desktop: 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{background:'rgba(201,168,76,0.08)'}}>
              {/* Client */}
              <div className="bg-[#060606] p-6 md:p-8 flex flex-row md:flex-col justify-between md:justify-start gap-4 md:gap-0">
                <div>
                  <div className="font-mono text-[9px] tracking-[.2em] uppercase text-gold mb-2">{c.tag}</div>
                  <div className="font-cormorant text-[24px] md:text-[28px] font-light mb-1">{c.client}</div>
                  <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/40">{c.industry}</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded flex items-center justify-center flex-shrink-0 md:mt-6"
                  style={{ background: 'linear-gradient(135deg,#0a1628,#1a3a5c)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <span className="font-cormorant text-lg font-semibold text-gold">{c.client[0]}</span>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="bg-[#060606] p-6 md:p-8">
                <div className="mb-4 md:mb-6">
                  <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30 mb-2">Challenge</div>
                  <p className="text-[13px] md:text-[14px] font-light text-white/60 leading-[1.7]">{c.challenge}</p>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[.2em] uppercase text-gold mb-2">Our Solution</div>
                  <p className="text-[13px] md:text-[14px] font-light text-white/80 leading-[1.7]">{c.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="bg-[#060606] p-6 md:p-8">
                <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30 mb-4 md:mb-6">Results</div>
                <div className="flex flex-row md:flex-col gap-6 md:gap-5 flex-wrap">
                  {c.results.map((r, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="font-cormorant text-[28px] md:text-[32px] font-light text-gold leading-none">{r.metric}</div>
                      <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/50 leading-relaxed">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal text-center mt-10 md:mt-14">
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