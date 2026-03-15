'use client'
import Link from 'next/link'

const TOOLS = [
  {
    icon:    '🤖',
    label:   'Free',
    title:   'AI Project Planner',
    desc:    'Describe your startup idea. Get a full tech plan — stack, timeline, cost estimate — in 60 seconds.',
    href:    '/ai-project-planner',
    stat:    '60 sec',
    statLabel: 'to full plan',
    color:   'from-[#1a1a3e] to-[#0d0d1a]',
    accent:  'rgba(124,58,237,0.15)',
  },
  {
    icon:    '💰',
    label:   'Free',
    title:   'Startup Cost Calculator',
    desc:    'Select project type, features, and scale. See your real development cost update in real time.',
    href:    '/startup-cost',
    stat:    '$0',
    statLabel: 'to get estimate',
    color:   'from-[#0a1a0a] to-[#050d05]',
    accent:  'rgba(16,185,129,0.12)',
    popular: true,
  },
  {
    icon:    '🛠️',
    label:   'Free',
    title:   'Project Scope Builder',
    desc:    '4 questions. Get a complete scope document with cost range, timeline, and recommended tech stack.',
    href:    '/build-your-project',
    stat:    '4 steps',
    statLabel: 'to full scope',
    color:   'from-[#1a0e00] to-[#0d0700]',
    accent:  'rgba(201,168,76,0.12)',
  },
]

export default function ToolkitHighlight() {
  return (
    <section className="px-6 md:px-16 py-20 md:py-28 relative overflow-hidden">

      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-4
              font-mono text-[10px] tracking-[0.3em] uppercase
              text-gold/80 border border-gold/20 rounded-full px-4 py-[5px] bg-gold/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400
                shadow-[0_0_6px_rgba(74,222,128,0.5)] animate-blink-dot" />
              Free Startup Tools — No Signup Required
            </div>
            <h2 className="font-cormorant font-light leading-[1.0]
              text-[clamp(32px,5vw,60px)]">
              Plan Your Startup
              <br />
              <em className="italic text-gold">Before You Spend a Dollar</em>
            </h2>
          </div>
          <div className="md:text-right max-w-sm">
            <p className="text-[14px] text-white/45 font-light leading-[1.8]">
              Most founders waste months and money building the wrong thing.
              Our free tools help you get it right from day one.
            </p>
          </div>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {TOOLS.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group relative border border-gold/[0.1] bg-bg-secondary
                hover:border-gold/30 transition-all duration-300 overflow-hidden
                flex flex-col"
            >
              {/* Popular badge */}
              {tool.popular && (
                <div className="absolute top-0 left-0 right-0
                  font-mono text-[8px] tracking-[0.2em] uppercase
                  text-bg-primary bg-gold text-center py-1.5">
                  Most Used Tool
                </div>
              )}

              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-40`} />
              <div className="absolute inset-0 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${tool.accent} 0%, transparent 70%)` }} />

              <div className={`relative z-10 p-7 flex flex-col flex-1 ${tool.popular ? 'pt-10' : ''}`}>

                {/* Icon + label */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase
                    text-gold/70 border border-gold/20 px-2.5 py-1">
                    {tool.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-cormorant text-[24px] font-light text-white mb-3
                  group-hover:text-gold transition-colors duration-200">
                  {tool.title}
                </h3>

                {/* Desc */}
                <p className="text-[13px] text-white/50 font-light leading-[1.75] flex-1 mb-6">
                  {tool.desc}
                </p>

                {/* Stat + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-cormorant text-[28px] font-light text-gold leading-none">
                      {tool.stat}
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/30 mt-0.5">
                      {tool.statLabel}
                    </div>
                  </div>
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center
                    group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <span className="text-gold group-hover:text-bg-primary transition-colors duration-300
                      group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block transition-transform">
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row — more tools + social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5
          border border-gold/[0.08] bg-bg-secondary px-6 md:px-8 py-5">

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
              Also free:
            </span>
            {[
              { label: 'Starter Kits', href: '/starter-kits' },
              { label: 'Startup Lab', href: '/startup-lab' },
              { label: 'Templates', href: '/website-templates' },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-white/45 hover:text-gold transition-colors duration-200
                  flex items-center gap-1.5">
                {label} →
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex -space-x-2">
              {['AP', 'RS', 'MK', 'PD'].map((ini, i) => (
                <div key={ini}
                  className="w-7 h-7 rounded-full border border-gold/20
                    flex items-center justify-center font-mono text-[9px] text-gold/70"
                  style={{ background: `hsl(${40 + i * 15}, 40%, 15%)` }}>
                  {ini}
                </div>
              ))}
            </div>
            <div className="font-mono text-[9px] tracking-[0.08em] uppercase text-white/35">
              200+ founders used these tools this month
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}