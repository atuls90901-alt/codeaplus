'use client'
import { useState } from 'react'
import Link from 'next/link'
import LeadForm from '@/components/toolkit/LeadForm'
import {
  buildScope, ALL_FEATURES, Feature,
  PROJECT_TYPE_LABELS, SCALE_LABELS, UI_LABELS,
  type ProjectType, type UserScale, type UILevel,
  type ScopeOutput, type Complexity,
} from '@/lib/toolkit'

const DELAYS = ['delay-1','delay-2','delay-3','delay-4','delay-5'] as const

const COMPLEXITY_COLOR: Record<Complexity, string> = {
  Simple:  'text-green-400 border-green-400',
  Medium:  'text-amber-400 border-amber-400',
  Complex: 'text-red-400 border-red-400',
}

const UI_COST_LABEL: Record<UILevel, string> = {
  basic:   'Base price',
  modern:  '+15% cost',
  premium: '+30% cost',
}

const SCALE_COST_LABEL: Record<UserScale, string> = {
  '100':  'Base price',
  '1k':   '+20% cost',
  '10k':  '+40% cost',
  '100k': '+70% cost',
}

export default function ScopeBuilderPage() {
  const [step,        setStep]        = useState<1|2|3|4|5>(1)
  const [projectType, setProjectType] = useState<ProjectType>('saas')
  const [features,    setFeatures]    = useState<string[]>([])
  const [userScale,   setUserScale]   = useState<UserScale>('1k')
  const [uiLevel,     setUiLevel]     = useState<UILevel>('modern')
  const [result,      setResult]      = useState<ScopeOutput | null>(null)
  const [showLead,    setShowLead]    = useState(false)

  const toggleFeature = (id: string) =>
    setFeatures(f => f.includes(id) ? f.filter((x: string) => x !== id) : [...f, id])

  const buildMyScope = () => {
    const r = buildScope({ projectType, features, userScale, uiLevel })
    setResult(r)
    setStep(5)
  }

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
      <section className="px-6 md:px-16 py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <div className="max-w-[700px] relative z-10">
          <div className="inline-flex items-center gap-2 mb-5 font-mono text-[10px]
            tracking-[0.3em] uppercase text-gold/80 border border-gold/20
            rounded-full px-4 py-[5px] bg-gold/[0.05]">
            4 Steps · Instant Result
          </div>
          <h1 className="font-cormorant font-light leading-[1.0] mb-4
            text-[clamp(36px,6vw,72px)]">
            Project Scope <em className="italic text-gold">Builder</em>
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-white/50 leading-[1.8]">
            4 quick questions → complete project scope with cost, timeline, and tech stack.
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="px-6 md:px-16 mb-8">
        <div className="flex items-center max-w-[700px]">
          {(['Project Type','Features','User Scale','Design Level'] as const).map((label, i) => {
            const s = (i + 1) as 1|2|3|4
            const done    = step > s
            const current = step === s
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    font-mono text-[11px] font-semibold transition-all duration-300
                    ${done    ? 'bg-gold text-bg-primary'
                    : current ? 'border-2 border-gold text-gold bg-gold/10'
                    :           'border border-white/15 text-white/25'}`}>
                    {done ? '✓' : s}
                  </div>
                  <span className={`font-mono text-[8px] tracking-[0.08em] uppercase mt-1.5
                    hidden md:block transition-colors
                    ${current ? 'text-gold' : done ? 'text-white/40' : 'text-white/20'}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`flex-1 h-px mx-2 transition-colors
                    ${step > s ? 'bg-gold/40' : 'bg-white/10'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="px-6 md:px-16 pb-20 max-w-[800px]">

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="font-cormorant text-[26px] font-light mb-7">
              What type of project <em className="italic text-gold">are you building?</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {(Object.entries(PROJECT_TYPE_LABELS) as [ProjectType, string][]).map(([val, label]) => (
                <button key={val} onClick={() => setProjectType(val)}
                  className={`p-6 border text-left transition-all duration-200
                    ${projectType === val
                      ? 'border-gold bg-gold/[0.06]'
                      : 'border-gold/[0.1] bg-bg-secondary hover:border-gold/30'}`}>
                  <div className={`font-cormorant text-[22px] font-light mb-1 transition-colors
                    ${projectType === val ? 'text-gold' : 'text-white/85'}`}>
                    {label}
                  </div>
                  {projectType === val && (
                    <div className="font-mono text-[9px] text-gold/70 tracking-[0.15em] uppercase">
                      ✓ Selected
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)}
                className="relative overflow-hidden group font-mono text-[11px]
                  tracking-[0.2em] uppercase text-bg-primary bg-gold px-8 py-3.5
                  hover:-translate-y-0.5 transition-all duration-300">
                <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                  group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative z-10">Next →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 className="font-cormorant text-[26px] font-light mb-2">
              What <em className="italic text-gold">features</em> do you need?
            </h2>
            <p className="text-[13px] text-white/35 font-light mb-7">
              Select all that apply — you can add more later.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {ALL_FEATURES.filter((f: Feature) => f.cost > 0).map((f: Feature) => (
                <button key={f.id} onClick={() => toggleFeature(f.id)}
                  className={`
                    flex items-center justify-between p-4 border text-left
                    transition-all duration-200
                    ${features.includes(f.id)
                      ? 'border-gold bg-gold/[0.05]'
                      : 'border-gold/[0.08] bg-bg-secondary hover:border-gold/20'}`}>
                  <div>
                    <div className={`text-[13px] font-medium transition-colors
                      ${features.includes(f.id) ? 'text-white' : 'text-white/70'}`}>
                      {f.label}
                    </div>
                    <div className="font-mono text-[9px] text-white/25 mt-0.5">
                      +${f.cost.toLocaleString()}
                    </div>
                  </div>
                  <div className={`w-5 h-5 border flex items-center justify-center
                    flex-shrink-0 transition-all
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
            <div className="flex justify-between">
              <button onClick={() => setStep(1)}
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-white/35 hover:text-gold transition-colors">← Back</button>
              <button onClick={() => setStep(3)}
                className="relative overflow-hidden group font-mono text-[11px]
                  tracking-[0.2em] uppercase text-bg-primary bg-gold px-8 py-3.5
                  hover:-translate-y-0.5 transition-all duration-300">
                <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                  group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative z-10">Next →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 className="font-cormorant text-[26px] font-light mb-7">
              How many <em className="italic text-gold">users</em> do you expect?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {(Object.entries(SCALE_LABELS) as [UserScale, string][]).map(([val, label]) => (
                <button key={val} onClick={() => setUserScale(val)}
                  className={`p-6 border text-left transition-all duration-200
                    ${userScale === val
                      ? 'border-gold bg-gold/[0.06]'
                      : 'border-gold/[0.1] bg-bg-secondary hover:border-gold/30'}`}>
                  <div className={`font-cormorant text-[20px] font-light transition-colors
                    ${userScale === val ? 'text-gold' : 'text-white/85'}`}>
                    {label}
                  </div>
                  <div className="font-mono text-[9px] text-white/30 mt-1">
                    {SCALE_COST_LABEL[val]}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)}
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-white/35 hover:text-gold transition-colors">← Back</button>
              <button onClick={() => setStep(4)}
                className="relative overflow-hidden group font-mono text-[11px]
                  tracking-[0.2em] uppercase text-bg-primary bg-gold px-8 py-3.5
                  hover:-translate-y-0.5 transition-all duration-300">
                <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                  group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative z-10">Next →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <h2 className="font-cormorant text-[26px] font-light mb-7">
              What level of <em className="italic text-gold">design</em> do you want?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {(Object.entries(UI_LABELS) as [UILevel, string][]).map(([val, label]) => {
                const [uiName, uiDesc] = label.split(' — ')
                return (
                  <button key={val} onClick={() => setUiLevel(val)}
                    className={`p-6 border text-left transition-all duration-200
                      ${uiLevel === val
                        ? 'border-gold bg-gold/[0.06]'
                        : 'border-gold/[0.1] bg-bg-secondary hover:border-gold/30'}`}>
                    <div className={`font-cormorant text-[20px] font-light mb-1 transition-colors
                      ${uiLevel === val ? 'text-gold' : 'text-white/85'}`}>
                      {uiName}
                    </div>
                    <div className="text-[12px] text-white/40 font-light mb-2">{uiDesc}</div>
                    <div className="font-mono text-[9px] text-white/30">{UI_COST_LABEL[val]}</div>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(3)}
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-white/35 hover:text-gold transition-colors">← Back</button>
              <button onClick={buildMyScope}
                className="relative overflow-hidden group font-mono text-[11px]
                  tracking-[0.2em] uppercase text-bg-primary bg-gold px-8 py-3.5
                  hover:-translate-y-0.5 transition-all duration-300">
                <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                  group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative z-10">Build My Scope →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 — Result */}
        {step === 5 && result && (
          <div className="space-y-5">

            {/* Summary */}
            <div className="border border-gold/20 bg-bg-secondary p-7 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]
                bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="flex items-start justify-between mb-4">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">
                  Your Project Scope
                </div>
                <span className={`font-mono text-[10px] tracking-[0.15em] uppercase
                  border px-3 py-1 ${COMPLEXITY_COLOR[result.complexity]}`}>
                  {result.complexity}
                </span>
              </div>
              <p className="text-[15px] text-white/65 font-light leading-[1.8]">
                {result.summary}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-gold/[0.1] bg-bg-secondary p-6 text-center">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/35 mb-2">
                  Estimated Cost
                </div>
                <div className="font-cormorant text-[34px] font-light text-gold leading-none">
                  ${result.costRange.min.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-white/30 mt-1">
                  to ${result.costRange.max.toLocaleString()}
                </div>
              </div>
              <div className="border border-gold/[0.1] bg-bg-secondary p-6 text-center">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/35 mb-2">
                  Timeline
                </div>
                <div className="font-cormorant text-[26px] font-light text-white leading-none">
                  {result.timeline}
                </div>
              </div>
              <div className="border border-gold/[0.1] bg-bg-secondary p-6 text-center">
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/35 mb-2">
                  Features
                </div>
                <div className="font-cormorant text-[26px] font-light text-white leading-none">
                  {features.length + 3} total
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="border border-gold/[0.1] bg-bg-secondary p-6 md:p-8">
              <h3 className="font-cormorant text-[22px] font-light mb-5">
                Recommended <em className="italic text-gold">Tech Stack</em>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {(Object.entries(result.techStack) as [string, string[]][]).map(([key, vals]) => (
                  <div key={key}>
                    <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-gold/55 mb-3">
                      {key}
                    </div>
                    <ul className="space-y-1.5">
                      {vals.map((v: string) => (
                        <li key={v} className="text-[12px] text-white/55 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead */}
            {!showLead ? (
              <div className="border border-gold/20 bg-bg-secondary p-7 md:p-10 text-center">
                <h3 className="font-cormorant text-[24px] font-light mb-2">
                  Ready to <em className="italic text-gold">Build This?</em>
                </h3>
                <p className="text-[13px] text-white/45 font-light mb-6">
                  Get a detailed proposal with exact specs and a fixed-price quote.
                </p>
                <button onClick={() => setShowLead(true)}
                  className="relative overflow-hidden group font-mono text-[11px]
                    tracking-[0.22em] uppercase text-bg-primary bg-gold px-10 py-4
                    hover:-translate-y-0.5 transition-all duration-300">
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">Get Detailed Project Plan →</span>
                </button>
              </div>
            ) : (
              <div className="border border-gold/20 bg-bg-secondary p-7 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px]
                  bg-gradient-to-r from-transparent via-gold to-transparent" />
                <h3 className="font-cormorant text-[22px] font-light mb-6">
                  Get Your <em className="italic text-gold">Proposal</em>
                </h3>
                <LeadForm
                  source="Project Scope Builder"
                  costRange={result.costRange}
                  onClose={() => setShowLead(false)}
                />
              </div>
            )}

            <div className="text-center">
              <button onClick={() => {
                setStep(1); setFeatures([]); setResult(null); setShowLead(false)
              }}
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-white/25 hover:text-white/60 transition-colors">
                ← Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}