'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const FEATURES = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-second load times with edge-optimised infrastructure. Your users never wait.' },
  { icon: '🔒', title: 'Enterprise Security', desc: 'SOC2 compliant, end-to-end encryption, and role-based access control built-in.' },
  { icon: '📊', title: 'Real-time Analytics', desc: 'Track every event, funnel, and conversion with live dashboards.' },
  { icon: '🔗', title: '200+ Integrations', desc: 'Connect Slack, Notion, HubSpot, Stripe and everything else you already use.' },
  { icon: '🤖', title: 'AI Automation', desc: 'Let AI handle repetitive tasks. Focus on what actually moves the needle.' },
  { icon: '🌍', title: 'Global CDN', desc: 'Deployed across 35 regions. Your app is always fast, everywhere.' },
]

const PRICING = [
  { name: 'Starter', price: 29, desc: 'Perfect for indie hackers', features: ['5 projects', '10k events/mo', 'Basic analytics', 'Email support'], cta: 'Start Free Trial', highlight: false },
  { name: 'Growth', price: 79, desc: 'For growing teams', features: ['Unlimited projects', '500k events/mo', 'Advanced analytics', 'Priority support', 'Custom domains', 'API access'], cta: 'Start Free Trial', highlight: true },
  { name: 'Enterprise', price: 299, desc: 'For serious scale', features: ['Everything in Growth', 'Unlimited events', 'Dedicated infra', 'SLA guarantee', 'SSO/SAML', 'Custom contracts'], cta: 'Contact Sales', highlight: false },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'CTO, Flowbase', avatar: 'SC', text: 'We switched from 3 different tools to this one platform. Cut our stack complexity by 60% and our team is shipping faster than ever.', rating: 5 },
  { name: 'Marcus Rivera', role: 'Founder, Launchpad', avatar: 'MR', text: 'The analytics alone are worth 10x the price. Finally understand exactly where users drop off and why.', rating: 5 },
  { name: 'Priya Patel', role: 'Head of Product, Orbit', avatar: 'PP', text: 'Onboarded our 50-person team in under an hour. The UX is so intuitive even non-technical people love it.', rating: 5 },
]

const STATS = [
  { value: '50K+', label: 'Active Teams' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '2.3B', label: 'Events Tracked' },
  { value: '4.9★', label: 'Average Rating' },
]

