'use client'
import { useState } from 'react'
import Link from 'next/link'
import LeadForm from '@/components/toolkit/LeadForm'
import {
  generateProjectPlan, ALL_FEATURES, PROJECT_TYPE_LABELS,
  SCALE_LABELS, STARTER_KITS_DATA, Feature,
  type ProjectType, type UserScale, type PlannerOutput,
} from '@/lib/toolkit'

const PROJECT_TYPES: { value: ProjectType; label: string; icon: string; desc: string }[] = [
  { value: 'saas',        label: 'SaaS MVP',       icon: '🚀', desc: 'Subscription-based software product' },
  { value: 'marketplace', label: 'Marketplace',    icon: '🛒', desc: 'Two-sided buyer/seller platform'     },
  { value: 'platform',    label: 'Web Platform',   icon: '⚡', desc: 'Complex multi-role web application'  },
  { value: 'ecommerce',   label: 'E-Commerce',     icon: '🛍️', desc: 'Online store with checkout'          },
]

const USER_SCALES: { value: UserScale; label: string }[] = [
  { value: '100',  label: 'Up to 100 users'    },
  { value: '1k',   label: 'Up to 1,000 users'  },
  { value: '10k',  label: 'Up to 10,000 users' },
  { value: '100k', label: '100,000+ users'      },
]

const DELAYS = ['delay-1','delay-2','delay-3','delay-4','delay-5'] as const

