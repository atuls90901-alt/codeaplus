'use client'
import { useEffect, useState } from 'react'

export default function ExitPopup() {
  const [show,      setShow]      = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShow(true)
    }, 30000)

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) setShow(true)
    }

    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [dismissed])

  const close = () => { setShow(false); setDismissed(true) }

  if (!show) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[10002] bg-black/70 backdrop-blur-sm" onClick={close} />

      {/* Modal */}
      <div className="fixed inset-0 z-[10003] flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] bg-bg-secondary border border-gold/25 relative overflow-hidden
          shadow-[0_24px_64px_rgba(0,0,0,0.7)]"
          style={{ animation: 'fadeUp 0.35s ease both' }}>

          {/* Gold top line */}
          <div className="h-px w-full"
            style={{ background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />

          {/* Close */}
          <button onClick={close}
            className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 flex items-center justify-center
              rounded-full bg-white/5 hover:bg-white/10 font-mono text-base text-white/30
              hover:text-white transition-all z-10">
            ✕
          </button>

          {/* Content */}
          <div className="p-6 md:p-10 text-center">

            {/* Badge */}
            <div className="inline-block font-mono text-[9px] tracking-[.3em] uppercase text-bg-primary bg-gold px-4 py-1.5 mb-5 md:mb-6">
              Limited Offer
            </div>

            {/* Heading */}
            <h2 className="font-cormorant text-[28px] md:text-[38px] font-light leading-[1.1] mb-3 md:mb-4">
              Wait! Get a <em className="italic text-gold">Free</em><br />Project Consultation
            </h2>

            {/* Sub */}
            <p className="text-[13px] md:text-[14px] text-white/50 font-light leading-[1.7] mb-6 md:mb-8 max-w-[360px] mx-auto">
              Before you go — let's talk about your project for 15 minutes. No commitment, just clarity on what you need.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 items-center">
              <a href="#contact" onClick={close}
                className="relative overflow-hidden group font-mono text-[11px] tracking-[.2em] uppercase
                  text-bg-primary bg-gold px-8 md:px-10 py-3.5 md:py-4 w-full text-center">
                <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">Book Free Consultation →</span>
              </a>
              <button onClick={close}
                className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25 hover:text-white/50 transition-colors">
                No thanks, I'll figure it out myself
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-gold/10">
              {['50+ Projects', '98% Satisfaction', 'Reply in 2hrs'].map(t => (
                <div key={t} className="font-mono text-[9px] tracking-[.1em] uppercase text-gold/60">{t}</div>
              ))}
            </div>
          </div>

          {/* Gold bottom line */}
          <div className="h-px w-full"
            style={{ background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
        </div>
      </div>
    </>
  )
}