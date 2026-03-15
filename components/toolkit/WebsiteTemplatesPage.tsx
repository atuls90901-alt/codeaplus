'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TEMPLATES, CATEGORIES, type Template } from '@/lib/templates'

export default function WebsiteTemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = activeCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory)

  return (
    <main className="bg-bg-primary min-h-screen">

      {/* Back */}
      <div className="px-6 md:px-16 pt-24 pb-0 max-w-[1300px] mx-auto">
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
        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 mb-5 font-mono text-[10px]
            tracking-[0.3em] uppercase text-gold/80 border border-gold/20
            rounded-full px-4 py-[5px] bg-gold/[0.05]">
            Ready-to-Launch · Fully Customisable
          </div>
          <h1 className="font-cormorant font-light leading-[1.0] mb-4
            text-[clamp(36px,6vw,72px)]">
            Website <em className="italic text-gold">Templates</em>
          </h1>
          <p className="text-[14px] md:text-[16px] font-light text-white/50 leading-[1.8]
            max-w-[560px]">
            Premium Next.js templates for startups, agencies, and founders.
            Production-ready, fully customisable, built for conversions.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="px-6 md:px-16 mb-8 max-w-[1300px] mx-auto">
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[9px] tracking-[0.15em] uppercase px-4 py-2
                border transition-all duration-200
                ${activeCategory === cat
                  ? 'border-gold bg-gold/[0.08] text-gold'
                  : 'border-gold/[0.1] text-white/40 hover:border-gold/30 hover:text-white/70'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates grid */}
      <section className="px-6 md:px-16 pb-20">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t: Template) => (
              <div key={t.slug}
                className="group relative border border-gold/[0.1] bg-bg-secondary
                  hover:border-gold/30 transition-all duration-300 overflow-hidden">

                {t.popular && (
                  <div className="absolute top-3 right-3 z-10
                    font-mono text-[8px] tracking-[0.15em] uppercase
                    text-bg-primary bg-gold px-2.5 py-1">
                    Popular
                  </div>
                )}

                {/* Preview image */}
                <div className="relative h-[200px] overflow-hidden">
                  <Image src={t.image} alt={t.name} fill loading="lazy"
                    className="object-cover opacity-70 group-hover:opacity-90
                      group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-60`} />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-xl">{t.icon}</span>
                    <span className="font-mono text-[9px] tracking-[0.15em] uppercase
                      text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1">
                      {t.category}
                    </span>
                  </div>
                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-black/20">
                    <Link href={`/website-templates/${t.slug}`}
                      className="font-mono text-[10px] tracking-[0.2em] uppercase
                        text-bg-primary bg-gold px-5 py-2.5
                        hover:bg-gold/90 transition-colors duration-200">
                      View Template →
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-cormorant text-[20px] font-light text-white/90
                      group-hover:text-white transition-colors">
                      {t.name}
                    </h2>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="font-cormorant text-[22px] font-light text-gold leading-none">
                        ${t.price.toLocaleString()}
                      </div>
                      <div className="font-mono text-[8px] text-white/30 mt-0.5">{t.time}</div>
                    </div>
                  </div>

                  <p className="text-[12px] text-white/45 font-light leading-[1.6] mb-4">
                    {t.tagline}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t.features.slice(0, 3).map((f: string) => (
                      <span key={f}
                        className="font-mono text-[8px] tracking-[0.08em] uppercase
                          text-white/35 bg-white/[0.04] border border-white/[0.06] px-2 py-1">
                        {f}
                      </span>
                    ))}
                    {t.features.length > 3 && (
                      <span className="font-mono text-[8px] text-gold/50 px-2 py-1">
                        +{t.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pb-5 border-b border-gold/[0.08]">
                    {t.stack.map((s: string) => (
                      <span key={s}
                        className="font-mono text-[8px] tracking-[0.08em] uppercase
                          text-gold/55 bg-gold/[0.05] border border-gold/[0.1] px-2 py-1">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Link href={`/website-templates/${t.slug}`}
                      className="relative overflow-hidden group/btn flex-1
                        font-mono text-[9px] tracking-[0.15em] uppercase
                        text-bg-primary bg-gold py-3 text-center
                        hover:-translate-y-0.5 transition-all duration-300">
                      <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                        group-hover/btn:scale-x-100 transition-transform duration-300" />
                      <span className="relative z-10">View Details →</span>
                    </Link>
                    <Link href="/build-your-project"
                      className="font-mono text-[9px] tracking-[0.15em] uppercase
                        text-white/45 border border-gold/15
                        hover:text-white hover:border-gold/40
                        px-4 py-3 text-center transition-all duration-200">
                      Customize
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 border border-gold/[0.08] p-8 md:p-12 text-center">
            <p className="font-cormorant text-[24px] md:text-[36px] font-light mb-3">
              Need something <em className="italic text-gold">custom?</em>
            </p>
            <p className="text-[13px] text-white/40 font-light mb-7 max-w-[440px] mx-auto">
              Don&apos;t see what you need? We build fully custom websites from scratch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-project-planner"
                className="relative overflow-hidden group font-mono text-[10px]
                  tracking-[0.2em] uppercase text-bg-primary bg-gold px-8 py-4
                  inline-block hover:-translate-y-0.5 transition-all duration-300">
                <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                  group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative z-10">Plan Custom Project →</span>
              </Link>
              <Link href="/startup-cost"
                className="font-mono text-[10px] tracking-[0.2em] uppercase
                  text-white/50 border border-gold/15
                  hover:text-white hover:border-gold/40
                  px-8 py-4 inline-block transition-all duration-200">
                Estimate Cost →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}