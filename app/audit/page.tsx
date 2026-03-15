'use client'
import { useState } from 'react'
import Link from 'next/link'

const AUDIT_ITEMS = [
  {
    icon:  '⚡',
    title: 'Performance Score',
    desc:  'Core Web Vitals — LCP, FID, CLS. Load time on mobile & desktop. Image optimization, JS bundle size.',
  },
  {
    icon:  '🔍',
    title: 'SEO Analysis',
    desc:  'Meta tags, headings structure, sitemap, robots.txt, canonical URLs, Open Graph tags.',
  },
  {
    icon:  '📱',
    title: 'Mobile Experience',
    desc:  'Responsive design check, touch targets, viewport configuration, font sizes on small screens.',
  },
  {
    icon:  '🔒',
    title: 'Security Check',
    desc:  'HTTPS setup, security headers, mixed content, exposed sensitive files, basic vulnerability scan.',
  },
  {
    icon:  '♿',
    title: 'Accessibility',
    desc:  'Alt text, contrast ratios, keyboard navigation, ARIA labels, form labels — WCAG basics.',
  },
  {
    icon:  '🚀',
    title: 'Recommendations',
    desc:  'Prioritised action plan — quick wins first, then high-impact technical fixes with estimated effort.',
  },
]

const FAQS = [
  {
    q: 'How long does the audit take?',
    a: 'We aim to deliver your report within 24 hours of submission. Complex sites may take up to 48 hours.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes — completely free, no credit card, no catch. We do this because it starts a real conversation about your site.',
  },
  {
    q: 'What do I get exactly?',
    a: 'A detailed PDF/email report with scores, screenshots, specific issues found, and a prioritised list of fixes.',
  },
  {
    q: 'Will you try to sell me something?',
    a: 'We\'ll include a note about how we can help fix the issues — but there\'s zero obligation. The audit is yours to keep.',
  },
  {
    q: 'My site is new — is it worth auditing?',
    a: 'Absolutely. Early audits catch problems before they compound. Better to fix now than after you\'ve built on a weak foundation.',
  },
]

