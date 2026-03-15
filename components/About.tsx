'use client'
import { useEffect, useRef } from 'react'

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast Delivery',
    desc:  'Most projects shipped in 2–4 weeks. Daily updates, staging access from day one — no agency black boxes.',
  },
  {
    icon: '🔒',
    title: 'Security First',
    desc:  'JWT auth, encrypted data at rest, CORS, rate limiting, and security headers — baked in, not bolted on.',
  },
  {
    icon: '♾',
    title: 'Built to Scale',
    desc:  'Architecture designed to grow from 100 to 1,000,000 users without a rewrite.',
  },
  {
    icon: '🤝',
    title: 'Co-Founder Mindset',
    desc:  'We challenge your assumptions, improve your UX decisions, and treat your product like our own.',
  },
]

const CODE_LINES = [
  { indent: 0, tokens: [
    { t: '// Crafting your vision', c: 'text-white/25' },
  ]},
  { indent: 0, tokens: [
    { t: 'const ',   c: 'text-blue-300' },
    { t: 'project ', c: 'text-white/90' },
    { t: '= ',       c: 'text-white/50' },
    { t: 'await ',   c: 'text-blue-300' },
    { t: 'codeaplus', c: 'text-orange-300' },
    { t: '.build', c: 'text-orange-300' },
    { t: '({',     c: 'text-white/50' },
  ]},
  { indent: 1, tokens: [
    { t: 'stack', c: 'text-white/90' },
    { t: ': [',   c: 'text-white/50' },
    { t: "'Next.js'", c: 'text-green-300' },
    { t: ', ',        c: 'text-white/50' },
    { t: "'Node'",    c: 'text-green-300' },
    { t: '],',        c: 'text-white/50' },
  ]},
  { indent: 1, tokens: [
    { t: 'db',         c: 'text-white/90' },
    { t: ': ',         c: 'text-white/50' },
    { t: "'MongoDB'",  c: 'text-green-300' },
    { t: ',',          c: 'text-white/50' },
  ]},
  { indent: 1, tokens: [
    { t: 'deploy',   c: 'text-white/90' },
    { t: ': ',       c: 'text-white/50' },
    { t: "'Vercel'", c: 'text-green-300' },
    { t: ',',        c: 'text-white/50' },
  ]},
  { indent: 1, tokens: [
    { t: 'timeline', c: 'text-white/90' },
    { t: ': ',       c: 'text-white/50' },
    { t: "'2–4 wks'", c: 'text-green-300' },
    { t: ',',         c: 'text-white/50' },
  ]},
  { indent: 0, tokens: [{ t: '});', c: 'text-white/50' }]},
  { indent: 0, tokens: [] }, // blank line
  { indent: 0, tokens: [{ t: '// Result ✓', c: 'text-white/25' }]},
  { indent: 0, tokens: [
    { t: 'return ', c: 'text-blue-300' },
    { t: '{',       c: 'text-white/50' },
  ]},
  { indent: 1, tokens: [
    { t: 'quality', c: 'text-white/90' },
    { t: ': ',      c: 'text-white/50' },
    { t: "'exceptional'", c: 'text-gold' },
    { t: ',',            c: 'text-white/50' },
  ]},
  { indent: 1, tokens: [
    { t: 'client', c: 'text-white/90' },
    { t: ': ',     c: 'text-white/50' },
    { t: "'happy'", c: 'text-gold' },
    { t: ' ',      c: '' },
    { t: '|cursor|', c: '' }, // special cursor token
  ]},
  { indent: 0, tokens: [{ t: '};', c: 'text-white/50' }]},
]

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 md:py-32 px-6 md:px-16 bg-bg-secondary"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-center">

        {/* ════ LEFT — Code Visual ════ */}
        <div className="reveal-left relative">

          {/* Editor card */}
          <div className="bg-surface border border-gold/10 p-5 md:p-8 relative overflow-hidden">

            {/* Glow — pure Tailwind */}
            <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none rounded-full
              bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]" />

            {/* Editor window */}
            <div className="bg-bg-primary border border-white/5 rounded-md overflow-hidden">

              {/* Title bar */}
              <div className="h-[30px] bg-white/[0.03] border-b border-white/[0.04]
                flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <span className="font-mono text-[9px] text-white/20 ml-2 tracking-widest">
                  project.ts
                </span>
              </div>

              {/* Code body */}
              <div className="p-4 md:p-5 font-mono text-[11px] md:text-[12px] leading-[2] select-none">
                {CODE_LINES.map((line, li) => (
                  <div key={li} className={line.indent ? 'pl-4 md:pl-6' : ''}>
                    {line.tokens.length === 0
                      ? <span>&nbsp;</span>
                      : line.tokens.map((tok, ti) =>
                          tok.t === '|cursor|'
                            ? <span
                                key={ti}
                                className="inline-block w-0.5 h-3.5 bg-gold ml-0.5 align-middle animate-blink"
                              />
                            : <span key={ti} className={tok.c}>{tok.t}</span>
                        )
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom meta strip */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-blink-dot
                  shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                <span className="font-mono text-[9px] text-white/30 tracking-[0.15em] uppercase">
                  TypeScript · Ready to deploy
                </span>
              </div>
              <span className="font-mono text-[9px] text-gold/40 tracking-[0.1em]">
                codeaplus.pro
              </span>
            </div>
          </div>

          {/* Years badge */}
          <div className="
            absolute -bottom-5 -right-3 md:-right-5
            w-[90px] h-[90px] md:w-[130px] md:h-[130px]
            bg-gold border-4 border-bg-secondary
            flex flex-col items-center justify-center z-10">
            <div className="font-cormorant text-[28px] md:text-[40px] font-light text-bg-primary leading-none">
              3+
            </div>
            <div className="font-mono text-[7px] md:text-[8px] tracking-[0.1em] uppercase text-bg-primary text-center mt-1">
              Years of<br />Excellence
            </div>
          </div>

        </div>

        {/* ════ RIGHT — Content ════ */}
        <div className="reveal-right mt-8 md:mt-0">

          {/* Eyebrow */}
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3
            flex items-center gap-3">
            Who We Are
            <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
          </div>

          {/* Heading — stronger positioning */}
          <h2 className="font-cormorant font-light leading-[1.05] mb-5
            text-[clamp(34px,5vw,64px)]">
            We Think Like{' '}
            <em className="italic text-gold">Co-Founders,</em>
            <br />Not Contractors
          </h2>

          {/* Body — stronger copy */}
          <p className="text-[14px] md:text-[15px] font-light text-white/50 leading-[1.8] mb-8 md:mb-10">
            We're a boutique full-stack studio that goes beyond writing code. We challenge
            your assumptions, improve your architecture decisions, and ship products that
            solve real problems — fast.
          </p>

          {/* Feature cards */}
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`
                  reveal delay-${i + 1}
                  relative overflow-hidden
                  flex gap-4 md:gap-5 items-start
                  p-4 md:p-5
                  border border-gold/10
                  hover:border-gold/[0.38] hover:bg-gold/[0.02]
                  transition-all duration-300 group
                `}
              >
                {/* Left accent bar */}
                <div className="
                  absolute left-0 top-0 bottom-0 w-0.5 bg-gold
                  scale-y-0 group-hover:scale-y-100
                  transition-transform duration-300 origin-center" />

                <span className="text-lg mt-0.5 flex-shrink-0">{f.icon}</span>

                <div>
                  <h4 className="text-[13px] md:text-[14px] font-medium mb-1 text-white/90">
                    {f.title}
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-white/50 font-light leading-[1.65]">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}