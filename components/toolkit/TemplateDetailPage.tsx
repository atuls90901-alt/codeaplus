'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TEMPLATES, type Template } from '@/lib/templates'
import LeadForm from '@/components/toolkit/LeadForm'

interface Props {
  template: Template
}

export default function TemplateDetailPage({ template }: Props) {
  const [showLead,  setShowLead]  = useState(false)
  const [activeTab, setActiveTab] = useState<'preview'|'features'|'pages'>('preview')

  const related = TEMPLATES.filter(t =>
    t.slug !== template.slug && t.category === template.category
  ).slice(0, 2)

  const hasLivePreview = template.preview && template.preview !== '#'

  return (
    <main className="bg-bg-primary min-h-screen">

      {/* Back */}
      <div className="px-6 md:px-16 pt-24 pb-0">
        <Link href="/website-templates"
          className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em]
            uppercase text-white/30 hover:text-gold transition-colors duration-200">
          ← All Templates
        </Link>
      </div>

      {/* Main */}
      <section className="px-6 md:px-16 py-10 md:py-14">
        <div className="max-w-[1200px] mx-auto
          grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* LEFT */}
          <div>

            {/* Tabs */}
            <div className="flex border border-gold/[0.1] mb-5">
              {(['preview','features','pages'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 font-mono text-[9px] tracking-[0.15em] uppercase
                    transition-all duration-200
                    ${activeTab === tab
                      ? 'bg-gold/[0.08] text-gold border-b-2 border-gold'
                      : 'text-white/40 hover:text-white/70'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* PREVIEW tab — screenshot + open button */}
            {activeTab === 'preview' && (
              <div className="border border-gold/[0.1] overflow-hidden">

                {/* Browser chrome */}
                <div className="bg-[#111] border-b border-gold/[0.08]
                  flex items-center gap-2 px-4 py-2.5">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <div className="flex-1 bg-white/[0.06] rounded px-3 py-1
                    flex items-center gap-2 mx-2 min-w-0">
                    <span className="text-white/20 text-[10px] flex-shrink-0">🔒</span>
                    <span className="font-mono text-[9px] text-white/40 truncate">
                      {hasLivePreview ? template.preview : 'preview.codeaplus.pro/' + template.slug}
                    </span>
                  </div>
                  {hasLivePreview && (
                    <a href={template.preview} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[8px] tracking-[0.1em] uppercase
                        text-gold/60 hover:text-gold transition-colors flex-shrink-0">
                      Open ↗
                    </a>
                  )}
                </div>

                {/* Screenshot preview */}
                <div className="relative group" style={{ height: '480px' }}>
                  <Image
                    src={template.image}
                    alt={`${template.name} preview`}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                  {/* Color overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-30`} />

                  {/* Center overlay — Live Preview button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center
                    bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {hasLivePreview ? (
                      <a href={template.preview} target="_blank" rel="noopener noreferrer"
                        className="relative overflow-hidden group/btn
                          font-mono text-[11px] tracking-[0.2em] uppercase
                          text-bg-primary bg-gold px-8 py-4 mb-3
                          hover:-translate-y-0.5 transition-all duration-300">
                        <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                          group-hover/btn:scale-x-100 transition-transform duration-300" />
                        <span className="relative z-10">Open Live Preview ↗</span>
                      </a>
                    ) : (
                      <div className="text-center">
                        <div className="font-mono text-[10px] tracking-[0.2em] uppercase
                          text-white/50 border border-white/20 px-6 py-3 mb-3">
                          Live Preview Coming Soon
                        </div>
                      </div>
                    )}
                    <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/30">
                      Opens in new tab
                    </p>
                  </div>

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-24
                    bg-gradient-to-t from-bg-primary to-transparent" />

                  {/* Always visible open button */}
                  {hasLivePreview && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                      <a href={template.preview} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2
                          font-mono text-[10px] tracking-[0.15em] uppercase
                          text-gold border border-gold/30 px-5 py-2.5
                          bg-bg-primary/80 backdrop-blur-sm
                          hover:bg-gold hover:text-bg-primary transition-all duration-200">
                        <span>Open Live Preview</span>
                        <span>↗</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FEATURES tab */}
            {activeTab === 'features' && (
              <div className="space-y-2">
                {template.features.map((f: string) => (
                  <div key={f}
                    className="flex items-center gap-3 p-4
                      border border-gold/[0.07] bg-bg-secondary
                      text-[13px] text-white/70">
                    <span className="font-mono text-[11px] text-gold flex-shrink-0">→</span>
                    {f}
                  </div>
                ))}
                <div className="pt-5">
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/60 mb-3">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.stack.map((s: string) => (
                      <span key={s}
                        className="font-mono text-[9px] tracking-[0.08em] uppercase
                          text-gold/65 bg-gold/[0.06] border border-gold/[0.12] px-3 py-1.5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PAGES tab */}
            {activeTab === 'pages' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {template.pages.map((p: string) => (
                  <div key={p}
                    className="border border-gold/[0.08] bg-bg-secondary p-4
                      flex items-center gap-3">
                    <span className="font-mono text-[10px] text-gold/50">□</span>
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/65">
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Purchase card */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="border border-gold/20 bg-bg-secondary relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]
                bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="p-6 md:p-8">

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{template.icon}</span>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-gold/60">
                    {template.category}
                  </div>
                </div>

                <h1 className="font-cormorant text-[24px] font-light text-white mb-1">
                  {template.name}
                </h1>
                <p className="text-[12px] text-white/40 font-light mb-4 italic">
                  {template.tagline}
                </p>
                <p className="text-[13px] text-white/55 font-light leading-[1.75] mb-5">
                  {template.description}
                </p>

                <div className="flex items-baseline gap-2 mb-5 pb-5 border-b border-gold/[0.08]">
                  <div className="font-cormorant text-[42px] font-light text-gold leading-none">
                    ${template.price.toLocaleString()}
                  </div>
                  <div className="font-mono text-[10px] text-white/30">one time</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/30 mb-1">
                      Timeline
                    </div>
                    <div className="font-cormorant text-[17px] font-light text-white">
                      {template.time}
                    </div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/[0.06] p-3 text-center">
                    <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/30 mb-1">
                      Pages
                    </div>
                    <div className="font-cormorant text-[17px] font-light text-white">
                      {template.pages.length} pages
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {['Source code included','Mobile responsive','SEO optimised',
                    '1 month support','Customisation available'].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-[12px] text-white/60">
                      <span className="text-gold text-[10px] flex-shrink-0">✓</span>
                      {item}
                    </div>
                  ))}
                </div>

                {!showLead ? (
                  <div className="space-y-3">
                    <button onClick={() => setShowLead(true)}
                      className="relative overflow-hidden group w-full font-mono text-[10px]
                        tracking-[0.2em] uppercase text-bg-primary bg-gold py-4
                        hover:-translate-y-0.5 transition-all duration-300">
                      <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                        group-hover:scale-x-100 transition-transform duration-300" />
                      <span className="relative z-10">Get This Template →</span>
                    </button>
                    {hasLivePreview && (
                      <a href={template.preview} target="_blank" rel="noopener noreferrer"
                        className="block w-full font-mono text-[10px] tracking-[0.18em] uppercase
                          text-white/45 border border-gold/15
                          hover:text-gold hover:border-gold/40
                          py-3.5 text-center transition-all duration-200">
                        Live Preview ↗
                      </a>
                    )}
                    <Link href="/build-your-project"
                      className="block w-full font-mono text-[10px] tracking-[0.18em] uppercase
                        text-white/30 border border-white/[0.06]
                        hover:text-white/60 hover:border-white/20
                        py-3.5 text-center transition-all duration-200">
                      Customize Further →
                    </Link>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-cormorant text-[20px] font-light mb-5">
                      Get <em className="italic text-gold">This Template</em>
                    </h3>
                    <LeadForm
                      source={`Website Template — ${template.name}`}
                      prefillIdea={`I want the ${template.name} template.`}
                      costRange={{ min: template.price, max: Math.round(template.price * 1.3) }}
                      onClose={() => setShowLead(false)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="border border-gold/[0.08] p-5 text-center">
              <p className="text-[12px] text-white/35 font-light mb-2">
                Not sure which template fits?
              </p>
              <Link href="/ai-project-planner"
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-gold hover:text-white/70 transition-colors duration-200
                  border-b border-gold/30 pb-0.5">
                Try AI Planner →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 md:px-16 pb-20 border-t border-gold/[0.08] pt-12">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-cormorant text-[26px] font-light mb-7">
              Related <em className="italic text-gold">Templates</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((t: Template) => (
                <Link key={t.slug} href={`/website-templates/${t.slug}`}
                  className="group border border-gold/[0.1] bg-bg-secondary
                    hover:border-gold/30 transition-all duration-300 overflow-hidden">
                  <div className="relative h-[130px] overflow-hidden">
                    <Image src={t.image} alt={t.name} fill loading="lazy"
                      className="object-cover opacity-60 group-hover:opacity-80
                        group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-50`} />
                    <div className="absolute top-3 left-3 text-xl">{t.icon}</div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <div className="font-cormorant text-[18px] font-light text-white/85
                        group-hover:text-white transition-colors">{t.name}</div>
                      <div className="text-[11px] text-white/35 font-light mt-0.5">{t.tagline}</div>
                    </div>
                    <div className="font-cormorant text-[22px] font-light text-gold flex-shrink-0 ml-4">
                      ${t.price.toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}