export default function AIProjectPlannerPage() {
  const [step,        setStep]        = useState<1|2|3|4>(1)
  const [idea,        setIdea]        = useState('')
  const [projectType, setProjectType] = useState<ProjectType>('saas')
  const [userScale,   setUserScale]   = useState<UserScale>('1k')
  const [features,    setFeatures]    = useState<string[]>([])
  const [result,      setResult]      = useState<PlannerOutput | null>(null)
  const [showLead,    setShowLead]    = useState(false)

  const toggleFeature = (id: string) =>
    setFeatures(f => f.includes(id) ? f.filter((x: string) => x !== id) : [...f, id])

  const generate = () => {
    const plan = generateProjectPlan({ idea, projectType, userScale, features })
    setResult(plan)
    setStep(4)
  }

  const kit = result ? STARTER_KITS_DATA.find(k => k.type === projectType) : null

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
            Free Tool · No signup required
          </div>
          <h1 className="font-cormorant font-light leading-[1.0] mb-4
            text-[clamp(36px,6vw,72px)]">
            AI Project <em className="italic text-gold">Planner</em>
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-white/50 leading-[1.8]">
            Describe your startup idea and get a complete technical project plan —
            recommended features, tech stack, timeline, and cost estimate.
          </p>
        </div>
      </section>

      {/* Step indicators */}
      <div className="px-6 md:px-16 mb-8">
        <div className="flex items-center gap-2 max-w-[600px]">
          {(['Your Idea','Project Type','Features','Your Plan'] as const).map((label, i) => {
            const s = (i + 1) as 1|2|3|4
            const done    = step > s
            const current = step === s
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center
                    font-mono text-[11px] font-semibold flex-shrink-0 transition-all duration-300
                    ${done    ? 'bg-gold text-bg-primary'
                    : current ? 'border-2 border-gold text-gold bg-gold/10'
                    :           'border border-white/15 text-white/25'}`}>
                    {done ? '✓' : s}
                  </div>
                  <span className={`font-mono text-[8px] tracking-[0.08em] uppercase mt-1
                    hidden sm:block transition-colors
                    ${current ? 'text-gold' : done ? 'text-white/40' : 'text-white/20'}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`flex-1 h-px mx-1.5 transition-colors
                    ${step > s ? 'bg-gold/40' : 'bg-white/10'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="px-6 md:px-16 pb-20">
        <div className="max-w-[800px]">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="border border-gold/[0.1] bg-bg-secondary p-7 md:p-10">
              <h2 className="font-cormorant text-[26px] md:text-[34px] font-light mb-2">
                Describe Your <em className="italic text-gold">Idea</em>
              </h2>
              <p className="text-[13px] text-white/40 font-light mb-7">
                A few sentences is enough — we'll handle the technical details.
              </p>
              <textarea
                value={idea}
                onChange={e => setIdea(e.target.value)}
                placeholder="e.g. A marketplace where freelancers can sell digital products like templates, icons, and UI kits..."
                className="w-full bg-surface border border-gold/[0.12] focus:border-gold/50
                  text-white/90 font-light text-[14px] px-4 py-4 outline-none
                  transition-all duration-200 placeholder:text-white/25 resize-none min-h-[130px]"
              />
              <div className="flex items-center justify-between mt-6">
                <p className="font-mono text-[9px] text-white/25 tracking-[0.1em] uppercase">
                  Optional — skip to continue
                </p>
                <button onClick={() => setStep(2)}
                  className="relative overflow-hidden group font-mono text-[11px]
                    tracking-[0.2em] uppercase text-bg-primary bg-gold px-7 py-3.5
                    hover:-translate-y-0.5 transition-all duration-300">
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">Next: Project Type →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="font-cormorant text-[26px] md:text-[34px] font-light mb-7">
                What Are You <em className="italic text-gold">Building?</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {PROJECT_TYPES.map(pt => (
                  <button key={pt.value} onClick={() => setProjectType(pt.value)}
                    className={`text-left p-6 border transition-all duration-200
                      ${projectType === pt.value
                        ? 'border-gold bg-gold/[0.06]'
                        : 'border-gold/[0.1] bg-bg-secondary hover:border-gold/30'}`}>
                    <div className="text-2xl mb-3">{pt.icon}</div>
                    <div className={`font-cormorant text-[20px] font-light mb-1 transition-colors
                      ${projectType === pt.value ? 'text-gold' : 'text-white/90'}`}>
                      {pt.label}
                    </div>
                    <div className="text-[12px] text-white/40 font-light">{pt.desc}</div>
                  </button>
                ))}
              </div>

              {/* User scale */}
              <div className="mb-8 p-6 border border-gold/[0.1] bg-bg-secondary">
                <h3 className="font-cormorant text-[20px] font-light mb-5">Expected User Scale</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {USER_SCALES.map(s => (
                    <button key={s.value} onClick={() => setUserScale(s.value)}
                      className={`py-3 px-3 border text-center transition-all duration-200
                        ${userScale === s.value
                          ? 'border-gold bg-gold/[0.08] text-gold'
                          : 'border-gold/[0.1] text-white/50 hover:border-gold/30'}`}>
                      <div className="font-mono text-[9px] tracking-[0.08em] uppercase leading-relaxed">
                        {s.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)}
                  className="font-mono text-[10px] tracking-[0.15em] uppercase
                    text-white/35 hover:text-gold transition-colors">← Back</button>
                <button onClick={() => setStep(3)}
                  className="relative overflow-hidden group font-mono text-[11px]
                    tracking-[0.2em] uppercase text-bg-primary bg-gold px-7 py-3.5
                    hover:-translate-y-0.5 transition-all duration-300">
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">Next: Features →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="font-cormorant text-[26px] md:text-[34px] font-light mb-2">
                Select <em className="italic text-gold">Features</em>
              </h2>
              <p className="text-[13px] text-white/40 font-light mb-7">
                Choose what you need — we'll recommend more based on your project type.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ALL_FEATURES.filter((f: Feature) => f.cost > 0).map((f: Feature) => (
                  <button key={f.id} onClick={() => toggleFeature(f.id)}
                    className={`
                      flex items-center justify-between p-4 border text-left
                      transition-all duration-200
                      ${features.includes(f.id)
                        ? 'border-gold bg-gold/[0.06]'
                        : 'border-gold/[0.08] bg-bg-secondary hover:border-gold/25'}`}>
                    <div>
                      <div className={`text-[13px] font-medium transition-colors
                        ${features.includes(f.id) ? 'text-white' : 'text-white/70'}`}>
                        {f.label}
                      </div>
                      <div className="font-mono text-[9px] text-white/30 mt-0.5">
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
              <div className="flex justify-between">
                <button onClick={() => setStep(2)}
                  className="font-mono text-[10px] tracking-[0.15em] uppercase
                    text-white/35 hover:text-gold transition-colors">← Back</button>
                <button onClick={generate}
                  className="relative overflow-hidden group font-mono text-[11px]
                    tracking-[0.2em] uppercase text-bg-primary bg-gold px-7 py-3.5
                    hover:-translate-y-0.5 transition-all duration-300">
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">Generate My Plan →</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Result */}
          {step === 4 && result && (
            <div className="space-y-5">

              {/* Summary */}
              <div className="border border-gold/20 bg-bg-secondary p-7 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px]
                  bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                  Your Project Plan
                </div>
                <h2 className="font-cormorant text-[26px] md:text-[34px] font-light mb-4">
                  {PROJECT_TYPE_LABELS[projectType]}
                </h2>
                <p className="text-[14px] text-white/55 font-light leading-[1.8]">
                  {result.summary}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-gold/[0.1] bg-bg-secondary p-6 text-center">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-2">
                    Estimated Cost
                  </div>
                  <div className="font-cormorant text-[32px] font-light text-gold leading-none">
                    ${result.costRange.min.toLocaleString()}
                  </div>
                  <div className="font-mono text-[10px] text-white/30 mt-1">
                    to ${result.costRange.max.toLocaleString()}
                  </div>
                </div>
                <div className="border border-gold/[0.1] bg-bg-secondary p-6 text-center">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-2">
                    Timeline
                  </div>
                  <div className="font-cormorant text-[28px] font-light text-white leading-none">
                    {result.timeline}
                  </div>
                </div>
                <div className="border border-gold/[0.1] bg-bg-secondary p-6 text-center">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-2">
                    Starter Kit
                  </div>
                  <div className="font-cormorant text-[16px] font-light text-white leading-snug">
                    {result.starterKit}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="border border-gold/[0.1] bg-bg-secondary p-6 md:p-8">
                <h3 className="font-cormorant text-[22px] font-light mb-6">
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
                          <li key={v} className="text-[12px] text-white/60 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="border border-gold/[0.1] bg-bg-secondary p-6 md:p-8">
                <h3 className="font-cormorant text-[22px] font-light mb-5">
                  Recommended <em className="italic text-gold">Features</em>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedFeatures.map((fId: string) => {
                    const f = ALL_FEATURES.find((x: Feature) => x.id === fId)
                    return f ? (
                      <span key={fId}
                        className="font-mono text-[9px] tracking-[0.1em] uppercase
                          text-white/65 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5">
                        {f.label}
                      </span>
                    ) : null
                  })}
                </div>
              </div>

              {/* Kit CTA */}
              {kit && (
                <div className="border border-gold/20 bg-[rgba(201,168,76,0.03)] p-6
                  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/55 mb-1">
                      Perfect Match
                    </div>
                    <div className="font-cormorant text-[20px] font-light">{kit.name}</div>
                    <div className="text-[12px] text-white/40 mt-1">{kit.desc}</div>
                  </div>
                  <Link href="/starter-kits"
                    className="relative overflow-hidden group flex-shrink-0
                      font-mono text-[10px] tracking-[0.18em] uppercase
                      text-bg-primary bg-gold px-6 py-3 inline-block
                      hover:-translate-y-0.5 transition-all duration-300">
                    <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                      group-hover:scale-x-100 transition-transform duration-300" />
                    <span className="relative z-10">View Starter Kit →</span>
                  </Link>
                </div>
              )}

              {/* Lead form */}
              {!showLead ? (
                <div className="border border-gold/20 bg-bg-secondary p-7 md:p-10 text-center">
                  <h3 className="font-cormorant text-[24px] font-light mb-2">
                    Want a <em className="italic text-gold">Detailed Proposal?</em>
                  </h3>
                  <p className="text-[13px] text-white/45 font-light mb-6">
                    Get exact specifications, wireframe suggestions, and a fixed-price quote in 24 hours.
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
                    Get Your <em className="italic text-gold">Detailed Plan</em>
                  </h3>
                  <LeadForm source="AI Project Planner" prefillIdea={idea} costRange={result.costRange} />
                </div>
              )}

              <div className="text-center pt-2">
                <button onClick={() => {
                  setStep(1); setIdea(''); setProjectType('saas')
                  setFeatures([]); setResult(null); setShowLead(false)
                }}
                  className="font-mono text-[10px] tracking-[0.15em] uppercase
                    text-white/25 hover:text-white/60 transition-colors">
                  ← Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}