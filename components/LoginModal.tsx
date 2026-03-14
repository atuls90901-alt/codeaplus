'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface LoginModalProps {
  onClose: () => void
  onSuccess: () => void
}

const inputCls = "w-full bg-surface border border-gold/10 focus:border-gold/50 text-white text-[15px] px-4 py-3.5 outline-none transition-all duration-200 rounded placeholder:text-white/25"

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [tab, setTab]       = useState<'login' | 'signup'>('login')
  const [email, setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'verify'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const startY = useRef<number | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) { onSuccess(); onClose() }
    })
  }, [])

  // Swipe down to close on mobile
  const onTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY }
  const onTouchMove  = (e: React.TouchEvent) => {
    if (!startY.current) return
    if (e.touches[0].clientY - startY.current > 120) onClose()
  }

  const handleEmailAuth = async () => {
    if (!email || !password) { setStatus('error'); setErrMsg('Please fill all fields.'); return }
    setStatus('loading')
    try {
      if (tab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onSuccess(); onClose()
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setStatus('verify')
      }
    } catch (e: any) {
      setStatus('error'); setErrMsg(e.message || 'Something went wrong.')
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/`, queryParams: { prompt: 'select_account' } }
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center p-0 sm:p-4">

        {/* Modal box */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          className="w-full sm:max-w-[440px] max-h-[92vh] overflow-y-auto
            bg-bg-secondary border border-gold/20 relative
            rounded-t-2xl sm:rounded-xl
            p-6 sm:p-8 md:p-10
            shadow-[0_24px_64px_rgba(0,0,0,0.7)]"
          style={{ animation: 'modalUp .35s ease both' }}
        >
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl sm:rounded-t-xl"
            style={{ background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

          {/* Close */}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
              rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white
              text-base transition-all">
            ✕
          </button>

          {/* Drag handle — mobile only */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5 sm:hidden" />

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="font-cormorant text-2xl sm:text-3xl font-light">
              CodeaPlus<span className="text-gold">.</span>
            </div>
            <div className="font-mono text-[10px] tracking-[.3em] uppercase text-white/40 mt-1.5">
              {tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border border-gold/10 mb-6 overflow-hidden rounded-sm">
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setStatus('idle'); setErrMsg('') }}
                className={`flex-1 py-3 font-mono text-[11px] tracking-[.2em] uppercase transition-all duration-200
                  ${tab === t ? 'bg-gold text-bg-primary' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Verify email state */}
          {status === 'verify' ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✉</div>
              <p className="text-white/60 text-sm leading-relaxed">
                Verification email sent to{' '}
                <span className="text-gold">{email}</span>
              </p>
              <p className="text-white/30 text-[12px] mt-2">Check your inbox and click the link.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">

              {/* Google */}
              <button onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3
                  border border-gold/15 hover:border-gold/40
                  py-3.5 text-[14px] text-white/80 hover:text-white
                  transition-all duration-200 rounded bg-white/[0.02] hover:bg-white/[0.05]">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <p className="text-center font-mono text-[10px] text-white/25 tracking-[.1em]">
                Secure login powered by Google
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gold/10" />
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-gold/10" />
              </div>

              {/* Email */}
              <input className={inputCls} type="email" placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)} />

              {/* Password */}
              <input className={inputCls} type="password" placeholder="Password"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEmailAuth()} />

              {/* Error */}
              {status === 'error' && (
                <div className="font-mono text-[11px] text-red-400 border border-red-500/20 bg-red-500/5 px-3.5 py-3 rounded-sm">
                  {errMsg}
                </div>
              )}

              {/* Submit */}
              <button onClick={handleEmailAuth} disabled={status === 'loading'}
                className="relative overflow-hidden group w-full bg-gold text-bg-primary
                  py-3.5 font-mono text-[12px] tracking-[.2em] uppercase
                  disabled:opacity-60 disabled:cursor-not-allowed
                  rounded transition-opacity hover:opacity-90">
                <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">
                  {status === 'loading'
                    ? 'Please wait...'
                    : tab === 'login' ? 'Sign In →' : 'Create Account →'}
                </span>
              </button>

              {/* Switch tab hint */}
              <p className="text-center font-mono text-[10px] text-white/25 tracking-[.05em]">
                {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setStatus('idle'); setErrMsg('') }}
                  className="text-gold hover:underline transition-all cursor-pointer">
                  {tab === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>

            </div>
          )}
        </div>
      </div>
    </>
  )
}