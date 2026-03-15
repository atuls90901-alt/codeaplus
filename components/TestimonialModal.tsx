'use client'
import { useState } from 'react'

interface Props { onClose: () => void }

const inputCls = [
  'w-full bg-surface border border-gold/10',
  'focus:border-gold/50 text-white font-light text-[14px]',
  'px-4 py-3 outline-none transition-all duration-200',
  'placeholder:text-white/20',
].join(' ')

export default function TestimonialModal({ onClose }: Props) {
  const [form, setForm]     = useState({ author_name: '', author_role: '', content: '', rating: 5 })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg]       = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async () => {
    if (!form.author_name.trim() || !form.content.trim()) {
      setStatus('error'); setMsg('Please fill your name and review.'); return
    }
    setStatus('loading')
    try {
      const res  = await fetch('/api/testimonial', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success'); setMsg(data.message)
    } catch (e: unknown) {
      setStatus('error')
      setMsg(e instanceof Error ? e.message : 'Something went wrong.')
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
        <div className="
          w-full max-w-[500px] bg-bg-secondary border border-gold/20
          relative max-h-[90vh] overflow-y-auto
          p-6 sm:p-8 md:p-10
          shadow-[0_24px_64px_rgba(0,0,0,0.7)]
          animate-fade-up">

          {/* Gold top accent line — pure Tailwind */}
          <div className="absolute top-0 left-0 right-0 h-[2px]
            bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-8 h-8
              flex items-center justify-center rounded-full
              bg-white/5 hover:bg-white/10
              font-mono text-base text-white/30 hover:text-white
              transition-all duration-200"
          >
            ✕
          </button>

          {/* ── Success state ── */}
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-5">🌟</div>
              <div className="font-cormorant text-2xl font-light mb-3">Thank You!</div>
              <p className="text-[14px] text-white/50 font-light leading-[1.7]
                max-w-[320px] mx-auto">
                Your review has been submitted and will appear after admin approval.
              </p>
              <button
                onClick={onClose}
                className="font-mono text-[10px] tracking-[0.2em] uppercase
                  text-bg-primary bg-gold px-8 py-3 mt-8
                  hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>

          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="font-cormorant text-2xl md:text-3xl font-light mb-1">
                  Share Your{' '}
                  <span className="italic text-gold">Experience</span>
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                  Your review helps others decide
                </div>
              </div>

              {/* Star rating */}
              <div className="flex flex-col gap-2 mb-5">
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      className={`text-3xl transition-colors duration-150 hover:text-gold
                        ${star <= form.rating ? 'text-gold' : 'text-white/15'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-4">

                {/* Name + Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
                      Your Name *
                    </label>
                    <input
                      name="author_name"
                      className={inputCls}
                      value={form.author_name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      autoComplete="name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
                      Role / Company
                    </label>
                    <input
                      name="author_role"
                      className={inputCls}
                      value={form.author_role}
                      onChange={handleChange}
                      placeholder="CEO, TechCo"
                      autoComplete="organization-title"
                    />
                  </div>
                </div>

                {/* Review */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40">
                    Your Review *
                  </label>
                  <textarea
                    name="content"
                    className={`${inputCls} resize-none min-h-[110px]`}
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Tell us about your experience working with CodeaPlus..."
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="font-mono text-[11px] text-red-400
                    border border-red-500/20 bg-red-500/5 px-3.5 py-3">
                    ✕ {msg}
                  </div>
                )}

                {/* Submit row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
                  <button
                    onClick={submit}
                    disabled={status === 'loading'}
                    className="relative overflow-hidden group
                      font-mono text-[11px] tracking-[0.2em] uppercase
                      text-bg-primary bg-gold px-8 py-3.5
                      disabled:opacity-60 disabled:cursor-not-allowed
                      w-full sm:w-auto text-center
                      hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
                      group-hover:scale-x-100 transition-transform duration-300" />
                    <span className="relative z-10">
                      {status === 'loading' ? 'Submitting...' : 'Submit Review →'}
                    </span>
                  </button>

                  <p className="font-mono text-[9px] tracking-[0.1em] uppercase
                    text-white/25 leading-relaxed text-center sm:text-left">
                    Visible after<br />admin approval
                  </p>
                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}