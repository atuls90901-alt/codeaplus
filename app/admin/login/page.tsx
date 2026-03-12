'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/admin')
  }

  const inputClass = "w-full bg-[#111] border border-gold/10 focus:border-gold text-white font-light text-[14px] px-5 py-3.5 outline-none transition-all duration-300"

  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
      <div className="w-[420px] border border-gold/10 p-10 bg-[#0a0a0a]">
        <div className="font-cormorant text-3xl font-light mb-2 text-center">
          CodeaPlus<span className="text-gold">.</span>
        </div>
        <div className="font-mono text-[10px] tracking-[.3em] uppercase text-white/40 text-center mb-10">Admin Panel</div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50">Email</label>
            <input className={inputClass} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@studio.com" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50">Password</label>
            <input className={inputClass} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&login()} />
          </div>
          {error && <div className="font-mono text-[11px] text-red-400 border border-red-500/20 p-3 bg-red-500/5">{error}</div>}
          <button onClick={login} disabled={loading}
            className="w-full font-mono text-[11px] tracking-[.2em] uppercase text-[#060606] bg-gold py-4 relative overflow-hidden group disabled:opacity-60 mt-2">
            <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10">{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}