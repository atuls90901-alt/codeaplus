'use client'
import { useState, useEffect, useRef } from 'react'
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

const startY = useRef<number | null>(null)

/* AUTO CLOSE IF USER ALREADY LOGGED IN */
useEffect(() => {
supabase.auth.getSession().then(({ data }) => {
if (data.session) {
onSuccess()
onClose()
}
})
}, [])

const handleTouchStart = (e: React.TouchEvent) => {
startY.current = e.touches[0].clientY
}

const handleTouchMove = (e: React.TouchEvent) => {
if (!startY.current) return
const diff = e.touches[0].clientY - startY.current
if (diff > 120) onClose()
}

const handleEmailAuth = async () => {


if (!email || !password) {
  setStatus('error')
  setErrMsg('Please fill all fields.')
  return
}

setStatus('loading')

try {

  if (tab === 'login') {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    onSuccess()
    onClose()

  } else {

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

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
  options: {
    redirectTo: `${window.location.origin}/`,
    queryParams: { prompt: 'select_account' }
  }
})


}

const inputCls =
"w-full bg-[#111] border border-gold/10 focus:border-gold text-white text-[15px] px-4 py-3.5 outline-none transition rounded"

return (
<>
{/* BACKDROP */} <div
     className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm"
     onClick={onClose}
   />

```
  {/* MODAL WRAPPER */}
  <div className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center">

    {/* MODAL */}
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="w-full sm:max-w-[440px] max-h-[92vh] overflow-y-auto bg-[#0a0a0a] border border-gold/20 p-6 sm:p-8 md:p-10 relative rounded-t-2xl sm:rounded-xl shadow-xl"
      style={{ animation: 'modalUp .35s ease both' }}
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/40 hover:text-white text-lg"
      >
        ✕
      </button>

      {/* DRAG HANDLE */}
      <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5 sm:hidden"/>

      {/* TITLE */}
      <div className="text-center mb-6">

        <div className="font-cormorant text-2xl sm:text-3xl font-light">
          CodeaPlus<span className="text-gold">.</span>
        </div>

        <div className="text-[11px] tracking-[.3em] uppercase text-white/40 mt-1">
          {tab === 'login' ? 'Welcome Back' : 'Create Account'}
        </div>

      </div>

      {/* TABS */}
      <div className="flex border border-gold/10 mb-6">

        {(['login','signup'] as const).map(t => (

          <button
            key={t}
            onClick={() => {
              setTab(t)
              setStatus('idle')
              setErrMsg('')
            }}
            className={`flex-1 py-3 text-[11px] tracking-[.2em] uppercase transition ${
              tab === t
                ? 'bg-gold text-black'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {t === 'login' ? 'Sign In' : 'Sign Up'}
          </button>

        ))}

      </div>

      {status === 'verify' ? (

        <div className="text-center py-6">

          <div className="text-3xl mb-3">✉</div>

          <p className="text-white/60 text-sm">
            Verification email sent to
            <span className="text-gold"> {email}</span>
          </p>

        </div>

      ) : (

        <div className="flex flex-col gap-4">

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gold/15 py-3.5 text-[14px] text-white/80 hover:border-gold/40 hover:text-white transition rounded"
          >

            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>

            Continue with Codeaplus

          </button>

          <p className="text-center text-[11px] text-white/30">
            Secure login powered by Google
          </p>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gold/10"/>
            <span className="text-[9px] text-white/30 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gold/10"/>
          </div>

          {/* EMAIL */}
          <input
            className={inputCls}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            className={inputCls}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEmailAuth()}
          />

          {status === 'error' && (
            <div className="text-red-400 text-sm border border-red-500/20 p-3 bg-red-500/5">
              {errMsg}
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={handleEmailAuth}
            disabled={status === 'loading'}
            className="w-full bg-gold text-black py-3.5 text-[13px] tracking-widest uppercase disabled:opacity-60 rounded"
          >

            {status === 'loading'
              ? 'Please wait...'
              : tab === 'login'
              ? 'Sign In'
              : 'Create Account'}

          </button>

        </div>

      )}

    </div>
  </div>
</>

)
}