export default function SaaSTemplate() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [count, setCount] = useState({ teams: 0, uptime: 0, events: 0 })
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        .gradient-text { background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-glow:hover { box-shadow: 0 0 40px rgba(167,139,250,0.15); }
        .btn-primary { background: linear-gradient(135deg, #7c3aed, #06b6d4); }
        .btn-primary:hover { background: linear-gradient(135deg, #6d28d9, #0891b2); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(1.5);opacity:0} }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.6s ease both; }
        .hero-glow { background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 70%); }
        .feature-card { background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); backdrop-filter: blur(10px); }
        .highlight-card { background: linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%); border-color: rgba(124,58,237,0.5) !important; }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]
        bg-[#050508]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center text-sm font-bold">S</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-lg">
              Synapse
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
              Sign In
            </button>
            <button className="btn-primary text-sm px-5 py-2 rounded-lg font-medium
              transition-all hover:-translate-y-0.5">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 hero-glow">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Now with AI-powered automation
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Build products{' '}
            <span className="gradient-text">10x faster</span>{' '}
            with less chaos
          </h1>

          <p className="text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform for modern teams. Analytics, automation, integrations,
            and collaboration — beautifully unified.
          </p>

          {/* Email signup */}
          {!submitted ? (
            <form onSubmit={handleSignup}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.07] border border-white/10
                  text-white placeholder:text-white/30 text-sm outline-none
                  focus:border-purple-500/50 transition-colors"
              />
              <button type="submit"
                className="btn-primary px-6 py-3.5 rounded-xl text-sm font-semibold
                  transition-all hover:-translate-y-0.5 whitespace-nowrap">
                Start Free Trial →
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl
              bg-green-500/10 border border-green-500/30 text-green-400 mb-6">
              <span className="text-xl">✓</span>
              <span>Check your inbox — we sent you a magic link!</span>
            </div>
          )}

          <p className="text-white/35 text-sm">
            Free 14-day trial · No credit card required · Cancel anytime
          </p>
        </div>

        {/* Hero visual */}
        <div className="max-w-5xl mx-auto mt-16 relative animate-float">
          <div className="rounded-2xl border border-white/10 overflow-hidden
            bg-gradient-to-br from-white/[0.05] to-white/[0.02]
            shadow-[0_40px_120px_rgba(124,58,237,0.2)]">
            {/* Fake dashboard */}
            <div className="bg-[#0a0a12] p-4 border-b border-white/[0.06] flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 bg-white/[0.05] rounded-md h-6 mx-4 flex items-center px-3">
                <span className="text-white/30 text-[11px]">app.synapse.io/dashboard</span>
              </div>
            </div>
            <div className="p-6 grid grid-cols-4 gap-4">
              {[['↑ 24%', 'Conversion', '#7c3aed'], ['12.4k', 'Active Users', '#06b6d4'], ['$48.2k', 'MRR', '#10b981'], ['99.9%', 'Uptime', '#f59e0b']].map(([val, label, color]) => (
                <div key={label} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                  <div className="text-2xl font-bold mb-1" style={{ color }}>{val}</div>
                  <div className="text-white/40 text-xs">{label}</div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05] h-32 flex items-end gap-1">
                {[40,65,45,80,55,90,70,85,60,95,75,88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm transition-all"
                    style={{ height: `${h}%`, background: `linear-gradient(to top, #7c3aed, #06b6d4)`, opacity: 0.7 + i * 0.02 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}
              className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-4xl font-bold gradient-text mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}>{value}</div>
              <div className="text-white/45 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4">
              Everything you need
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              One platform,{' '}
              <span className="gradient-text">infinite possibilities</span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Stop duct-taping tools together. Everything works out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className="feature-card card-glow border border-white/[0.08] rounded-2xl p-6
                  transition-all duration-300 hover:border-purple-500/30 group"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10
                  border border-white/[0.08] flex items-center justify-center text-2xl mb-4
                  group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Simple, <span className="gradient-text">transparent pricing</span>
            </h2>
            <p className="text-white/45 text-lg">Start free. Scale as you grow. No surprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(plan => (
              <div key={plan.name}
                className={`rounded-2xl border p-8 transition-all duration-300
                  ${plan.highlight
                    ? 'highlight-card card-glow -translate-y-2'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'}`}>
                {plan.highlight && (
                  <div className="text-center mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase
                      px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}>{plan.name}</h3>
                <p className="text-white/40 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold"
                    style={{ fontFamily: "'Syne', sans-serif" }}>${plan.price}</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="text-green-400 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all
                  hover:-translate-y-0.5
                  ${plan.highlight
                    ? 'btn-primary'
                    : 'border border-white/15 hover:border-white/30 hover:bg-white/5'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Loved by <span className="gradient-text">50,000+ teams</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name}
                className="feature-card border border-white/[0.08] rounded-2xl p-6
                  hover:border-purple-500/20 transition-all duration-300 card-glow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full btn-primary flex items-center justify-center
                    text-sm font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Ready to <span className="gradient-text">transform</span> how you build?
          </h2>
          <p className="text-white/45 text-lg mb-10">
            Join 50,000+ teams already shipping faster. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 rounded-xl font-semibold
              hover:-translate-y-0.5 transition-all">
              Start Free Trial — No Card Needed
            </button>
            <button className="px-8 py-4 rounded-xl border border-white/15 text-sm
              hover:border-white/30 hover:bg-white/5 transition-all">
              Watch Demo →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg btn-primary flex items-center justify-center text-xs font-bold">S</div>
            <span className="font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>Synapse</span>
          </div>
          <p className="text-white/30 text-sm">© 2026 Synapse. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            {['Privacy', 'Terms', 'Security'].map(item => (
              <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
        {/* Built by badge */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/[0.04] text-center">
          <Link href="/website-templates/saas-landing"
            className="inline-flex items-center gap-2 text-xs text-white/25 hover:text-white/50
              transition-colors group">
            <span>Template by</span>
            <span className="text-gold/60 group-hover:text-gold transition-colors font-medium">
              CodeaPlus
            </span>
            <span>→</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}