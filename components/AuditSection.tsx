'use client'
import { useState } from 'react'

const CHECKS = [
  { icon: '⚡', label: 'Performance Score'   },
  { icon: '🔍', label: 'SEO Analysis'        },
  { icon: '📱', label: 'Mobile Friendliness' },
  { icon: '🔒', label: 'Security Check'      },
]

export default function AuditSection() {
  const [email,    setEmail]    = useState('')
  const [url,      setUrl]      = useState('')
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const submit = async () => {
    if (!email.trim() || !url.trim()) {
      setStatus('error')
      setErrorMsg('Please enter both your email and website URL.')
      return
    }
    // Basic URL validation
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
    <section
      id="audit"
      className="bg-bg-primary py-20 md:py-28 px-4 sm:px-8 md:px-16
        border-t border-gold/[0.08]"
    >
      <div className="max-w-[900px] mx-auto">

        {/* Card */}
        <div className="relative overflow-hidden
          border border-gold/20 bg-bg-secondary
          px-6 sm:px-10 md:px-16 py-12 md:py-16">

          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full
            bg-[radial-gradient(circle,rgba(201,168,76,0.07)_0%,transparent_70%)]
            pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full
            bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)]
            pointer-events-none" />

          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]
            bg-gradient-to-r from-transparent via-gold to-transparent" />

          {status === 'success' ? (
            /* ── Success state ── */
            <div className="text-center py-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30
                flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-cormorant text-[28px] md:text-[36px] font-light mb-3">
                Audit Request <em className="italic text-gold">Received!</em>
              </h3>
              <p className="text-[14px] text-white/50 font-light leading-[1.8]
                max-w-[400px] mx-auto mb-6">
                We're analyzing your website. Your free audit report will arrive
                in your inbox within <strong className="text-white/70 font-normal">24 hours.</strong>
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400
                  shadow-[0_0_6px_rgba(74,222,128,0.5)] animate-blink-dot" />
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/35">
                  Check your spam folder too
                </span>
              </div>
            </div>

          ) : (
            /* ── Form state ── */
            <div className="relative z-10">

              {/* Header */}
              <div className="text-center mb-10 md:mb-12">
                <div className="inline-flex items-center gap-2 mb-4
                  font-mono text-[10px] tracking-[0.3em] uppercase
                  text-gold/80 border border-gold/20 rounded-full
                  px-4 py-[5px] bg-gold/[0.05]">
                  Free · No commitment
                </div>
                <h2 className="font-cormorant font-light leading-[1.05] mb-4
                  text-[clamp(30px,5vw,58px)]">
                  Get a Free{' '}
                  <em className="italic text-gold">Technical Audit</em>
                </h2>
                <p className="text-[14px] md:text-[15px] font-light text-white/50
                  leading-[1.8] max-w-[480px] mx-auto">
                  We'll review your website's performance, SEO, mobile experience,
                  and security — and send you a prioritised action plan within 24 hours.
                  <strong className="text-white/70 font-normal"> Worth $500. Yours free.</strong>
                </p>
              </div>

              {/* What's included */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {CHECKS.map(c => (
                  <div key={c.label}
                    className="flex flex-col items-center gap-2 p-4
                      border border-gold/[0.08] bg-white/[0.02]
                      text-center">
                    <span className="text-xl" aria-hidden="true">{c.icon}</span>
                    <span className="font-mono text-[9px] tracking-[0.15em] uppercase
                      text-white/45">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-[640px] mx-auto mb-4">
                <input
                  type="url"
                  placeholder="yourwebsite.com"
                  value={url}
                  onChange={e => { setUrl(e.target.value); setStatus('idle') }}
                  className="flex-1 bg-surface border border-gold/[0.12]
                    focus:border-gold/50 text-white/90 font-light text-[14px]
                    px-4 py-3.5 outline-none transition-all duration-200
                    placeholder:text-white/25"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle') }}
                  className="flex-1 bg-surface border border-gold/[0.12]
                    focus:border-gold/50 text-white/90 font-light text-[14px]
                    px-4 py-3.5 outline-none transition-all duration-200
                    placeholder:text-white/25"
                />
                <button
                  onClick={submit}
                  disabled={status === 'loading'}
                  className="relative overflow-hidden group
                    font-mono text-[10px] tracking-[0.2em] uppercase
                    text-bg-primary bg-gold
                    px-7 py-3.5 flex-shrink-0
                    disabled:opacity-60 disabled:cursor-not-allowed
                    hover:-translate-y-0.5 transition-all duration-300
                    whitespace-nowrap"
                >
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">
                    {status === 'loading' ? 'Sending...' : 'Claim Free Audit →'}
                  </span>
                </button>
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="text-center font-mono text-[11px] text-red-400
                  border border-red-500/20 bg-red-500/5 px-4 py-3
                  max-w-[640px] mx-auto mb-3">
                  ✕ {errorMsg}
                </p>
              )}

              {/* Trust note */}
              <p className="text-center font-mono text-[9px] tracking-[0.1em]
                uppercase text-white/20 mt-3">
                No spam · We'll only use your email to send the audit report
              </p>

            </div>
          )}
        </div>
      </div>
    </section>
  )
}