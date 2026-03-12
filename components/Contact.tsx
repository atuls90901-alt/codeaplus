'use client'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import LoginModal from './LoginModal'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', service: 'Website Design & Development', budget: '₹10K – ₹30K', message: '' })
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
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStatus('success')
      setMsg("Message sent! We'll reply within 24 hours. ✓")
      setForm({ name: '', email: user?.email || '', service: 'Website Design & Development', budget: '₹10K – ₹30K', message: '' })
    } catch (e: any) { setStatus('error'); setMsg(e.message || 'Something went wrong.') }
  }

  const iCls = "bg-[#111] border border-gold/10 focus:border-gold text-white font-light text-[14px] px-[18px] py-3.5 outline-none transition-all duration-300 w-full"

  return (
    <>
      <section ref={ref} id="contact" className="py-32 px-16 bg-[#060606] grid grid-cols-2 gap-24 items-start">
        <div className="reveal-left">
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
            Let's Talk <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
          </div>
          <h2 className="font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05] mb-5">
            Start Your <em className="italic text-gold">Project</em>
          </h2>
          <p className="text-[16px] font-light text-white/50 leading-[1.8] max-w-[460px]">
            Ready to build something extraordinary? We reply within 24 hours — no fluff, just results.
          </p>
          <div className="flex flex-col gap-4 mt-11">
            {[{ icon:'✉',label:'Email',val:'hello@yourstudio.com' },{ icon:'◎',label:'WhatsApp',val:'+91 98765 43210' },{ icon:'⬡',label:'Location',val:'India — Working Globally' }].map(c => (
              <div key={c.label} className="flex gap-5 items-center p-5 px-6 border border-gold/10 hover:border-gold/38 hover:bg-gold/2 transition-all" data-hover>
                <span className="text-xl">{c.icon}</span>
                <div><div className="font-mono text-[9px] tracking-[.2em] uppercase text-gold mb-1">{c.label}</div><div className="text-[14px] text-white/50">{c.val}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-right">
          {!user && (
            <div className="border border-gold/20 bg-gold/5 p-5 mb-6 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-[.2em] uppercase text-gold mb-1">Login Required</div>
                <div className="text-[13px] text-white/50 font-light">Sign in to send us a message</div>
              </div>
              <button onClick={() => setShowModal(true)} className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-5 py-2.5 hover:bg-gold-light transition-colors flex-shrink-0">
                Sign In →
              </button>
            </div>
          )}

          <div className={`flex flex-col gap-4 ${!user ? 'opacity-50 pointer-events-none select-none' : ''}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2"><label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50">Your Name</label><input className={iCls} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Doe" /></div>
              <div className="flex flex-col gap-2"><label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50">Email Address</label><input className={iCls} type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="john@company.com" /></div>
            </div>
            <div className="flex flex-col gap-2"><label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50">Service Needed</label>
              <select className={iCls} value={form.service} onChange={e=>setForm({...form,service:e.target.value})} style={{appearance:'none'}}>
                {['Website Design & Development','Full Stack Web App','E-Commerce Store','Website Maintenance','API Development'].map(s=><option key={s} style={{background:'#111'}}>{s}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2"><label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50">Budget Range</label>
              <select className={iCls} value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} style={{appearance:'none'}}>
                {['₹10K – ₹30K','₹30K – ₹75K','₹75K – ₹2L','₹2L+'].map(b=><option key={b} style={{background:'#111'}}>{b}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2"><label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50">Project Details</label><textarea className={`${iCls} resize-y min-h-[130px]`} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your project, goals and timeline..." /></div>
          </div>

          {msg && <div className={`font-mono text-[11px] p-3 border mt-4 ${status==='success'?'border-green-500/30 text-green-400 bg-green-500/5':'border-red-500/30 text-red-400 bg-red-500/5'}`}>{msg}</div>}

          <button onClick={submit} disabled={status==='loading'}
            className="font-mono text-[11px] tracking-[.2em] uppercase text-[#060606] bg-gold px-11 py-4 flex items-center gap-3 w-fit relative overflow-hidden group disabled:opacity-60 mt-5" data-hover>
            <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10">{!user?'Sign In to Send →':status==='loading'?'Sending...':'Send Message →'}</span>
          </button>
        </div>
      </section>

      {showModal && <LoginModal onClose={()=>setShowModal(false)} onSuccess={()=>setShowModal(false)} />}
    </>
  )
}