export default function AuditPage() {
  const [email,    setEmail]    = useState('')
  const [url,      setUrl]      = useState('')
  const [name,     setName]     = useState('')
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [openFaq,  setOpenFaq]  = useState<number | null>(null)

  const submit = async () => {
    if (!name.trim() || !email.trim() || !url.trim()) {
      setStatus('error')
      setErrorMsg('Please fill in all fields.')
      return
    }
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/
    if (!urlPattern.test(url.trim())) {
      setStatus('error')
      setErrorMsg('Please enter a valid website URL.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/audit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:  name.trim(),
          email: email.trim(),
          url:   url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
    } catch (e: unknown) {
      setStatus('error')
      setErrorMsg(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <main className="bg-bg-primary min-h-screen">

      {/* ── Nav back link ── */}
      <div className="px-6 md:px-16 pt-24 pb-0">
        <Link
          href="/"
          className="inline-flex items-center gap-2
            font-mono text-[9px] tracking-[0.2em] uppercase
            text-white/30 hover:text-gold transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="px-6 md:px-16 py-14 md:py-20 relative overflow-hidden">
        {/* BG glow */}
        <div className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_70%)]" />

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6
            font-mono text-[10px] tracking-[0.3em] uppercase
            text-gold/80 border border-gold/20 rounded-full
            px-4 py-[5px] bg-gold/[0.05]">
            Free · No commitment · 24hr delivery
          </div>

          <h1 className="font-cormorant font-light leading-[1.0] mb-6
            text-[clamp(40px,7vw,88px)]">
            Free Website
            <br />
            <em className="italic text-gold">Technical Audit</em>
          </h1>

          <p className="text-[15px] md:text-[17px] font-light text-white/50
            leading-[1.8] max-w-[560px] mx-auto">
            We analyse your website's performance, SEO, mobile experience, and security —
            then send you a prioritised action plan.{' '}
            <strong className="text-white/70 font-normal">Worth $500. Completely free.</strong>
          </p>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="px-6 md:px-16 py-12 md:py-16 border-t border-gold/[0.08]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
              What's included
            </p>
            <h2 className="font-cormorant font-light text-[clamp(28px,4vw,48px)]">
              6 Areas We <em className="italic text-gold">Analyse</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            border border-gold/[0.08]">
            {AUDIT_ITEMS.map((item, i) => {
              const isLastRow   = i >= AUDIT_ITEMS.length - 3
              const isThirdCol  = (i + 1) % 3 === 0
              return (
                <div
                  key={item.title}
                  className={[
                    'p-6 md:p-8 border-gold/[0.08]',
                    'border-b md:border-b-0',
                    !isLastRow   ? 'lg:border-b lg:border-gold/[0.08]' : '',
                    !isThirdCol  ? 'lg:border-r lg:border-gold/[0.08]' : '',
                    i < 2        ? 'sm:border-r sm:border-gold/[0.08]' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span className="text-2xl mb-3 block" aria-hidden="true">{item.icon}</span>
                  <h3 className="font-cormorant text-[20px] font-light text-white/90 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[13px] font-light text-white/45 leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="px-6 md:px-16 py-16 md:py-24 border-t border-gold/[0.08]">
        <div className="max-w-[600px] mx-auto">

          {status === 'success' ? (
            /* Success */
            <div className="text-center border border-gold/20 bg-bg-secondary px-8 py-14 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]
                bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30
                flex items-center justify-center mx-auto mb-6 text-2xl">
                ✓
              </div>
              <h3 className="font-cormorant text-[32px] font-light mb-3">
                You're on the list!
              </h3>
              <p className="text-[14px] text-white/50 font-light leading-[1.8] mb-6">
                We'll analyse <strong className="text-white/70 font-normal">{url}</strong> and
                send your free audit report to{' '}
                <strong className="text-white/70 font-normal">{email}</strong>{' '}
                within 24 hours.
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400
                  shadow-[0_0_6px_rgba(74,222,128,0.5)] animate-blink-dot" />
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/35">
                  Check your spam folder too
                </span>
              </div>
              <Link
                href="/"
                className="font-mono text-[10px] tracking-[0.2em] uppercase
                  text-white/40 hover:text-gold transition-colors duration-200
                  border-b border-gold/20 pb-0.5"
              >
                ← Back to Home
              </Link>
            </div>

          ) : (
            /* Form */
            <div className="border border-gold/20 bg-bg-secondary px-7 sm:px-10 py-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]
                bg-gradient-to-r from-transparent via-gold to-transparent" />

              <h2 className="font-cormorant text-[clamp(24px,4vw,36px)] font-light mb-2">
                Claim Your Free Audit
              </h2>
              <p className="text-[13px] text-white/40 font-light mb-8">
                Fill in the form — we'll do the rest.
              </p>

              <div className="flex flex-col gap-4">

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={e => { setName(e.target.value); setStatus('idle') }}
                    autoComplete="name"
                    className="bg-surface border border-gold/[0.12]
                      focus:border-gold/50 text-white/90 font-light text-[14px]
                      px-4 py-3.5 outline-none transition-all duration-200
                      placeholder:text-white/25"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@company.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setStatus('idle') }}
                    autoComplete="email"
                    className="bg-surface border border-gold/[0.12]
                      focus:border-gold/50 text-white/90 font-light text-[14px]
                      px-4 py-3.5 outline-none transition-all duration-200
                      placeholder:text-white/25"
                  />
                </div>

                {/* URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40">
                    Website URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={url}
                    onChange={e => { setUrl(e.target.value); setStatus('idle') }}
                    className="bg-surface border border-gold/[0.12]
                      focus:border-gold/50 text-white/90 font-light text-[14px]
                      px-4 py-3.5 outline-none transition-all duration-200
                      placeholder:text-white/25"
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="font-mono text-[11px] text-red-400
                    border border-red-500/20 bg-red-500/5 px-3.5 py-3">
                    ✕ {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={submit}
                  disabled={status === 'loading'}
                  className="relative overflow-hidden group
                    w-full font-mono text-[11px] tracking-[0.22em] uppercase
                    text-bg-primary bg-gold py-4
                    disabled:opacity-60 disabled:cursor-not-allowed
                    hover:-translate-y-0.5 transition-all duration-300 mt-2"
                >
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">
                    {status === 'loading' ? 'Submitting...' : 'Get My Free Audit →'}
                  </span>
                </button>

                <p className="font-mono text-[9px] tracking-[0.08em] uppercase
                  text-white/20 text-center">
                  No spam · Report delivered within 24 hours
                </p>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 md:px-16 py-16 md:py-20 border-t border-gold/[0.08]">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-cormorant font-light text-[clamp(28px,4vw,48px)] mb-10 text-center">
            Common <em className="italic text-gold">Questions</em>
          </h2>

          <div className="flex flex-col divide-y divide-gold/[0.08]">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left
                    group transition-colors duration-200"
                >
                  <span className="font-outfit text-[15px] font-light text-white/80
                    group-hover:text-white transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span className={`font-mono text-gold flex-shrink-0 transition-transform duration-300
                    ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-[13px] font-light text-white/45 leading-[1.8] mt-3 pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-6 md:px-16 py-14 border-t border-gold/[0.08] text-center">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">
          Rather talk directly?
        </p>
        <a
          href="https://wa.me/918471090481?text=Hi%20CodeaPlus!%20I%20want%20a%20free%20audit."
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] tracking-[0.2em] uppercase
            text-gold hover:text-white/70 transition-colors duration-200
            border-b border-gold/30 pb-0.5"
        >
          Chat on WhatsApp →
        </a>
      </section>

    </main>
  )
}