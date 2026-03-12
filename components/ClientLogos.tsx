'use client'
import { useEffect, useRef } from 'react'

const clients = [
  { name: 'TechVentures', abbr: 'TV' },
  { name: 'StyleMart', abbr: 'SM' },
  { name: 'NovaBuild', abbr: 'NB' },
  { name: 'GrowthLabs', abbr: 'GL' },
  { name: 'PixelForge', abbr: 'PF' },
  { name: 'CloudNine', abbr: 'CN' },
  { name: 'SwiftScale', abbr: 'SS' },
  { name: 'ApexDigital', abbr: 'AD' },
]

export default function ClientLogos() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 px-16 bg-[#060606] border-y border-gold/8">
      <div className="reveal text-center font-mono text-[9px] tracking-[.3em] uppercase text-white/25 mb-10">
        Trusted by growing businesses across India
      </div>

      {/* Scrolling logos */}
      <div className="relative overflow-hidden">
        <div className="flex gap-12 items-center" style={{ animation: 'logoScroll 20s linear infinite' }}>
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0 group">
              {/* Logo mark */}
              <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-gold/40"
                style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <span className="font-cormorant text-[13px] font-semibold text-gold/60 group-hover:text-gold transition-colors">
                  {c.abbr}
                </span>
              </div>
              <span className="font-cormorant text-[18px] font-light text-white/25 group-hover:text-white/50 transition-colors whitespace-nowrap tracking-wide">
                {c.name}
              </span>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(90deg,#060606,transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(270deg,#060606,transparent)' }} />
      </div>

      <style>{`
        @keyframes logoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}