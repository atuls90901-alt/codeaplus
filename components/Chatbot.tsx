'use client'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface FormData {
  name: string
  email: string
  service: string
  budget: string
}

export default function Chatbot() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [formFilled, setFormFilled] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `Hey! 👋 Welcome to CodeaPlus. I'm here to help you start your project.\n\nWhat kind of website or app are you looking to build?`
      }])
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setShowPulse(false)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Lock scroll on mobile when open
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 640
    if (isMobile) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const fillContactForm = (formData: FormData) => {
    const setNativeValue = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string) => {
      const nativeInputValueSetter =
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set ||
        Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value')?.set
      nativeInputValueSetter?.call(el, value)
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
    }
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        const nameEl = document.querySelector('input[placeholder="John Doe"]') as HTMLInputElement
        if (nameEl) setNativeValue(nameEl, formData.name)
        const emailEl = document.querySelector('input[placeholder="john@company.com"]') as HTMLInputElement
        if (emailEl) setNativeValue(emailEl, formData.email)
        const serviceEl = document.querySelector('select') as HTMLSelectElement
        if (serviceEl) setNativeValue(serviceEl, formData.service)
        const budgetEls = document.querySelectorAll('select')
        if (budgetEls[1]) setNativeValue(budgetEls[1] as HTMLSelectElement, formData.budget)
        setFormFilled(true)
      }, 800)
    }, 300)
  }

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }])
      if (data.formData) fillContactForm(data.formData)
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes pingOnce {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes typingDot {
          0%,60%,100% { transform: translateY(0); opacity:0.4; }
          30% { transform: translateY(-4px); opacity:1; }
        }
      `}</style>

      {/* ── Toggle Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9001] w-12 h-12 md:w-14 md:h-14 items-center justify-center transition-all duration-300 hover:scale-110 ${open ? 'hidden md:flex' : 'flex'}`}
        style={{
          background: open ? '#1a1a1a' : 'linear-gradient(135deg,#7a6028,#C9A84C)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '50%',
          boxShadow: '0 8px 32px rgba(201,168,76,0.25)',
        }}
      >
        <span style={{ fontSize: 20 }}>💬</span>
        {showPulse && !open && (
          <span className="absolute inset-0 rounded-full" style={{
            border: '2px solid rgba(201,168,76,0.5)',
            animation: 'pingOnce 2s ease-out 3',
          }} />
        )}
      </button>

      {/* ── Mobile: fullscreen overlay ── */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-[9000] flex flex-col" style={{ background: '#0a0a0a' }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
            background: 'rgba(201,168,76,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg,#7a6028,#C9A84C)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
              }}>✦</div>
              <div>
                <div style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 14, color: 'rgba(240,236,228,0.9)', fontWeight: 500 }}>
                  CodeaPlus Assistant
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.7)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ color: 'rgba(240,236,228,0.5)', fontSize: 20, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ChatMessages messages={messages} loading={loading} formFilled={formFilled} bottomRef={bottomRef} />
          </div>

          {/* Input */}
          <ChatInput input={input} setInput={setInput} send={send} loading={loading} inputRef={inputRef} />
        </div>
      )}

      {/* ── Desktop: floating window ── */}
      <div
        className="hidden sm:flex fixed flex-col z-[9000]"
        style={{
          bottom: 96,
          right: 32,
          width: 360,
          height: 480,
          background: '#0a0a0a',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          transition: 'all 0.25s ease',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          background: 'rgba(201,168,76,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg,#7a6028,#C9A84C)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0,
          }}>✦</div>
          <div>
            <div style={{ fontFamily: 'var(--font-cormorant,serif)', fontSize: 15, color: 'rgba(240,236,228,0.9)', fontWeight: 500 }}>
              CodeaPlus Assistant
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.15em', color: 'rgba(201,168,76,0.7)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ChatMessages messages={messages} loading={loading} formFilled={formFilled} bottomRef={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput input={input} setInput={setInput} send={send} loading={loading} inputRef={inputRef} />
      </div>
    </>
  )
}

// ── Shared subcomponents ──

function ChatMessages({ messages, loading, formFilled, bottomRef }: {
  messages: Message[]
  loading: boolean
  formFilled: boolean
  bottomRef: React.RefObject<HTMLDivElement>
}) {
  return (
    <>
      {messages.map((m, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
          <div style={{
            maxWidth: '82%',
            padding: '10px 14px',
            borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            background: m.role === 'user'
              ? 'linear-gradient(135deg,rgba(201,168,76,0.8),rgba(201,168,76,0.6))'
              : 'rgba(255,255,255,0.05)',
            border: m.role === 'assistant' ? '1px solid rgba(201,168,76,0.1)' : 'none',
            color: m.role === 'user' ? '#060606' : 'rgba(240,236,228,0.85)',
            fontSize: 13,
            fontWeight: m.role === 'user' ? 500 : 300,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}>
            {m.content}
          </div>
        </div>
      ))}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ padding: '10px 16px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.1)', display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(201,168,76,0.6)', animation: 'typingDot 1.2s ease infinite', animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      )}

      {formFilled && (
        <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', fontSize: 12, color: 'rgba(34,197,94,0.9)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          ✓ Contact form filled! Please review and submit.
        </div>
      )}

      <div ref={bottomRef} />
    </>
  )
}

function ChatInput({ input, setInput, send, loading, inputRef }: {
  input: string
  setInput: (v: string) => void
  send: () => void
  loading: boolean
  inputRef: React.RefObject<HTMLInputElement>
}) {
  return (
    <div style={{ padding: '12px', borderTop: '1px solid rgba(201,168,76,0.1)', display: 'flex', gap: 8, flexShrink: 0, background: 'rgba(0,0,0,0.3)' }}>
      <input
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
        placeholder="Type your message..."
        style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 10, padding: '10px 14px', color: 'rgba(240,236,228,0.9)', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
      />
      <button
        onClick={send}
        disabled={loading || !input.trim()}
        style={{ width: 40, height: 40, borderRadius: 10, background: input.trim() ? 'linear-gradient(135deg,#7a6028,#C9A84C)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: input.trim() ? '#060606' : 'rgba(201,168,76,0.3)', fontSize: 16, cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
      >↑</button>
    </div>
  )
}