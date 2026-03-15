'use client'
import { useState } from 'react'
import Link from 'next/link'
import LeadForm from '@/components/toolkit/LeadForm'
import {
  calculateCost, calculateTimeline, ALL_FEATURES, Feature,
  PROJECT_TYPE_LABELS, SCALE_LABELS, TECH_STACKS, UI_LABELS,
  BASE_COSTS,
  type ProjectType, type UserScale, type UILevel,
} from '@/lib/toolkit'

const DELAYS = ['delay-1','delay-2','delay-3','delay-4','delay-5'] as const

export default function StartupCostPage() {
  const [projectType, setProjectType] = useState<ProjectType>('saas')
  const [userScale,   setUserScale]   = useState<UserScale>('1k')
  const [uiLevel,     setUiLevel]     = useState<UILevel>('modern')
  const [features,    setFeatures]    = useState<string[]>([])
  const [showLead,    setShowLead]    = useState(false)

  const toggleFeature = (id: string) =>
    setFeatures(f => f.includes(id) ? f.filter((x: string) => x !== id) : [...f, id])

  const cost     = calculateCost(projectType, features, userScale, uiLevel)
  const timeline = calculateTimeline(projectType, features)
  const stack    = TECH_STACKS[projectType]

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
            Free Tool · Real-time Estimate
          </div>
          <h1 className="font-cormorant font-light leading-[1.0] mb-4
            text-[clamp(36px,6vw,72px)]">
            Startup Cost <em className="italic text-gold">Calculator</em>
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-white/50 leading-[1.8]">
            Select your project type, features, and scale —
            watch the estimate update in real time.
          </p>
        </div>
      </section>

      <div className="px-6 md:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-[1100px]">

          {/* LEFT: Controls */}
          <div className="space-y-5">

            {/* Project Type */}
            <div className="border border-gold/[0.1] bg-bg-secondary p-6 md:p-8">
              <h2 className="font-cormorant text-[22px] font-light mb-5">
                Project <em className="italic text-gold">Type</em>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {(Object.entries(PROJECT_TYPE_LABELS) as [ProjectType, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => setProjectType(val)}
                    className={`p-4 border text-left transition-all duration-200
                      ${projectType === val
                        ? 'border-gold bg-gold/[0.08]'
                        : 'border-gold/[0.08] hover:border-gold/25'}`}>
                    <div className={`font-cormorant text-[17px] font-light transition-colors
                      ${projectType === val ? 'text-gold' : 'text-white/80'}`}>
                      {label}
                    </div>
                    <div className="font-mono text-[9px] text-white/30 mt-1">
                      Base: ${BASE_COSTS[val].toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="border border-gold/[0.1] bg-bg-secondary p-6 md:p-8">
              <h2 className="font-cormorant text-[22px] font-light mb-2">
                Select <em className="italic text-gold">Features</em>
              </h2>
              <p className="text-[12px] text-white/35 font-light mb-5">
                Each feature adds to the base cost and timeline.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_FEATURES.filter((f: Feature) => f.cost > 0).map((f: Feature) => (
                  <button key={f.id} onClick={() => toggleFeature(f.id)}
                    className={`
                      flex items-center justify-between p-3.5 border text-left
                      transition-all duration-200
                      ${features.includes(f.id)
                        ? 'border-gold bg-gold/[0.05]'
                        : 'border-gold/[0.07] hover:border-gold/20'}`}>
                    <div>
                      <div className={`text-[13px] transition-colors
                        ${features.includes(f.id) ? 'text-white' : 'text-white/65'}`}>
                        {f.label}
                      </div>
                      <div className="font-mono text-[9px] text-white/25 mt-0.5">
                        +${f.cost.toLocaleString()} · +{f.time}wk
                      </div>
                    </div>
                    <div className={`w-5 h-5 border flex items-center justify-center
                      flex-shrink-0 transition-all duration-200
                      ${features.includes(f.id)
                        ? 'bg-gold border-gold text-bg-primary'
                        : 'border-white/20'}`}>
                      {features.includes(f.id) && (
                        <span className="font-mono text-[10px] font-bold">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* User Scale */}
            <div className="border border-gold/[0.1] bg-bg-secondary p-6 md:p-8">
              <h2 className="font-cormorant text-[22px] font-light mb-5">
                User <em className="italic text-gold">Scale</em>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.entries(SCALE_LABELS) as [UserScale, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => setUserScale(val)}
                    className={`py-3 px-3 border text-center transition-all duration-200
                      ${userScale === val
                        ? 'border-gold bg-gold/[0.08] text-gold'
                        : 'border-gold/[0.08] text-white/50 hover:border-gold/25'}`}>
                    <div className="font-mono text-[8px] tracking-[0.08em] uppercase leading-relaxed">
                      {label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* UI Level */}
            <div className="border border-gold/[0.1] bg-bg-secondary p-6 md:p-8">
              <h2 className="font-cormorant text-[22px] font-light mb-5">
                Design <em className="italic text-gold">Quality</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.entries(UI_LABELS) as [UILevel, string][]).map(([val, label]) => {
                  const [uiName, uiDesc] = label.split(' — ')
                  return (
                    <button key={val} onClick={() => setUiLevel(val)}
                      className={`p-4 border text-left transition-all duration-200
                        ${uiLevel === val
                          ? 'border-gold bg-gold/[0.08]'
                          : 'border-gold/[0.08] hover:border-gold/25'}`}>
                      <div className={`font-cormorant text-[17px] font-light transition-colors
                        ${uiLevel === val ? 'text-gold' : 'text-white/80'}`}>
                        {uiName}
                      </div>
                      <div className="text-[11px] text-white/30 font-light mt-0.5">{uiDesc}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky Result */}
          <div className="lg:sticky lg:top-24 h-fit space-y-4">

            <div className="border border-gold/20 bg-bg-secondary relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]
                bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="p-6 md:p-8">
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/60 mb-2">
                  Estimated Investment
                </div>
                <div className="font-cormorant text-[50px] font-light text-gold leading-none mb-1">
                  ${cost.min.toLocaleString()}
                </div>
                <div className="font-mono text-[11px] text-white/35 mb-6">
                  to ${cost.max.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5 pt-5 border-t border-gold/[0.08]">
                  <div>
                    <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/35 mb-1">
                      Timeline
                    </div>
                    <div className="font-cormorant text-[19px] font-light text-white">
                      {timeline}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/35 mb-1">
                      Features
                    </div>
                    <div className="font-cormorant text-[19px] font-light text-white">
                      {features.length + 3} included
                    </div>
                  </div>
                </div>

                {/* Stack preview */}
                <div className="pt-4 border-t border-gold/[0.08] mb-5">
                  <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-gold/50 mb-3">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[...stack.frontend.slice(0,2), ...stack.backend.slice(0,1), ...stack.database.slice(0,1)].map((t: string) => (
                      <span key={t} className="font-mono text-[8px] tracking-[0.08em] uppercase
                        text-white/40 bg-white/[0.04] border border-white/[0.06] px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button onClick={() => setShowLead(true)}
                  className="relative overflow-hidden group w-full font-mono text-[10px]
                    tracking-[0.2em] uppercase text-bg-primary bg-gold py-4
                    hover:-translate-y-0.5 transition-all duration-300">
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">Get Detailed Quote →</span>
                </button>
              </div>
            </div>

            {showLead && (
              <div className="border border-gold/20 bg-bg-secondary p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px]
                  bg-gradient-to-r from-transparent via-gold to-transparent" />
                <h3 className="font-cormorant text-[22px] font-light mb-5">
                  Get Your <em className="italic text-gold">Quote</em>
                </h3>
                <LeadForm source="Cost Calculator" costRange={cost} onClose={() => setShowLead(false)} />
              </div>
            )}

            <div className="border border-gold/[0.1] p-4 text-center">
              <p className="text-[12px] text-white/35 font-light mb-2">
                Free audit for your existing site?
              </p>
              <Link href="/audit"
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-gold hover:text-white/70 transition-colors duration-200
                  border-b border-gold/30 pb-0.5">
                Get Free Audit →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}