'use client'
import { useState } from 'react'
import Link from 'next/link'

const SERVICES = [
  { icon: '◈', title: 'Brand Identity', desc: 'Logo, typography, color systems, and brand guidelines that make you unforgettable.' },
  { icon: '◉', title: 'Web Design', desc: 'Pixel-perfect digital experiences that convert visitors into loyal customers.' },
  { icon: '◐', title: 'Motion Design', desc: 'Animations and interactions that bring your brand to life.' },
  { icon: '◑', title: 'Strategy', desc: 'Positioning, messaging, and go-to-market strategy for growing brands.' },
]

const WORK = [
  { title: 'Luminary', category: 'Brand Identity', year: '2025', color: '#f0a500', bg: '#1a0f00' },
  { title: 'Axiom', category: 'Web Design', year: '2025', color: '#00d4ff', bg: '#001a1f' },
  { title: 'Vesper', category: 'Motion + Web', year: '2024', color: '#ff6b6b', bg: '#1a0000' },
  { title: 'Crestline', category: 'Full Rebrand', year: '2024', color: '#7c3aed', bg: '#0d0014' },
]

export default function AgencyPortfolioTemplate() {
  const [hoveredWork, setHoveredWork] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', project: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Editorial+New:ital@0;1&family=Neue+Montreal:wght@400;500&display=swap');
        .editorial { font-family: 'Georgia', 'Times New Roman', serif; font-style: italic; }
        .work-item:hover .work-num { color: white; }
        .work-item:hover .work-arrow { opacity: 1; transform: translate(0,0); }
        .work-arrow { opacity: 0; transform: translate(-8px, 8px); transition: all 0.3s ease; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-inner { animation: marquee 20s linear infinite; }
        .cursor-dot { width: 6px; height: 6px; background: white; }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6
        flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">
          FORMA<span className="editorial text-white/50">studio</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm text-white/50">
          {['Work', 'Services', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="hover:text-white transition-colors tracking-widest uppercase text-[11px]">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-white/50">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Available
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end pb-20 px-8 pt-32 relative">
        <div className="noise absolute inset-0 pointer-events-none" />

        <div className="max-w-6xl">
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/35 mb-8">
            Design Studio — Est. 2019 — Berlin / Remote
          </p>
          <h1 className="text-[clamp(60px,10vw,130px)] font-bold leading-[0.92] mb-10"
            style={{ letterSpacing: '-0.03em' }}>
            We craft brands<br />
            <span className="editorial font-normal text-white/40">that</span>{' '}
            people<br />remember.
          </h1>
          <div className="flex items-end justify-between">
            <div className="max-w-sm">
              <p className="text-white/45 leading-relaxed text-lg">
                Brand identity, web design, and motion for ambitious companies building the future.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#work"
                className="flex items-center gap-3 border border-white/20 px-8 py-4
                  text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black
                  transition-all duration-300">
                View Work
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-white/20" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/25 rotate-90 origin-center">
            Scroll
          </span>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 border-y border-white/[0.06] overflow-hidden">
        <div className="flex whitespace-nowrap marquee-inner">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-[11px] tracking-[0.4em] uppercase text-white/25">
              Brand Identity · Web Design · Motion Graphics · Strategy ·
            </span>
          ))}
        </div>
      </div>

      {/* Work */}
      <section id="work" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-5xl font-bold" style={{ letterSpacing: '-0.03em' }}>
              Selected<br /><span className="editorial font-normal">work</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xs text-right">
              A curated selection of projects from the past two years.
            </p>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {WORK.map((item, i) => (
              <div key={item.title}
                onMouseEnter={() => setHoveredWork(i)}
                onMouseLeave={() => setHoveredWork(null)}
                className="work-item py-10 flex items-center justify-between group cursor-pointer
                  transition-all duration-300">
                <div className="flex items-center gap-8">
                  <span className="work-num text-white/15 font-bold text-sm transition-colors duration-300
                    w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-4xl font-bold transition-all duration-300"
                      style={{
                        letterSpacing: '-0.02em',
                        color: hoveredWork === i ? item.color : 'white'
                      }}>
                      {item.title}
                    </h3>
                    <p className="text-white/35 text-sm mt-1 tracking-widest uppercase text-[11px]">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-white/25 text-sm">{item.year}</span>
                  <span className="work-arrow text-2xl" style={{ color: item.color }}>↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="pr-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/35 mb-6">What we do</p>
            <h2 className="text-5xl font-bold leading-[1.05]" style={{ letterSpacing: '-0.03em' }}>
              Full-service<br />creative <span className="editorial font-normal">studio</span>
            </h2>
          </div>
          <div className="space-y-0 divide-y divide-white/[0.06]">
            {SERVICES.map(s => (
              <div key={s.title} className="py-6 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <span className="text-white/20 text-xl mt-0.5 group-hover:text-white
                    transition-colors">{s.icon}</span>
                  <div>
                    <h3 className="font-bold mb-2 group-hover:text-white/80 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-8 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[['8+', 'Years'], ['120+', 'Projects'], ['40+', 'Countries'], ['98%', 'Retention']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ letterSpacing: '-0.03em' }}>{val}</div>
              <div className="text-white/35 text-sm tracking-widest uppercase text-[11px]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/35 mb-6">Start a project</p>
            <h2 className="text-6xl font-bold" style={{ letterSpacing: '-0.03em' }}>
              Let&apos;s build<br />something <span className="editorial font-normal">great.</span>
            </h2>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-b border-white/20 pb-3">
                  <input
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent text-xl outline-none placeholder:text-white/25"
                  />
                </div>
                <div className="border-b border-white/20 pb-3">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email address"
                    className="w-full bg-transparent text-xl outline-none placeholder:text-white/25"
                  />
                </div>
              </div>
              <div className="border-b border-white/20 pb-3">
                <input
                  value={formData.project}
                  onChange={e => setFormData({ ...formData, project: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full bg-transparent text-xl outline-none placeholder:text-white/25"
                />
              </div>
              <button type="submit"
                className="flex items-center gap-4 border border-white/30 px-10 py-5
                  text-[11px] tracking-[0.3em] uppercase hover:bg-white hover:text-black
                  transition-all duration-300 group">
                Send Message
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          ) : (
            <div className="border border-white/20 p-12 text-center">
              <div className="text-5xl mb-6">✓</div>
              <h3 className="text-3xl font-bold mb-3">Message received.</h3>
              <p className="text-white/45">We&apos;ll be in touch within 24 hours.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 border-t border-white/[0.06]
        flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold">FORMA<span className="editorial font-normal text-white/40">studio</span></span>
        <p className="text-white/25 text-sm">© 2026 Formastudio</p>
        <Link href="/website-templates/agency-portfolio"
          className="text-[11px] tracking-[0.2em] uppercase text-white/25
            hover:text-gold/70 transition-colors">
          Template by CodeaPlus →
        </Link>
      </footer>
    </div>
  )
}