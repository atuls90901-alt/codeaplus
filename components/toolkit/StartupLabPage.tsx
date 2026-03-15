'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LeadForm from '@/components/toolkit/LeadForm'
import { STARTUP_LAB_DATA, PROJECT_TYPE_LABELS, type LabProject } from '@/lib/toolkit'

const DELAYS = ['delay-1','delay-2','delay-3'] as const

export default function StartupLabPage() {
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
            Build in Public · Real Projects · Real Results
          </div>
          <h1 className="font-cormorant font-light leading-[1.0] mb-4
            text-[clamp(36px,6vw,72px)]">
            Startup <em className="italic text-gold">Lab</em>
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-white/50 leading-[1.8]">
            Real startup platforms we&apos;ve built — problem, solution, tech stack, results.
            No portfolio fluff, just proof.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-6 md:px-16 pb-20">
        <div className="space-y-8 max-w-[1100px]">
          {STARTUP_LAB_DATA.map((project: LabProject) => (
            <div key={project.id}
              className={`
                border border-gold/[0.1] bg-bg-secondary
                hover:border-gold/25 transition-all duration-300`}>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">

                {/* Left — Content */}
                <div className="p-7 md:p-10">

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-3xl flex-shrink-0">{project.icon}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h2 className="font-cormorant text-[26px] md:text-[32px] font-light text-white">
                          {project.name}
                        </h2>
                        <span className="font-mono text-[9px] tracking-[0.15em] uppercase
                          text-bg-primary bg-gold px-2.5 py-1">
                          {project.type}
                        </span>
                      </div>
                      <p className="text-[14px] text-white/45 font-light italic">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Problem + Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mb-2">
                        Problem
                      </div>
                      <p className="text-[13px] text-white/55 font-light leading-[1.75]">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold mb-2">
                        Solution
                      </div>
                      <p className="text-[13px] text-white/75 font-light leading-[1.75]">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-5">
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mb-3">
                      Key Features
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((f: string) => (
                        <span key={f}
                          className="font-mono text-[9px] tracking-[0.08em] uppercase
                            text-white/55 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="mb-7">
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 mb-3">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((t: string) => (
                        <span key={t}
                          className="font-mono text-[9px] tracking-[0.08em] uppercase
                            text-gold/65 bg-gold/[0.06] border border-gold/[0.12] px-2.5 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center gap-3 mb-8 flex-wrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400
                      shadow-[0_0_6px_rgba(74,222,128,0.5)] animate-blink-dot flex-shrink-0" />
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/35">
                      Delivered in {project.timeline}
                    </span>
                    {project.url !== '#' && (
                      <>
                        <span className="text-white/15">·</span>
                        <a href={project.url} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-[10px] tracking-[0.12em] uppercase
                            text-gold/60 hover:text-gold transition-colors duration-200">
                          Live Site ↗
                        </a>
                      </>
                    )}
                  </div>

                  {/* CTA */}
                  {showLead === project.id ? (
                    <div className="border-t border-gold/[0.08] pt-6">
                      <LeadForm
                        source={`Startup Lab — ${project.name}`}
                        prefillIdea={`Build something similar to ${project.name} — ${project.tagline}`}
                        onClose={() => setShowLead(null)}
                      />
                    </div>
                  ) : (
                    <button onClick={() => setShowLead(project.id)}
                      className="relative overflow-hidden group font-mono text-[10px]
                        tracking-[0.18em] uppercase text-bg-primary bg-gold px-7 py-3.5 inline-block
                        hover:-translate-y-0.5 transition-all duration-300">
                      <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                        group-hover:scale-x-100 transition-transform duration-300" />
                      <span className="relative z-10">Build Something Similar →</span>
                    </button>
                  )}
                </div>

                {/* Right — Image + Results */}
                <div className="border-t lg:border-t-0 lg:border-l border-gold/[0.08]">
                  {project.image && (
                    <div className="relative h-[200px] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                        sizes="(max-width: 1024px) 100vw, 380px"
                      />
                      <div className="absolute inset-0
                        bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-7">
                    <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/60 mb-5">
                      Results
                    </div>
                    <div className="space-y-4">
                      {project.results.map((r: { metric: string; label: string }) => (
                        <div key={r.label} className="flex items-baseline gap-3">
                          <div className="font-cormorant text-[34px] font-light text-gold leading-none">
                            {r.metric}
                          </div>
                          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/45">
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-gold/[0.08]">
                      <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/25 mb-2">
                        Related Starter Kit
                      </div>
                      <Link href={`/starter-kits#${project.similar}`}
                        className="font-mono text-[10px] tracking-[0.12em] uppercase
                          text-gold/60 hover:text-gold transition-colors duration-200">
                        {PROJECT_TYPE_LABELS[project.similar]} Kit →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1100px] mt-10 border border-gold/20 bg-bg-secondary
          p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px]
            bg-gradient-to-r from-transparent via-gold to-transparent" />
          <h2 className="font-cormorant text-[26px] md:text-[38px] font-light mb-3">
            Have an Idea? <em className="italic text-gold">Let&apos;s Build It.</em>
          </h2>
          <p className="text-[14px] text-white/45 font-light mb-8 max-w-[480px] mx-auto">
            Every project above started with just an idea.
            Tell us yours and we&apos;ll tell you exactly how to build it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-project-planner"
              className="relative overflow-hidden group font-mono text-[11px]
                tracking-[0.2em] uppercase text-bg-primary bg-gold px-8 py-4 inline-block
                hover:-translate-y-0.5 transition-all duration-300">
              <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative z-10">Plan My Project →</span>
            </Link>
            <Link href="/startup-cost"
              className="font-mono text-[11px] tracking-[0.2em] uppercase
                text-white/50 border border-gold/15 hover:text-white hover:border-gold/40
                px-8 py-4 inline-block transition-all duration-200">
              Estimate Cost →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}