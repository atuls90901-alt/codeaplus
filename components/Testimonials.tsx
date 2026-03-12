'use client'
import { useEffect, useRef, useState } from 'react'
import { Testimonial } from '@/types'
import TestimonialModal from '@/components/TestimonialModal';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const ref = useRef<HTMLElement>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.01)`
  }
  const untilt = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = '' }

  return (
    <>
      <section ref={ref} id="testimonials" className="py-32 px-16 bg-[#060606]">

        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="reveal font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
              Client Stories <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
            </div>
            <h2 className="reveal delay-1 font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05]">
              What They <em className="italic text-gold">Say</em>
            </h2>
          </div>

          {/* Share Experience Button */}
          <button
            onClick={() => setShowModal(true)}
            className="reveal-right flex items-center gap-3 border border-gold/20 px-6 py-3.5 text-white/50 hover:text-gold hover:border-gold/50 transition-all group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gold/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="text-gold text-lg relative z-10">★</span>
            <span className="font-mono text-[10px] tracking-[.2em] uppercase relative z-10">Share Your Experience</span>
          </button>
        </div>

        {/* Testimonials Grid */}
       <div className="grid gap-px" style={{ gridTemplateColumns: 'repeat(3, 1fr)', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.1)' }}>
          {testimonials.map((t, i) => (
            <div key={t.id}
              className={`reveal delay-${i} bg-[#060606] p-12 hover:bg-[#111] transition-colors duration-300 ${
    testimonials.length % 3 === 1 && i === testimonials.length - 1 ? 'col-span-3' : 
    testimonials.length % 3 === 2 && i >= testimonials.length - 2 ? 'col-span-1' : ''
  }`}
              onMouseMove={tilt} onMouseLeave={untilt}
            >
              <div className="flex gap-1 mb-6 text-gold text-[13px]">{'★'.repeat(t.rating)}</div>
              <div className="font-cormorant text-[28px] text-gold/40 leading-none mb-4">"</div>
              <p className="font-cormorant text-[18px] font-light italic leading-[1.65] mb-8">{t.content}</p>
              <div className="flex items-center gap-4 pt-6 border-t border-gold/10">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-cormorant text-lg font-semibold"
                  style={{ background: 'linear-gradient(135deg,#7a6028,#C9A84C)', color: '#060606' }}>
                  {t.avatar_letter}
                </div>
                <div>
                  <div className="text-[14px] font-medium">{t.author_name}</div>
                  <div className="font-mono text-[9px] tracking-[.1em] uppercase text-white/50 mt-0.5">{t.author_role}</div>
                </div>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="col-span-3 py-20 text-center text-white/30 font-mono text-[11px] tracking-widest">
              No testimonials yet. Be the first to share your experience!
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center mt-12">
          <p className="text-[14px] text-white/30 font-light mb-4">
            Worked with us? We'd love to hear from you.
          </p>
          <button onClick={() => setShowModal(true)}
            className="font-mono text-[10px] tracking-[.2em] uppercase text-gold hover:text-gold-light transition-colors underline underline-offset-4">
            Write a Review →
          </button>
        </div>
      </section>

      {showModal && <TestimonialModal onClose={() => setShowModal(false)} />}
    </>
  )
}