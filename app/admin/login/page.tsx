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

  const inputClass = "w-full bg-surface border border-gold/10 focus:border-gold/50 text-white font-light text-sm px-5 py-3.5 outline-none transition-all duration-300 placeholder:text-white/20"

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-[420px] border border-gold/10 bg-bg-secondary p-8 sm:p-10">

        {/* Gold top bar */}
        <div className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-cormorant text-3xl font-light">
            CodeaPlus<span className="text-gold">.</span>
          </div>
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-white/35 mt-2">
            Admin Panel
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/45">
              Email
            </label>
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@codeaplus.pro"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/45">
              Password
            </label>
            <input
              className={inputClass}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && login()}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="font-mono text-[11px] text-red-400 border border-red-500/20 bg-red-500/5 px-4 py-3 leading-relaxed">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={login}
            disabled={loading}
            className="relative overflow-hidden group w-full font-mono text-[11px] tracking-[.2em] uppercase text-bg-primary bg-gold py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity">
            <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10">
              {loading ? 'Signing In...' : 'Sign In →'}
            </span>
          </button>

        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gold/8 text-center">
          <span className="font-mono text-[9px] tracking-[.15em] uppercase text-white/20">
            Restricted Access
          </span>
        </div>

      </div>
    </div>
  )
}