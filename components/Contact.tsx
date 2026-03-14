'use client'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import LoginModal from './LoginModal'

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>
      </svg>
    ),
    label: 'Email',
    val: 'codeaplussupport@gmail.com',
    href: 'mailto:codeaplussupport@gmail.com',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.1 12.1 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
      </svg>
    ),
    label: 'WhatsApp',
    val: '+91 84710 90481',
    href: 'https://wa.me/918471090481?text=Hi%20CodeaPlus!%20I%20want%20to%20discuss%20a%20project.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    label: 'Location',
    val: 'India — Working Globally',
    href: null,
  },
]

const inputCls = "w-full bg-[#0e0e0e] border border-gold/[0.12] focus:border-gold/50 focus:bg-surface text-white/88 font-light text-sm px-4 py-3 outline-none transition-all duration-200 placeholder:text-white/20 appearance-none"

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '',
    service: 'Website Design & Development',
    budget: '₹10K – ₹30K',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (user?.email) setForm(f => ({ ...f, email: user.email! }))
  }, [user])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal-left,.reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const submit = async () => {
    if (!user) { setShowModal(true); return }
    if (!form.name || !form.email) { setStatus('error'); setMsg('Please fill in name and email.'); return }
    setStatus('loading')
    try {
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
      setMsg("Message sent! We'll reply within 24 hours. ✓")
      setForm({ name: '', email: user?.email || '', service: 'Website Design & Development', budget: '₹10K – ₹30K', message: '' })
    } catch (e: any) {
      setStatus('error'); setMsg(e.message || 'Something went wrong.')
    }
  }

  return (
    <>
      <section
        ref={ref}
        id="contact"
        className="bg-bg-primary py-14 md:py-20 px-4 sm:px-8 md:px-16"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">

          {/* ── LEFT ── */}
          <div className="reveal-left">

            {/* Eyebrow */}
            <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3.5 flex items-center gap-3">
              Let's Talk
              <span className="flex-1 max-w-[48px] h-px bg-gold/20" />
            </div>

            {/* Title */}
            <h2 className="font-cormorant text-[clamp(36px,5vw,68px)] font-light leading-[1.05] text-white mb-4">
              Start Your <em className="text-gold italic">Project</em>
            </h2>

            {/* Sub */}
            <p className="text-[14px] md:text-[15px] font-light text-white/50 leading-[1.8] mb-8 md:mb-9">
              Ready to build something extraordinary? We reply within 24 hours — no fluff, just results.
            </p>

            {/* Contact rows */}
            <div className="flex flex-col gap-2.5 mb-7">
              {contactInfo.map(c => {
                const Tag = c.href ? 'a' : 'div'
                return (
                  <Tag
                    key={c.label}
                    {...(c.href ? {
                      href: c.href,
                      target: c.href.startsWith('http') ? '_blank' : undefined,
                      rel: 'noopener noreferrer',
                    } : {})}
                    className="group flex items-center gap-4 px-4 py-3.5 border border-gold/10
                      bg-white/[0.01] transition-all duration-250
                      hover:border-gold/35 hover:bg-gold/[0.04]"
                    style={c.href ? { cursor: 'pointer', textDecoration: 'none' } : {}}
                  >
                    {/* Icon box */}
                    <span className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0
                      text-gold/70 bg-gold/[0.07] border border-gold/[0.1]
                      group-hover:bg-gold/[0.14] group-hover:text-gold
                      transition-all duration-250">
                      {c.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[9px] tracking-[.2em] uppercase text-gold/60 mb-0.5">
                        {c.label}
                      </div>
                      <div className="text-[13px] md:text-[14px] text-white/70 font-light tracking-[.01em]
                        group-hover:text-white/90 transition-colors duration-250 truncate">
                        {c.val}
                      </div>
                    </div>
                    {/* Arrow — only for clickable */}
                    {c.href && (
                      <span className="text-gold text-sm opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250 flex-shrink-0">
                        ↗
                      </span>
                    )}
                  </Tag>
                )
              })}
            </div>

            {/* Response badge */}
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[.12em] text-white/35
              px-3.5 py-2 border border-gold/10 bg-gold/[0.03]">
              <span className="w-[7px] h-[7px] rounded-full bg-green-400 flex-shrink-0
                shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-blink-dot" />
              Average reply time: under 2 hours
            </div>
          </div>

          {/* ── RIGHT — Form ── */}
          <div className="reveal-right">

            {/* Login banner */}
            {!user && (
              <div className="flex items-center justify-between gap-4 border border-gold/20 bg-gold/[0.04] px-4 md:px-[18px] py-4 mb-5">
                <div>
                  <div className="font-mono text-[10px] tracking-[.2em] uppercase text-gold mb-1">Login Required</div>
                  <div className="text-[13px] text-white/45 font-light">Sign in to send us a message</div>
                </div>
                <button onClick={() => setShowModal(true)}
                  className="font-mono text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold border-none px-5 py-2.5 cursor-pointer flex-shrink-0 hover:opacity-85 transition-opacity whitespace-nowrap">
                  Sign In →
                </button>
              </div>
            )}

            {/* Form fields */}
            <div className={`flex flex-col gap-3.5 ${!user ? 'opacity-45 pointer-events-none select-none' : ''}`}>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[.22em] uppercase text-white/45">Your Name</label>
                  <input className={inputCls} value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[.22em] uppercase text-white/45">Email Address</label>
                  <input className={inputCls} type="email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} placeholder="rahul@company.com" />
                </div>
              </div>

              {/* Service */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] tracking-[.22em] uppercase text-white/45">Service Needed</label>
                <div className="relative">
                  <select className={`${inputCls} pr-9 cursor-pointer`} value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}>
                    {['Website Design & Development','Full Stack Web App','E-Commerce Store','Website Maintenance','API Development']
                      .map(s => <option key={s} style={{ background: '#111' }}>{s}</option>)}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/50 text-xs pointer-events-none">▾</span>
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] tracking-[.22em] uppercase text-white/45">Budget Range</label>
                <div className="relative">
                  <select className={`${inputCls} pr-9 cursor-pointer`} value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}>
                    {['₹10K – ₹30K','₹30K – ₹75K','₹75K – ₹2L','₹2L+']
                      .map(b => <option key={b} style={{ background: '#111' }}>{b}</option>)}
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/50 text-xs pointer-events-none">▾</span>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] tracking-[.22em] uppercase text-white/45">Project Details</label>
                <textarea className={`${inputCls} resize-y min-h-[120px]`} value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project, goals and timeline..." />
              </div>
            </div>

            {/* Status message */}
            {msg && (
              <div className={`font-mono text-[11px] px-3.5 py-3 mt-3 tracking-[.05em] rounded-sm
                ${status === 'success'
                  ? 'border border-green-500/30 text-green-400 bg-green-500/[0.05]'
                  : 'border border-red-500/30 text-red-400 bg-red-500/[0.05]'}`}>
                {status === 'success' ? '✓ ' : '✕ '}{msg}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={submit}
              disabled={status === 'loading'}
              className="relative overflow-hidden group w-full mt-4 flex items-center justify-center
                font-mono text-[11px] tracking-[.22em] uppercase text-bg-primary bg-gold
                px-10 py-4 border-none cursor-pointer
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-opacity">
              <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative z-10">
                {!user ? 'Sign In to Send →' : status === 'loading' ? 'Sending...' : 'Send Message →'}
              </span>
            </button>

          </div>
        </div>
      </section>

      {showModal && <LoginModal onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />}
    </>
  )
}