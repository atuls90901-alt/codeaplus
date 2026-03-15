'use client'
import { useEffect, useRef } from 'react'

const clients = [
  { name: 'EzGrabs',      abbr: 'EZ', url: 'https://ezgrabs.com', tag: 'E-Commerce & Book Marketplace' },
  { name: 'Shilla Villa', abbr: 'SV', url: '#',                   tag: 'Resort & Hospitality'          },
  { name: 'DevBlog',      abbr: 'DB', url: '#',                   tag: 'Developer Blog'                },
  { name: 'ShopKart',     abbr: 'SK', url: '#',                   tag: 'Shopping App'                  },
  { name: 'TechVentures', abbr: 'TV', url: '#',                   tag: 'SaaS Startup'                  },
  { name: 'GrowthLabs',   abbr: 'GL', url: '#',                   tag: 'Digital Agency'                },
  { name: 'NovaBuild',    abbr: 'NB', url: '#',                   tag: 'Construction'                  },
  { name: 'CloudNine',    abbr: 'CN', url: '#',                   tag: 'Web Platform'                  },
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

  /* 3× repeat so scroll loop is seamless */
  const track = [...clients, ...clients, ...clients]

  return (
    <section
      ref={ref}
      className="bg-bg-primary border-y border-gold/[0.08] py-10 md:py-14 overflow-hidden"
    >

      {/* ── Header ── */}
      <div className="reveal flex items-center justify-center gap-4 px-6 md:px-8 mb-8 md:mb-10">
        {/* Left line — pure Tailwind */}
        <span className="flex-1 max-w-[80px] md:max-w-[100px] h-px
          bg-gradient-to-r from-transparent to-gold/30" />

        <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em]
          uppercase text-gold/65 whitespace-nowrap">
          Trusted by growing businesses
        </span>

        {/* Right line */}
        <span className="flex-1 max-w-[80px] md:max-w-[100px] h-px
          bg-gradient-to-l from-transparent to-gold/30" />
      </div>

      {/* ── Scrolling Strip ── */}
      <div className="relative overflow-hidden">

        {/* Track */}
        <div className="
          flex items-stretch gap-2.5 md:gap-3 w-max py-1.5 pb-3
          animate-logo-scroll hover:[animation-play-state:paused]">

          {track.map((c, i) => {
            const isLive = c.url !== '#'

            return isLive ? (
              <a
                key={i}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-2.5 md:gap-3.5 flex-shrink-0
                  px-3 md:px-5 py-2.5 md:py-3.5
                  border border-gold/[0.12] bg-white/[0.02] rounded-[3px]
                  transition-all duration-300
                  hover:border-gold/40 hover:bg-gold/[0.05] hover:-translate-y-0.5
                  cursor-pointer"
              >
                <ClientCard c={c} isLive />
              </a>
            ) : (
              <div
                key={i}
                className="
                  group flex items-center gap-2.5 md:gap-3.5 flex-shrink-0
                  px-3 md:px-5 py-2.5 md:py-3.5
                  border border-gold/[0.12] bg-white/[0.02] rounded-[3px]
                  transition-all duration-300
                  hover:border-gold/40 hover:bg-gold/[0.05] hover:-translate-y-0.5
                  cursor-default"
              >
                <ClientCard c={c} isLive={false} />
              </div>
            )
          })}
        </div>

        {/* Fade edges — pure Tailwind */}
        <div className="
          absolute top-0 bottom-0 left-0 z-10 pointer-events-none
          w-[60px] md:w-[120px]
          bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="
          absolute top-0 bottom-0 right-0 z-10 pointer-events-none
          w-[60px] md:w-[120px]
          bg-gradient-to-l from-bg-primary to-transparent" />
      </div>

    </section>
  )
}

/* ── Extracted card content (avoids repeating JSX) ── */
function ClientCard({ c, isLive }: { c: typeof clients[0]; isLive: boolean }) {
  return (
    <>
      {/* Abbr badge */}
      <div className="
        w-8 h-8 md:w-10 md:h-10 rounded-md flex-shrink-0
        flex items-center justify-center
        bg-gold/[0.08] border border-gold/[0.18]
        group-hover:bg-gold/[0.14] group-hover:border-gold/40
        transition-all duration-300">
        <span className="
          font-cormorant text-[13px] md:text-[15px] font-bold
          text-gold/65 tracking-[0.04em]
          group-hover:text-gold transition-colors duration-300">
          {c.abbr}
        </span>
      </div>

      {/* Name + tag */}
      <div className="flex flex-col gap-[3px] md:gap-1">
        <span className="
          font-cormorant text-[17px] md:text-[21px] font-medium
          text-white/80 tracking-[0.03em] whitespace-nowrap leading-[1.1]
          group-hover:text-white transition-colors duration-300">
          {c.name}
        </span>
        <span className="
          font-mono text-[8px] md:text-[10px] tracking-[0.14em] md:tracking-[0.16em]
          uppercase text-gold/45 whitespace-nowrap
          group-hover:text-gold/70 transition-colors duration-300">
          {c.tag}
        </span>
      </div>

      {/* Live dot — only for live URLs */}
      {isLive && (
        <span className="
          w-[6px] h-[6px] md:w-[7px] md:h-[7px]
          rounded-full bg-green-400 flex-shrink-0 ml-0.5
          shadow-[0_0_8px_rgba(74,222,128,0.6)]
          animate-blink-dot" />
      )}
    </>
  )
}