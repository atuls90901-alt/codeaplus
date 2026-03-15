'use client'
import { useState } from 'react'
import Link from 'next/link'
import LeadForm from '@/components/toolkit/LeadForm'
import { STARTER_KITS_DATA, type StarterKit } from '@/lib/toolkit'

const DELAYS = ['delay-1','delay-2','delay-3','delay-4'] as const

export default function StarterKitsPage() {
  const [showLead, setShowLead] = useState<string | null>(null)

  return (
    <main className="bg-bg-primary min-h-screen">

      {/* Back */}
      <div className="px-6 md:px-16 pt-24 pb-0">
        <Link href="/"
          className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em]
            uppercase text-white/30 hover:text-gold transition-colors duration-200">
          ← Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-16 py-10 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <div className="max-w-[700px] relative z-10">
          <div className="inline-flex items-center gap-2 mb-5 font-mono text-[10px]
            tracking-[0.3em] uppercase text-gold/80 border border-gold/20
            rounded-full px-4 py-[5px] bg-gold/[0.05]">
            Pre-scoped · Fixed Price · Fast Launch
          </div>
          <h1 className="font-cormorant font-light leading-[1.0] mb-4
            text-[clamp(36px,6vw,72px)]">
            Startup <em className="italic text-gold">Starter Kits</em>
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-white/50 leading-[1.8]">
            Pre-scoped, battle-tested project kits. Pick yours, customise the features,
            and we'll build it — fast. Transparent pricing, zero surprises.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px]">
          {STARTER_KITS_DATA.map((kit: StarterKit) => (
            <div key={kit.id}
              className={`
                relative border bg-bg-secondary transition-all duration-300
                ${kit.popular ? 'border-gold' : 'border-gold/[0.1] hover:border-gold/30'}`}>

              {kit.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2
                  font-mono text-[9px] tracking-[0.15em] uppercase
                  text-bg-primary bg-gold px-4 py-1.5 whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="p-7 md:p-8 pt-10">

                {/* Header */}
                <div className="mb-6">
                  <div className="text-2xl mb-3">{kit.icon}</div>
                  <h2 className="font-cormorant text-[24px] md:text-[28px] font-light text-white/90">
                    {kit.name}
                  </h2>
                  <p className="text-[13px] text-white/45 font-light mt-1 leading-[1.6]">
                    {kit.desc}
                  </p>
                </div>

                {/* Price + Time */}
                <div className="flex items-baseline gap-6 mb-6 pb-6 border-b border-gold/[0.08]">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-1">
                      Starting From
                    </div>
                    <div className="font-cormorant text-[36px] font-light text-gold leading-none">
                      ${kit.price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-1">
                      Timeline
                    </div>
                    <div className="font-cormorant text-[22px] font-light text-white leading-none">
                      {kit.time}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/60 mb-4">
                    What&apos;s Included
                  </div>
                  <ul className="space-y-2">
                    {kit.features.map((f: string) => (
                      <li key={f} className="flex items-center gap-3 text-[13px] text-white/70">
                        <span className="font-mono text-[11px] text-gold flex-shrink-0">→</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-7">
                  {kit.stack.map((t: string) => (
                    <span key={t}
                      className="font-mono text-[9px] tracking-[0.08em] uppercase
                        text-white/35 bg-white/[0.04] border border-white/[0.07] px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {showLead === kit.id ? (
                  <div className="border-t border-gold/[0.08] pt-6">
                    <LeadForm
                      source={`Starter Kit — ${kit.name}`}
                      costRange={{ min: kit.price, max: Math.round(kit.price * 1.3) }}
                      onClose={() => setShowLead(null)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => setShowLead(kit.id)}
                      className="relative overflow-hidden group flex-1 font-mono text-[10px]
                        tracking-[0.18em] uppercase text-bg-primary bg-gold py-3.5
                        hover:-translate-y-0.5 transition-all duration-300">
                      <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                        group-hover:scale-x-100 transition-transform duration-300" />
                      <span className="relative z-10">Customize This Kit →</span>
                    </button>
                    <Link href={`/build-your-project?type=${kit.type}`}
                      className="flex-1 font-mono text-[10px] tracking-[0.18em] uppercase
                        text-white/50 border border-gold/15 hover:text-white hover:border-gold/40
                        py-3.5 text-center transition-all duration-200">
                      Scope Builder →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1100px] mt-10 border border-gold/[0.08] p-8 text-center">
          <p className="font-cormorant text-[22px] font-light mb-2">
            Not sure which kit is right for you?
          </p>
          <p className="text-[13px] text-white/40 font-light mb-6">
            Use our AI Project Planner to get a personalised recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-project-planner"
              className="relative overflow-hidden group font-mono text-[10px]
                tracking-[0.2em] uppercase text-bg-primary bg-gold px-8 py-3.5 inline-block
                hover:-translate-y-0.5 transition-all duration-300">
              <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative z-10">Try AI Planner →</span>
            </Link>
            <Link href="/startup-cost"
              className="font-mono text-[10px] tracking-[0.2em] uppercase
                text-white/50 border border-gold/15 hover:text-white hover:border-gold/40
                px-8 py-3.5 inline-block transition-all duration-200">
              Calculate Cost →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}