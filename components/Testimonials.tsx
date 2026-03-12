'use client'
import { useEffect, useRef, useState } from 'react'
import { Testimonial } from '@/types'
import TestimonialModal from './TestimonialModal'

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

  return (
    <>
      <section ref={ref} id="testimonials" className="py-20 md:py-32 px-6 md:px-16 bg-[#060606]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16">
          <div>
            <div className="reveal font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
              Client Stories <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
            </div>
            <h2 className="reveal delay-1 font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05]">
              What They <em className="italic text-gold">Say</em>
            </h2>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="reveal-right flex items-center gap-3 border border-gold/20 px-5 py-3 text-white/50 hover:text-gold hover:border-gold/50 transition-all group relative overflow-hidden flex-shrink-0"
          >
            <span className="absolute inset-0 bg-gold/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="text-gold text-lg relative z-10">★</span>
            <span className="font-mono text-[10px] tracking-[.2em] uppercase relative z-10">Share Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.1)' }}>
          {testimonials.map((t, i) => (
            <div key={t.id}
              className={`reveal delay-${i} bg-[#060606] p-8 md:p-12 hover:bg-[#111] transition-colors duration-300 ${testimonials.length % 3 === 1 && i === testimonials.length - 1 ? 'sm:col-span-2 md:col-span-3' : ''}`}
            >
              <div className="flex gap-1 mb-5 text-gold text-[13px]">{'★'.repeat(t.rating)}</div>
              <div className="font-cormorant text-[28px] text-gold/40 leading-none mb-3">„</div>
              <p className="font-cormorant text-[16px] md:text-[18px] font-light italic leading-[1.65] mb-7">{t.content}</p>
              <div className="flex items-center gap-4 pt-5 border-t border-gold/10">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 font-cormorant text-lg font-semibold"
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
            <div className="col-span-1 sm:col-span-2 md:col-span-3 py-20 text-center text-white/30 font-mono text-[11px] tracking-widest">
              No testimonials yet. Be the first to share your experience!
            </div>
          )}
        </div>

        <div className="reveal text-center mt-10 md:mt-12">
          <p className="text-[14px] text-white/30 font-light mb-4">Worked with us? We'd love to hear from you.</p>
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