'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ══════════════════════════════════════
//  CUTE BOT ICON — white + gold
// ══════════════════════════════════════
function CuteBotIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Antenna */}
      <line x1="32" y1="4" x2="32" y2="13" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="4" r="3" fill="#C9A84C"/>

      {/* Head — big round white/gold */}
      <rect x="8" y="14" width="48" height="38" rx="16" fill="white" opacity="0.95"/>
      <rect x="8" y="14" width="48" height="38" rx="16" fill="url(#botGrad)" opacity="0.12"/>
      <rect x="8" y="14" width="48" height="38" rx="16" stroke="#C9A84C" strokeWidth="1.8"/>

      {/* Ears */}
      <rect x="3" y="26" width="6" height="12" rx="3" fill="#C9A84C" opacity="0.7"/>
      <rect x="55" y="26" width="6" height="12" rx="3" fill="#C9A84C" opacity="0.7"/>

      {/* Eyes — big cute */}
      <circle cx="22" cy="32" r="8" fill="#C9A84C"/>
      <circle cx="42" cy="32" r="8" fill="#C9A84C"/>
      {/* Eye white */}
      <circle cx="22" cy="32" r="5" fill="white"/>
      <circle cx="42" cy="32" r="5" fill="white"/>
      {/* Pupils */}
      <circle cx="23" cy="32" r="3" fill="#2d1a00"/>
      <circle cx="43" cy="32" r="3" fill="#2d1a00"/>
      {/* Eye shine */}
      <circle cx="24.5" cy="30.5" r="1.3" fill="white"/>
      <circle cx="44.5" cy="30.5" r="1.3" fill="white"/>

      {/* Blush cheeks */}
      <ellipse cx="14" cy="42" rx="5" ry="3" fill="#ffb5c8" opacity="0.5"/>
      <ellipse cx="50" cy="42" rx="5" ry="3" fill="#ffb5c8" opacity="0.5"/>

      {/* Smile */}
      <path d="M22 44 Q32 51 42 44" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" fill="none"/>

      {/* Gradient def */}
      <defs>
        <linearGradient id="botGrad" x1="8" y1="14" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9A84C"/>
          <stop offset="1" stopColor="#fff"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

