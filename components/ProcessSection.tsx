'use client'

const STEPS = [
  {
    num:     '01',
    title:   'Discovery Call',
    desc:    'We spend 30 minutes understanding your idea, goals, and constraints — not selling you anything. This call is free and honest.',
    icon:    '📞',
    time:    '30 min',
    timeLabel: 'Free call',
  },
  {
    num:     '02',
    title:   'Technical Blueprint',
    desc:    'We map out your entire product — architecture, tech stack, feature set, and development phases — before writing a single line of code.',
    icon:    '📐',
    time:    '48 hrs',
    timeLabel: 'Turnaround',
  },
  {
    num:     '03',
    title:   'Fixed-Price Proposal',
    desc:    'You get a detailed proposal with exact scope, timeline, and price. No hourly billing. No surprise invoices. Ever.',
    icon:    '📋',
    time:    '$0',
    timeLabel: 'No hidden fees',
  },
  {
    num:     '04',
    title:   'Agile Development',
    desc:    'We build in 2-week sprints with weekly demos. You see real progress, give feedback early, and stay in control throughout.',
    icon:    '⚡',
    time:    '2 wk',
    timeLabel: 'Sprint cycles',
  },
  {
    num:     '05',
    title:   'Launch & Scale',
    desc:    'We deploy, test, and monitor your product go live. Then we stay on for 30 days post-launch support — included in every project.',
    icon:    '🚀',
    time:    '30 days',
    timeLabel: 'Post-launch support',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="px-6 md:px-16 py-20 md:py-28 relative overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_50%_50%_at_0%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4
            font-mono text-[10px] tracking-[0.3em] uppercase
            text-gold/80 border border-gold/20 rounded-full px-4 py-[5px] bg-gold/[0.05]">
            How We Work
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-cormorant font-light leading-[1.0]
              text-[clamp(32px,5vw,60px)]">
              From Idea to Launch —
              <br />
              <em className="italic text-gold">No Guesswork</em>
            </h2>
            <p className="text-[14px] text-white/45 font-light leading-[1.8] max-w-sm md:text-right">
              A clear, founder-friendly process that keeps you in control
              and eliminates the anxiety of "what happens next."
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">

          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-[calc(50%-0.5px)] top-0 bottom-0
            w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={step.num}
                  className={`relative flex flex-col md:flex-row items-stretch gap-0
                    ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <div className="border border-gold/[0.1] bg-bg-secondary p-7
                      hover:border-gold/25 transition-all duration-300 group h-full">

                      <div className="flex items-start gap-5">
                        {/* Number */}
                        <div className="flex-shrink-0">
                          <div className="font-cormorant text-[48px] font-light leading-none
                            text-gold/20 group-hover:text-gold/40 transition-colors duration-300">
                            {step.num}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xl">{step.icon}</span>
                            <h3 className="font-cormorant text-[22px] font-light text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-[13px] text-white/50 font-light leading-[1.8] mb-5">
                            {step.desc}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="font-cormorant text-[24px] font-light text-gold">
                              {step.time}
                            </span>
                            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-white/30">
                              {step.timeLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot — desktop only */}
                  <div className="hidden md:flex items-center justify-center w-0 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-gold/20 border-2 border-gold/40
                      shadow-[0_0_12px_rgba(201,168,76,0.3)]" />
                  </div>

                  {/* Empty half */}
                  <div className="flex-1 hidden md:block" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border border-gold/20 bg-bg-secondary p-8 md:p-10
          flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px]
            bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div>
            <h3 className="font-cormorant text-[28px] font-light mb-2">
              Ready to start? <em className="italic text-gold">Let&apos;s talk.</em>
            </h3>
            <p className="text-[13px] text-white/40 font-light">
              Book a free 30-min discovery call. No pressure, no pitch.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="#contact"
              className="relative overflow-hidden group
                font-mono text-[11px] tracking-[0.2em] uppercase
                text-bg-primary bg-gold px-8 py-4 inline-block
                hover:-translate-y-0.5 transition-all duration-300">
              <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative z-10">Book Discovery Call →</span>
            </a>
            <a href="https://wa.me/918471090481"
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.2em] uppercase
                text-white/50 border border-gold/15
                hover:text-white hover:border-gold/40
                px-8 py-4 inline-block text-center transition-all duration-200">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}