'use client'
import { useEffect, useRef } from 'react'

const clients = [
  { name: 'EzGrabs',     abbr: 'EZ', url: 'https://ezgrabs.com', tag: 'E-Commerce & Book Marketplace' },
  { name: 'Shilla Villa', abbr: 'SV', url: '#',                   tag: 'Resort & Hospitality' },
  { name: 'DevBlog',     abbr: 'DB', url: '#',                   tag: 'Developer Blog' },
  { name: 'ShopKart',    abbr: 'SK', url: '#',                   tag: 'Shopping App' },
  { name: 'TechVentures',abbr: 'TV', url: '#',                   tag: 'SaaS Startup' },
  { name: 'GrowthLabs',  abbr: 'GL', url: '#',                   tag: 'Digital Agency' },
  { name: 'NovaBuild',   abbr: 'NB', url: '#',                   tag: 'Construction' },
  { name: 'CloudNine',   abbr: 'CN', url: '#',                   tag: 'Web Platform' },
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

  const track = [...clients, ...clients, ...clients]

  return (
    <section
      ref={ref}
      className="bg-bg-primary border-y border-gold/[0.08] py-12 md:py-14 overflow-hidden"
    >

      {/* ── Header ── */}
      <div className="reveal flex items-center justify-center gap-4 md:gap-5 px-6 md:px-8 mb-8 md:mb-10">
        {/* Left line */}
        <span className="flex-1 max-w-[100px] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3))' }} />

        <span className="font-mono text-[10px] md:text-[11px] tracking-[.25em] md:tracking-[.3em] uppercase text-gold/65 whitespace-nowrap">
          Trusted by growing businesses
        </span>

        {/* Right line */}
        <span className="flex-1 max-w-[100px] h-px"
          style={{ background: 'linear-gradient(270deg, transparent, rgba(201,168,76,0.3))' }} />
      </div>

      {/* ── Scrolling Strip ── */}
      <div className="relative overflow-hidden">

        {/* Track */}
        <div className="flex gap-3 items-stretch w-max py-1.5 pb-2.5
          animate-logo-scroll hover:[animation-play-state:paused]">
          {track.map((c, i) => {
            const isLive = c.url !== '#'
            const Tag = isLive ? 'a' : 'div'
            return (
              <Tag
                key={i}
                {...(isLive ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-3 md:gap-3.5 flex-shrink-0
                  px-3 md:px-[22px] py-3 md:py-3.5 pl-3 md:pl-3.5
                  border border-gold/[0.12] bg-white/[0.02] rounded-[3px]
                  transition-all duration-300
                  hover:border-gold/40 hover:bg-gold/[0.05] hover:-translate-y-0.5
                  cursor-default"
                style={isLive ? { cursor: 'pointer' } : {}}
              >
                {/* Abbr badge */}
                <div className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-md md:rounded-lg
                  flex items-center justify-center flex-shrink-0
                  bg-gold/[0.08] border border-gold/[0.18]
                  group-hover:bg-gold/[0.14] group-hover:border-gold/40
                  transition-all duration-300">
                  <span className="font-cormorant text-[13px] md:text-[16px] font-bold
                    text-gold/65 tracking-[.04em]
                    group-hover:text-gold transition-colors duration-300">
                    {c.abbr}
                  </span>
                </div>

                {/* Name + tag */}
                <div className="flex flex-col gap-[3px] md:gap-1">
                  <span className="font-cormorant text-[18px] md:text-[22px] font-medium
                    text-white/82 tracking-[.03em] whitespace-nowrap leading-[1.1]
                    group-hover:text-white transition-colors duration-300">
                    {c.name}
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] tracking-[.14em] md:tracking-[.16em]
                    uppercase text-gold/45 whitespace-nowrap
                    group-hover:text-gold/75 transition-colors duration-300">
                    {c.tag}
                  </span>
                </div>

                {/* Live dot */}
                {isLive && (
                  <span className="w-[7px] h-[7px] rounded-full bg-green-400 flex-shrink-0 ml-0.5
                    shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-blink-dot" />
                )}
              </Tag>
            )
          })}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-[60px] md:w-[120px] pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, #060606 30%, transparent)' }} />
        <div className="absolute top-0 bottom-0 right-0 w-[60px] md:w-[120px] pointer-events-none z-10"
          style={{ background: 'linear-gradient(270deg, #060606 30%, transparent)' }} />
      </div>

    </section>
  )
}