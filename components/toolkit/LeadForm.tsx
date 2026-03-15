'use client'
import { useState } from 'react'

interface LeadFormProps {
  source:      string   // which tool triggered it
  prefillIdea?: string
  costRange?:  { min: number; max: number }
  onClose?:    () => void
}

const inputCls = [
  'w-full bg-surface border border-gold/[0.12]',
  'focus:border-gold/50 text-white/90 font-light text-[14px]',
  'px-4 py-3.5 outline-none transition-all duration-200',
  'placeholder:text-white/25',
].join(' ')

export default function LeadForm({ source, prefillIdea = '', costRange, onClose }: LeadFormProps) {
  const [form, setForm]     = useState({ name: '', email: '', idea: prefillIdea })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg]       = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setStatus('error'); setMsg('Please fill in your name and email.'); return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:    form.name,
          email:   form.email,
          message: form.idea,
          service: source,
          budget:  costRange ? `$${costRange.min.toLocaleString()}–$${costRange.max.toLocaleString()}` : 'TBD',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
      setMsg("We'll send your detailed project plan within 24 hours!")
    } catch (e: unknown) {
      setStatus('error')
      setMsg(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30
          flex items-center justify-center mx-auto mb-5 text-xl">✓</div>
        <h3 className="font-cormorant text-[26px] font-light mb-2">
          You're <em className="italic text-gold">all set!</em>
        </h3>
        <p className="text-[14px] text-white/50 font-light leading-[1.8] mb-6">
          {msg}
        </p>
        {onClose && (
          <button onClick={onClose}
            className="font-mono text-[10px] tracking-[0.2em] uppercase
              text-white/40 hover:text-gold transition-colors duration-200
              border-b border-gold/20 pb-0.5">
            Close
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Cost range badge */}
      {costRange && (
        <div className="flex items-center justify-between
          bg-gold/[0.06] border border-gold/20 px-4 py-3">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/70">
            Estimated Investment
          </span>
          <span className="font-cormorant text-[22px] font-light text-gold">
            ${costRange.min.toLocaleString()}–${costRange.max.toLocaleString()}
          </span>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40">
            Your Name
          </label>
          <input name="name" className={inputCls}
            value={form.name} onChange={handleChange}
            placeholder="Rahul Sharma" autoComplete="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40">
            Email Address
          </label>
          <input name="email" type="email" className={inputCls}
            value={form.email} onChange={handleChange}
            placeholder="rahul@startup.com" autoComplete="email" />
        </div>
      </div>

      {/* Idea */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/40">
          Your Startup Idea
        </label>
        <textarea name="idea"
          className={`${inputCls} resize-none min-h-[90px]`}
          value={form.idea} onChange={handleChange}
          placeholder="Describe your idea briefly..." />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="font-mono text-[11px] text-red-400
          border border-red-500/20 bg-red-500/5 px-3.5 py-3">
          ✕ {msg}
        </div>
      )}

      {/* Submit */}
      <button onClick={submit} disabled={status === 'loading'}
        className="relative overflow-hidden group
          w-full font-mono text-[11px] tracking-[0.22em] uppercase
          text-bg-primary bg-gold py-4
          disabled:opacity-60 disabled:cursor-not-allowed
          hover:-translate-y-0.5 transition-all duration-300">
        <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
          group-hover:scale-x-100 transition-transform duration-300" />
        <span className="relative z-10">
          {status === 'loading' ? 'Sending...' : 'Get Detailed Project Plan →'}
        </span>
      </button>

      <p className="font-mono text-[9px] tracking-[0.08em] uppercase
        text-white/20 text-center">
        Free consultation · No commitment · Reply within 24 hours
      </p>
    </div>
  )
}