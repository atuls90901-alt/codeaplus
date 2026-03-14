'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function CuteBotIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="32" y1="4" x2="32" y2="13" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="4" r="3" fill="#C9A84C"/>
      <rect x="8" y="14" width="48" height="38" rx="16" fill="white" opacity="0.95"/>
      <rect x="8" y="14" width="48" height="38" rx="16" fill="url(#botGrad)" opacity="0.12"/>
      <rect x="8" y="14" width="48" height="38" rx="16" stroke="#C9A84C" strokeWidth="1.8"/>
      <rect x="3" y="26" width="6" height="12" rx="3" fill="#C9A84C" opacity="0.7"/>
      <rect x="55" y="26" width="6" height="12" rx="3" fill="#C9A84C" opacity="0.7"/>
      <circle cx="22" cy="32" r="8" fill="#C9A84C"/>
      <circle cx="42" cy="32" r="8" fill="#C9A84C"/>
      <circle cx="22" cy="32" r="5" fill="white"/>
      <circle cx="42" cy="32" r="5" fill="white"/>
      <circle cx="23" cy="32" r="3" fill="#2d1a00"/>
      <circle cx="43" cy="32" r="3" fill="#2d1a00"/>
      <circle cx="24.5" cy="30.5" r="1.3" fill="white"/>
      <circle cx="44.5" cy="30.5" r="1.3" fill="white"/>
      <ellipse cx="14" cy="42" rx="5" ry="3" fill="#ffb5c8" opacity="0.5"/>
      <ellipse cx="50" cy="42" rx="5" ry="3" fill="#ffb5c8" opacity="0.5"/>
      <path d="M22 44 Q32 51 42 44" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <defs>
        <linearGradient id="botGrad" x1="8" y1="14" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9A84C"/>
          <stop offset="1" stopColor="#fff"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function TinyBot() {
  return (
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="14" width="48" height="38" rx="16" fill="white" opacity="0.95"/>
      <rect x="8" y="14" width="48" height="38" rx="16" stroke="#C9A84C" strokeWidth="2"/>
      <circle cx="22" cy="32" r="8" fill="#C9A84C"/>
      <circle cx="42" cy="32" r="8" fill="#C9A84C"/>
      <circle cx="22" cy="32" r="5" fill="white"/>
      <circle cx="42" cy="32" r="5" fill="white"/>
      <circle cx="23" cy="32" r="3" fill="#2d1a00"/>
      <circle cx="43" cy="32" r="3" fill="#2d1a00"/>
      <circle cx="24.5" cy="30.5" r="1.3" fill="white"/>
      <circle cx="44.5" cy="30.5" r="1.3" fill="white"/>
      <path d="M22 44 Q32 51 42 44" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

export default function Chatbot() {
  const [open, setOpen]               = useState(false)
  const [messages, setMessages]       = useState<Message[]>([{
    role: 'assistant',
    content: `Hey! 👋 Welcome to CodeaPlus. I'm here to help you start your project.\n\nWhat kind of website or app are you looking to build?`
  }])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [isMobile, setIsMobile]       = useState(false)
  const bottomRef                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const res  = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMessages }) })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Something went wrong.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── TOOLTIP ── */}
      {!open && showTooltip && (
        <div className={`fixed z-[9001] pointer-events-none animate-fade-up
          ${isMobile ? 'bottom-[88px] right-4' : 'bottom-[104px] right-[30px]'}`}>
          <div className="bg-white/97 border-[1.5px] border-gold/40 rounded-xl px-3.5 py-2 font-mono text-[11px] font-semibold text-[#5a3e00] tracking-[.04em] whitespace-nowrap shadow-[0_4px_20px_rgba(201,168,76,0.15)]">
            ✨ Hi! Chat with me~
            {/* Arrow */}
            <span className="absolute -bottom-[7px] right-[22px] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-gold/40" />
          </div>
        </div>
      )}

      {/* ── TOGGLE BUTTON ── */}
      <button
        onClick={() => { setOpen(o => !o); setShowTooltip(false) }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`fixed z-[9002] rounded-full border-none cursor-pointer flex items-center justify-center outline-none transition-all duration-300
          ${isMobile ? 'bottom-[18px] right-4 w-[62px] h-[62px]' : 'bottom-6 right-6 w-[68px] h-[68px]'}
          ${open
            ? 'scale-[0.92] shadow-[0_6px_24px_rgba(0,0,0,0.5),0_0_0_2px_rgba(201,168,76,0.4)]'
            : 'scale-100 shadow-[0_8px_32px_rgba(201,168,76,0.35),0_0_0_3px_rgba(201,168,76,0.2)] hover:scale-110 hover:-rotate-6'
          }`}
        style={{
          background: open
            ? 'linear-gradient(145deg,#1a1200,#0d0d0d)'
            : 'linear-gradient(145deg,#ffffff,#fff8e8)',
        }}
      >
        {/* Pulse rings */}
        {!open && <>
          <span className="absolute -inset-1.5 rounded-full border-2 border-gold/30 animate-cb-ripple pointer-events-none" />
          <span className="absolute -inset-1.5 rounded-full border-2 border-gold/15 animate-cb-ripple [animation-delay:0.7s] pointer-events-none" />
        </>}

        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <line x1="5" y1="5" x2="17" y2="17" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="17" y1="5" x2="5" y2="17" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <CuteBotIcon size={isMobile ? 38 : 44} />
        )}
      </button>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div
          className={`fixed z-[9000] flex flex-col overflow-hidden bg-[#fafaf8]
            shadow-[0_20px_60px_rgba(0,0,0,0.2),0_0_0_1px_rgba(201,168,76,0.15)]
            border border-gold/25
            ${isMobile
              ? 'bottom-0 left-0 right-0 h-[75vh] rounded-t-[20px] border-b-0 animate-[cbSlideUpMobile_0.3s_cubic-bezier(0.34,1.2,0.64,1)_both]'
              : 'bottom-[108px] right-6 w-[360px] h-[510px] rounded-2xl animate-[cbSlideUp_0.28s_cubic-bezier(0.34,1.2,0.64,1)_both]'
            }`}
        >
          {/* Gold top bar */}
          <div className="h-[3px] w-full flex-shrink-0"
            style={{ background: 'linear-gradient(90deg,#C9A84C,#ffe08a,#C9A84C)' }} />

          {/* Mobile drag handle */}
          {isMobile && (
            <div className="flex justify-center pt-2.5 pb-0.5 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-gold/30" />
            </div>
          )}

          {/* Header */}
          <div className={`flex items-center gap-3 bg-white border-b border-gold/15 flex-shrink-0
            ${isMobile ? 'px-4 pt-2.5 pb-3' : 'px-[18px] py-3.5'}`}>
            {/* Avatar */}
            <div className="w-[42px] h-[42px] rounded-full flex-shrink-0 flex items-center justify-center
              border-2 border-gold/40 shadow-[0_0_12px_rgba(201,168,76,0.2)]"
              style={{ background: 'linear-gradient(145deg,#fffdf5,#fff8e0)' }}>
              <CuteBotIcon size={28} />
            </div>
            <div>
              <div className="font-cormorant text-[16px] text-[#1a1200] font-semibold">
                CodeaPlus Bot
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-[7px] h-[7px] rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)] animate-blink-dot" />
                <span className="font-mono text-[9px] text-[#a07830] tracking-[.1em] uppercase">Online & Ready</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto w-[30px] h-[30px] rounded-full flex items-center justify-center
                bg-gold/10 hover:bg-gold/20 border border-gold/20 text-[#a07830] text-[16px] cursor-pointer transition-colors"
            >×</button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto flex flex-col gap-3.5 bg-[#f8f6f0]
            ${isMobile ? 'px-3 pt-3.5 pb-2' : 'px-3.5 pt-4 pb-2'}`}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 items-end ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                    border-[1.5px] border-gold/35 shadow-[0_2px_8px_rgba(201,168,76,0.15)]"
                    style={{ background: 'linear-gradient(145deg,#fffdf5,#fff8e0)' }}>
                    <TinyBot />
                  </div>
                )}
                <div
                  className={`max-w-[76%] px-3.5 py-2.5 font-outfit whitespace-pre-wrap leading-[1.65]
                    ${isMobile ? 'text-[14px]' : 'text-[13.5px]'}
                    ${m.role === 'user'
                      ? 'text-white font-medium rounded-[16px_16px_4px_16px] shadow-[0_4px_16px_rgba(201,168,76,0.3)]'
                      : 'text-[#2d1a00] font-normal rounded-[16px_16px_16px_4px] bg-white border border-gold/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                    }`}
                  style={m.role === 'user' ? { background: 'linear-gradient(135deg,#C9A84C,#b8932e)' } : {}}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-2 items-end">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                  border-[1.5px] border-gold/35"
                  style={{ background: 'linear-gradient(145deg,#fffdf5,#fff8e0)' }}>
                  <TinyBot />
                </div>
                <div className="px-4 py-3 rounded-[16px_16px_16px_4px] bg-white border border-gold/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-[7px] h-[7px] rounded-full bg-gold inline-block animate-cb-dot"
                      style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={`flex gap-2 items-center bg-white border-t border-gold/15 flex-shrink-0
            ${isMobile ? 'px-3 pt-2.5 pb-[22px]' : 'px-3.5 py-3'}`}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Say something cute... 🌟"
              disabled={loading}
              className={`flex-1 bg-[#f8f6f0] border-[1.5px] border-gold/20 rounded-full text-[#2d1a00] font-outfit outline-none transition-colors
                focus:border-gold/60 placeholder:text-[#2d1a00]/30 disabled:opacity-60
                ${isMobile ? 'px-4 py-[11px] text-[14px]' : 'px-3.5 py-[9px] text-[13px]'}`}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className={`rounded-full flex items-center justify-center flex-shrink-0 border-none cursor-pointer transition-all disabled:cursor-not-allowed
                ${isMobile ? 'w-11 h-11' : 'w-10 h-10'}
                ${input.trim() && !loading
                  ? 'shadow-[0_4px_12px_rgba(201,168,76,0.4)]'
                  : 'opacity-60'}`}
              style={{
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg,#C9A84C,#b8932e)'
                  : 'rgba(201,168,76,0.15)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h10M8 3l5 5-5 5"
                  stroke={input.trim() && !loading ? 'white' : '#C9A84C'}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile backdrop */}
      {open && isMobile && (
        <div onClick={() => setOpen(false)}
          className="fixed inset-0 z-[8999] bg-black/40 backdrop-blur-sm animate-fade-up" />
      )}
    </>
  )
}