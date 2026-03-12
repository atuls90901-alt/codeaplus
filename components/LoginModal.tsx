'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface LoginModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'verify'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleEmailAuth = async () => {
    if (!email || !password) { setStatus('error'); setErrMsg('Please fill all fields.'); return }
    setStatus('loading')
    try {
      if (tab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onSuccess()
        onClose()
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setStatus('verify')
      }
    } catch (e: any) {
      setStatus('error')
      setErrMsg(e.message || 'Something went wrong.')
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` }
    })
  }

  const iCls = "w-full bg-[#111] border border-gold/10 focus:border-gold text-white font-light text-[14px] px-5 py-3.5 outline-none transition-all duration-300"

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
        <div className="w-full max-w-[440px] bg-[#0a0a0a] border border-gold/20 p-10 relative"
          style={{ animation: 'fadeUp 0.3s ease both' }}>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 font-mono text-[18px] text-white/30 hover:text-white transition-colors"
          >
            ✕
          </button>

          {/* Logo */}
          <div className="font-cormorant text-3xl font-light text-center mb-1">
            CodeaPlus<span className="text-gold">.</span>
          </div>
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-white/40 text-center mb-8">
            {tab === 'login' ? 'Welcome Back' : 'Create Account'}
          </div>

          {/* Tabs */}
          <div className="flex border border-gold/10 mb-7">
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setStatus('idle'); setErrMsg('') }}
                className={`flex-1 font-mono text-[10px] tracking-[.2em] uppercase py-3 transition-all ${tab === t ? 'bg-gold text-[#060606]' : 'text-white/40 hover:text-white'}`}>
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {status === 'verify' ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-4">✉</div>
              <div className="font-cormorant text-xl mb-2">Check your email!</div>
              <p className="text-[13px] text-white/50 font-light">
                We sent a verification link to <span className="text-gold">{email}</span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Google */}
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 border border-gold/15 py-3.5 text-[13px] font-light text-white/70 hover:border-gold/40 hover:text-white transition-all group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gold/10" />
                <span className="font-mono text-[9px] tracking-widest uppercase text-white/30">or</span>
                <div className="flex-1 h-px bg-gold/10" />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Email</label>
                <input className={iCls} type="email" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] tracking-[.2em] uppercase text-white/40">Password</label>
                <input className={iCls} type="password" value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  onKeyDown={e => e.key === 'Enter' && handleEmailAuth()} />
              </div>

              {status === 'error' && (
                <div className="font-mono text-[11px] text-red-400 border border-red-500/20 p-3 bg-red-500/5">
                  {errMsg}
                </div>
              )}

              <button
                onClick={handleEmailAuth}
                disabled={status === 'loading'}
                className="w-full font-mono text-[11px] tracking-[.2em] uppercase text-[#060606] bg-gold py-4 relative overflow-hidden group disabled:opacity-60 mt-1"
              >
                <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">
                  {status === 'loading' ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
                </span>
              </button>

              {tab === 'login' && (
                <button
                  onClick={() => supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })}
                  className="font-mono text-[9px] tracking-[.15em] uppercase text-white/30 hover:text-gold transition-colors text-center"
                >
                  Forgot password?
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}