// Small version for messages
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
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hey! 👋 Welcome to CodeaPlus. I'm here to help you start your project.\n\nWhat kind of website or app are you looking to build?`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Something went wrong.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const winStyle: React.CSSProperties = isMobile
    ? { position: 'fixed', bottom: 0, left: 0, right: 0, height: '75vh', zIndex: 9000, borderRadius: '20px 20px 0 0', border: '1px solid rgba(201,168,76,0.25)', borderBottom: 'none' }
    : { position: 'fixed', bottom: 108, right: 24, width: 360, height: 510, zIndex: 9000, borderRadius: 16, border: '1px solid rgba(201,168,76,0.25)' }

  return (
    <>
      {/* ── TOOLTIP ── */}
      {!open && showTooltip && (
        <div style={{
          position: 'fixed',
          bottom: isMobile ? 88 : 104,
          right: isMobile ? 16 : 30,
          zIndex: 9001,
          background: 'rgba(255,255,255,0.97)',
          border: '1.5px solid rgba(201,168,76,0.4)',
          borderRadius: 12,
          padding: '8px 14px',
          fontFamily: 'monospace',
          fontSize: 11,
          color: '#5a3e00',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          animation: 'cbFadeUp 0.4s ease both',
          pointerEvents: 'none',
          boxShadow: '0 4px 20px rgba(201,168,76,0.15)',
          fontWeight: 600,
        }}>
          ✨ Hi! Chat with me~
          <span style={{
            position: 'absolute', bottom: -7, right: 22,
            width: 0, height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '7px solid rgba(201,168,76,0.4)',
          }} />
        </div>
      )}

      {/* ── TOGGLE BUTTON ── */}
      <button
        onClick={() => { setOpen(o => !o); setShowTooltip(false) }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: isMobile ? 18 : 24,
          right: isMobile ? 16 : 24,
          zIndex: 9002,
          width: isMobile ? 62 : 68,
          height: isMobile ? 62 : 68,
          borderRadius: '50%',
          border: 'none',
          background: open
            ? 'linear-gradient(145deg, #1a1200, #0d0d0d)'
            : 'linear-gradient(145deg, #ffffff, #fff8e8)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: open
            ? '0 6px 24px rgba(0,0,0,0.5), 0 0 0 2px rgba(201,168,76,0.4)'
            : '0 8px 32px rgba(201,168,76,0.35), 0 0 0 3px rgba(201,168,76,0.2)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: open ? 'scale(0.92)' : 'scale(1)',
          padding: 0,
          outline: 'none',
        }}
        onMouseEnter={e => {
          if (!open) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1) rotate(-5deg)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = open ? 'scale(0.92)' : 'scale(1)'
        }}
      >
        {/* Pulse rings — only when closed */}
        {!open && <>
          <span style={{
            position: 'absolute', inset: -5,
            borderRadius: '50%',
            border: '2px solid rgba(201,168,76,0.3)',
            animation: 'cbRipple1 2s ease-out infinite',
            pointerEvents: 'none',
          }} />
          <span style={{
            position: 'absolute', inset: -5,
            borderRadius: '50%',
            border: '2px solid rgba(201,168,76,0.15)',
            animation: 'cbRipple1 2s ease-out 0.7s infinite',
            pointerEvents: 'none',
          }} />
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
        <div style={{
          ...winStyle,
          display: 'flex',
          flexDirection: 'column',
          background: '#fafaf8',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(201,168,76,0.15)',
          animation: isMobile ? 'cbSlideUpMobile 0.3s cubic-bezier(0.34,1.2,0.64,1) both' : 'cbSlideUp 0.28s cubic-bezier(0.34,1.2,0.64,1) both',
        }}>

          {/* Gold top bar */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, #C9A84C, #ffe08a, #C9A84C)', flexShrink: 0 }} />

          {/* Mobile drag handle */}
          {isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 2px' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(201,168,76,0.3)' }} />
            </div>
          )}

          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: isMobile ? '10px 16px 12px' : '14px 18px',
            background: 'white',
            borderBottom: '1px solid rgba(201,168,76,0.15)',
            flexShrink: 0,
          }}>
            {/* Bot avatar with glow */}
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: 'linear-gradient(145deg, #fffdf5, #fff8e0)',
              border: '2px solid rgba(201,168,76,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(201,168,76,0.2)',
            }}>
              <CuteBotIcon size={28} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 16, color: '#1a1200', fontWeight: 600 }}>
                CodeaPlus Bot
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px rgba(74,222,128,0.6)', animation: 'cbBlink 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#a07830', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Online & Ready</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ marginLeft: 'auto', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '50%', color: '#a07830', cursor: 'pointer', fontSize: 16, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.1)')}
            >×</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: isMobile ? '14px 12px 8px' : '16px 14px 8px',
            display: 'flex', flexDirection: 'column', gap: 14,
            background: '#f8f6f0',
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                gap: 8,
                alignItems: 'flex-end',
              }}>
                {m.role === 'assistant' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(145deg, #fffdf5, #fff8e0)',
                    border: '1.5px solid rgba(201,168,76,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(201,168,76,0.15)',
                  }}>
                    <TinyBot />
                  </div>
                )}
                <div style={{
                  maxWidth: '76%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg, #C9A84C, #b8932e)'
                    : 'white',
                  border: m.role === 'user' ? 'none' : '1px solid rgba(201,168,76,0.2)',
                  color: m.role === 'user' ? 'white' : '#2d1a00',
                  fontSize: isMobile ? 14 : 13.5,
                  lineHeight: 1.65,
                  fontFamily: 'var(--font-outfit, sans-serif)',
                  whiteSpace: 'pre-wrap',
                  fontWeight: m.role === 'user' ? 500 : 400,
                  boxShadow: m.role === 'user'
                    ? '0 4px 16px rgba(201,168,76,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(145deg, #fffdf5, #fff8e0)',
                  border: '1.5px solid rgba(201,168,76,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <TinyBot />
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'white',
                  border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex', gap: 5, alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#C9A84C',
                      animation: `cbDot 1.2s ease-in-out ${i*0.2}s infinite`,
                      display: 'inline-block',
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: isMobile ? '10px 12px 22px' : '12px 14px',
            borderTop: '1px solid rgba(201,168,76,0.15)',
            background: 'white',
            display: 'flex', gap: 8, alignItems: 'center',
            flexShrink: 0,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Say something cute... 🌟"
              disabled={loading}
              style={{
                flex: 1,
                background: '#f8f6f0',
                border: '1.5px solid rgba(201,168,76,0.2)',
                borderRadius: 24,
                padding: isMobile ? '11px 16px' : '9px 14px',
                color: '#2d1a00',
                fontSize: isMobile ? 14 : 13,
                fontFamily: 'var(--font-outfit, sans-serif)',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                width: isMobile ? 44 : 40,
                height: isMobile ? 44 : 40,
                background: input.trim() && !loading
                  ? 'linear-gradient(135deg, #C9A84C, #b8932e)'
                  : 'rgba(201,168,76,0.15)',
                border: 'none',
                borderRadius: '50%',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
                boxShadow: input.trim() && !loading ? '0 4px 12px rgba(201,168,76,0.4)' : 'none',
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
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 8999,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(3px)',
          animation: 'cbFadeUp 0.2s ease both',
        }} />
      )}

      <style>{`
        @keyframes cbFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cbSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cbSlideUpMobile {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes cbRipple1 {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes cbDot {
          0%, 80%, 100% { transform: scale(0.65); opacity: 0.35; }
          40% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes cbBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  )
}