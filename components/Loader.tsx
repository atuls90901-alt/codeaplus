'use client'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let current = 0
    const iv = setInterval(() => {
      current = Math.min(current + Math.random() * 3.5, 100)
      setPct(Math.floor(current))
      if (current >= 100) {
        clearInterval(iv)
        setTimeout(() => setGone(true), 400)
      }
    }, 38)
    return () => clearInterval(iv)
  }, [])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{
        background: '#060606',
        transition: 'opacity 0.8s ease',
        opacity: pct >= 100 ? 0 : 1,
      }}
    >
      <div
        className="font-cormorant text-5xl font-light tracking-widest"
        style={{ animation: 'fadeUp 0.6s ease 0.2s both' }}
      >
        CodeaPlus<span className="text-gold">.</span>
      </div>
      <div className="w-60 h-px bg-white/5 mt-9 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg,#7a6028,#C9A84C,#E8C96A)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>
      <div className="font-mono text-[11px] tracking-widest text-gold mt-4">
        {pct}%
      </div>
    </div>
  )
}