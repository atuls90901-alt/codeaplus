'use client'
import { useEffect, useRef, useState } from 'react'

const IMG_LAPTOP = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
const IMG_PHONE  = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80'
const IMG_CARD   = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80'

const STATS = [
  { key: 'projects'     as const, target: 50, suffix: '+',  label: 'Projects Shipped' },
  { key: 'satisfaction' as const, target: 98, suffix: '%',  label: 'Satisfaction Rate' },
  { key: 'years'        as const, target: 3,  suffix: 'yr', label: 'Excellence'        },
]

const AVATARS = [
  { ini: 'AP', hue: 40 },
  { ini: 'PM', hue: 58 },
  { ini: 'RS', hue: 76 },
  { ini: 'NK', hue: 94 },
]

export default function Hero() {
  const [counts, setCounts]   = useState({ projects: 0, satisfaction: 0, years: 0 })
  const [mounted, setMounted] = useState(false)
  const hasAnimated           = useRef(false)
  const statsRef              = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted || hasAnimated.current) return
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return
      hasAnimated.current = true
      STATS.forEach(({ key, target }) => {
        let start = 0
        const tick = (ts: number) => {
          if (!start) start = ts
          const pr   = Math.min((ts - start) / 1400, 1)
          const ease = 1 - Math.pow(1 - pr, 3)
          setCounts(prev => ({ ...prev, [key]: Math.floor(ease * target) }))
          if (pr < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [mounted])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col px-6 md:px-16 overflow-hidden"
      suppressHydrationWarning
    >

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="absolute inset-0
          bg-[radial-gradient(ellipse_55%_60%_at_15%_50%,rgba(201,168,76,0.07)_0%,transparent_65%)]" />
        <div className="absolute inset-0
          bg-[radial-gradient(ellipse_35%_40%_at_80%_25%,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
      </div>

      {/* ── Orbs ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="
          absolute rounded-full blur-[24px]
          w-[380px] h-[380px] -left-[8%] top-[18%]
          bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]
          animate-[orbFloat1_12s_ease-in-out_infinite]" />
        <div className="
          absolute rounded-full blur-[20px]
          w-[200px] h-[200px] right-[18%] bottom-[12%]
          bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)]
          animate-[orbFloat3_10s_ease-in-out_infinite]" />
        <div className="
          absolute left-0 right-0 h-px top-[44%]
          bg-[linear-gradient(90deg,transparent_0%,rgba(201,168,76,0.07)_30%,rgba(201,168,76,0.13)_50%,rgba(201,168,76,0.07)_70%,transparent_100%)]
          animate-[streakPulse_6s_ease-in-out_infinite]" />
      </div>

      {/* ════════════════════════════════════════════
          CONTENT — full height flex column
          top: nav spacer
          middle: hero grid (grows to fill)
          bottom: stats bar
      ════════════════════════════════════════════ */}
      <div className="relative z-[5] flex flex-col flex-1 min-h-screen">

        {/* Nav spacer */}
        <div className="h-24 shrink-0" />

        {/* Hero grid — grows to fill available space */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-8">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow badge */}
            <div className="
              opacity-0 animate-fade-up [animation-delay:200ms]
              inline-flex items-center gap-2 mb-6 md:mb-8 self-start
              font-mono text-xxs tracking-[0.3em] uppercase text-gold/90
              border border-[var(--bdr)] rounded-full px-4 py-[5px]
              bg-[rgba(201,168,76,0.06)]"
            >
              <span className="
                inline-block w-1.5 h-1.5 rounded-full
                bg-green-400 shadow-[0_0_6px_#4ade80]
                animate-blink-dot" />
              Available for projects · 2026
            </div>

            {/* Headline */}
            <h1 className="
              opacity-0 animate-fade-up [animation-delay:350ms]
              font-cormorant font-light leading-[0.93] tracking-tight
              mb-7 md:mb-9
              text-[clamp(48px,9vw,108px)]"
            >
              <span className="block text-white">We Build</span>
              <span className="block">
                <em className="glitch italic text-gold" data-text="Startups.">Startups.</em>
              </span>
              <span className="block font-cormorant font-light italic line-through text-white/25 text-[65%]">
                Not Just Websites.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="
              opacity-0 animate-fade-up [animation-delay:500ms]
              font-outfit font-light leading-[1.75] text-white/50
              text-[clamp(14px,1.5vw,16px)] max-w-[420px] mb-8 md:mb-10"
            >
              CodeaPlus engineers{' '}
              <strong className="text-white/80 font-normal">
                SaaS MVPs, marketplace platforms,
              </strong>{' '}
              and custom web applications — turning ambitious ideas into fundable,
              scalable digital products.
            </p>

            {/* CTAs */}
            <div className="
              opacity-0 animate-fade-up [animation-delay:650ms]
              flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10 md:mb-0"
            >
              <a
                href="#contact"
                className="
                  relative overflow-hidden group
                  font-mono text-[11px] tracking-[0.15em] uppercase
                  text-bg-primary bg-gold px-8 py-4 inline-block"
              >
                <span className="
                  absolute inset-0 bg-white/10 scale-x-0 origin-left
                  group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative z-10">Start Your Project →</span>
              </a>
              <a
                href="#work"
                className="
                  relative group
                  font-mono text-[11px] tracking-[0.15em] uppercase
                  text-white/50 hover:text-gold transition-colors duration-200
                  flex items-center gap-3 py-4"
              >
                View Case Studies
                <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                <span className="absolute bottom-3 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            </div>

          </div>

          {/* ── RIGHT: Device Mockups ── */}
          <div
            className="relative h-[340px] md:h-[520px] hidden sm:block opacity-0 animate-fade-up-slow [animation-delay:450ms]"
            aria-hidden="true"
          >
            {/* Laptop */}
            <div className="absolute top-[5%] left-[5%] w-[74%] animate-float-a
              drop-shadow-[0_32px_48px_rgba(0,0,0,0.65)]">
              <div className="
                bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]
                border border-[var(--bdr)] rounded-t-[10px] p-2.5
                [transform:perspective(900px)_rotateY(-8deg)_rotateX(4deg)]">
                <div className="
                  bg-[#111] rounded-t-[5px] px-2.5 py-[7px]
                  flex items-center gap-1.5
                  border-b border-[rgba(201,168,76,0.08)]">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  <div className="flex-1 bg-[#1a1a1a] rounded-[3px] h-[15px] ml-2 px-2 flex items-center">
                    <div className="w-[55%] h-[3.5px] bg-[rgba(201,168,76,0.18)] rounded-sm" />
                  </div>
                </div>
                <div className="bg-bg-primary h-[185px] rounded-b-[5px] overflow-hidden relative">
                  <img
                    src={IMG_LAPTOP} alt="Website preview"
                    loading="lazy" decoding="async" width={600} height={185}
                    className="w-full h-full object-cover opacity-[0.88] block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,6,0.55)] via-transparent to-transparent" />
                  <div className="
                    absolute bottom-0 left-0 right-0
                    flex gap-3 px-3 py-[5px]
                    border-t border-[rgba(201,168,76,0.1)]
                    bg-[rgba(6,6,6,0.72)] backdrop-blur-sm">
                    {['50+', '98%', '3yr'].map(v => (
                      <div key={v} className="flex items-center gap-1">
                        <span className="font-mono text-[8px] font-semibold text-gold/90">{v}</span>
                        <div className="w-5 h-[1.5px] bg-[rgba(201,168,76,0.2)] rounded-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="
                bg-gradient-to-b from-[#222] to-[#161616]
                border border-[var(--bdr)] border-t-0 rounded-b-[8px] h-[13px]
                [transform:perspective(900px)_rotateY(-8deg)_rotateX(4deg)]" />
              <div className="
                bg-gradient-to-b from-[#1a1a1a] to-[#111]
                h-[7px] rounded-b-[20px] mx-[8%]
                shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />
            </div>

            {/* Phone */}
            <div className="absolute bottom-[5%] right-[2%] w-[27%] animate-float-b
              drop-shadow-[0_24px_40px_rgba(0,0,0,0.75)]">
              <div className="
                bg-gradient-to-br from-[#1e1e1e] to-[#0d0d0d]
                border border-[rgba(201,168,76,0.22)]
                rounded-[24px] px-2 pt-2.5 pb-2
                [transform:perspective(600px)_rotateY(6deg)_rotateX(-3deg)]">
                <div className="w-14 h-[7px] bg-[#111] rounded-[10px] mx-auto mb-2 border border-[rgba(201,168,76,0.1)]" />
                <div className="bg-bg-primary rounded-[16px] overflow-hidden h-[195px] relative">
                  <img
                    src={IMG_PHONE} alt="Mobile preview"
                    loading="lazy" decoding="async" width={200} height={195}
                    className="w-full h-full object-cover opacity-[0.88] block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,6,0.55)] via-transparent to-transparent" />
                </div>
                <div className="w-11 h-1 bg-[rgba(201,168,76,0.18)] rounded-[3px] mx-auto mt-2" />
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute top-[34%] right-[4%] w-[35%] animate-float-c
              drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)]">
              <div className="
                bg-[rgba(10,10,10,0.96)]
                border border-[rgba(201,168,76,0.22)]
                rounded-[12px] overflow-hidden
                [transform:perspective(500px)_rotateY(-4deg)]">
                <div className="px-3 py-[7px] border-b border-[rgba(201,168,76,0.1)] flex justify-between items-center">
                  <span className="font-mono text-[8px] tracking-[0.15em] text-gold/70">PORTFOLIO</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                </div>
                <div className="relative h-[72px] overflow-hidden">
                  <img
                    src={IMG_CARD} alt="Portfolio preview"
                    loading="lazy" decoding="async" width={200} height={72}
                    className="w-full h-full object-cover opacity-[0.84]"
                  />
                </div>
                <div className="px-3 py-[7px] flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="w-16 h-[3px] bg-white/45 rounded-sm" />
                    <div className="w-11 h-[2.5px] bg-gold/35 rounded-sm" />
                  </div>
                  <span className="font-mono text-[9px] text-gold/60">↗</span>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[260px] h-[260px] rounded-full pointer-events-none blur-[28px]
              bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
          </div>

        </div>

        {/* ════════════════════════════════════════════
            BOTTOM BAR — stats + avatar trust strip
            Always at bottom, never overlapping
        ════════════════════════════════════════════ */}
        <div
          ref={statsRef}
          className="
            shrink-0 pb-8 md:pb-10
            opacity-0 animate-fade-up [animation-delay:900ms]"
        >
          {/* Divider */}
          <div className="gold-line mb-7" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* Stats */}
            <div className="flex gap-8 md:gap-14">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-cormorant font-light leading-none text-[clamp(28px,4vw,44px)]">
                    {counts[s.key]}
                    <span className="text-gold">{s.suffix}</span>
                  </div>
                  <div className="font-mono text-2xs tracking-[0.2em] uppercase text-white/40 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Avatar trust strip — right side */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map(({ ini, hue }) => (
                  <div
                    key={ini}
                    className="
                      w-8 h-8 rounded-full
                      border border-[var(--bdr-h)]
                      flex items-center justify-center
                      font-mono text-2xs font-semibold text-gold/80"
                    style={{ background: `hsl(${hue},40%,18%)` }}
                  >
                    {ini}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-mono text-2xs tracking-[0.08em] uppercase text-white/50 leading-[1.6]">
                  Trusted by 50+ founders
                </p>
                <p className="font-mono text-2xs tracking-[0.08em] uppercase text-white/30">
                  India · UAE · US
                </p>
              </div>
            </div>

            {/* Scroll indicator — far right, desktop only */}
            <div className="hidden md:flex flex-col items-center gap-2 self-end pb-1">
              <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
              <div
                className="font-mono text-2xs tracking-[0.25em] uppercase text-white/40"
                style={{ writingMode: 'vertical-rl' }}
              >
                Scroll
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  )
}