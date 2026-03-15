'use client'
import { useEffect, useRef, useState } from 'react'
import { Testimonial } from '@/types'
import TestimonialModal from './TestimonialModal'

/* Safe delays — globals.css has delay-1 … delay-5 only */
const DELAYS = ['delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5'] as const

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const ref                     = useRef<HTMLElement>(null)
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
      <section
        ref={ref}
        id="testimonials"
        className="bg-bg-primary py-20 md:py-32 px-4 sm:px-8 md:px-16"
      >

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end
          gap-5 mb-10 md:mb-16">
          <div>
            <div className="reveal font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3
              flex items-center gap-3">
              Client Stories
              <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
            </div>
            <h2 className="reveal delay-1 font-cormorant font-light leading-[1.05]
              text-[clamp(36px,5vw,68px)]">
              What Founders{' '}
              <em className="italic text-gold">Actually Say</em>
            </h2>
          </div>

          {/* Share review button */}
          <button
            onClick={() => setShowModal(true)}
            className="reveal-right flex-shrink-0 flex items-center gap-3
              border border-gold/20 hover:border-gold/50
              px-5 py-3 text-white/50 hover:text-gold
              transition-all duration-300 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gold/5 scale-x-0 origin-left
              group-hover:scale-x-100 transition-transform duration-300" />
            <span className="text-gold text-lg relative z-10">★</span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase relative z-10">
              Share Review
            </span>
          </button>
        </div>

        {/* ── Testimonials grid ──
            Mobile:  1 col, gap-4, individual card borders
            Desktop: 3 col, gap-0, wrapper border + border-r between cards
        ── */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-4 md:gap-0 md:border md:border-gold/[0.1]">
            {testimonials.map((t, i) => {
              const isLastOdd =
                testimonials.length % 3 === 1 && i === testimonials.length - 1
              const showRightBorder = (i + 1) % 3 !== 0 && i !== testimonials.length - 1

              return (
                <div
                  key={t.id}
                  className={[
                    'reveal', DELAYS[i % 5],
                    'bg-bg-primary hover:bg-surface transition-colors duration-300',
                    'p-7 sm:p-8 md:p-10',
                    // Mobile: individual card border
                    'border border-gold/[0.1] md:border-0',
                    // Desktop: right border between cards
                    showRightBorder ? 'md:border-r md:border-r-gold/[0.1]' : '',
                    // Desktop: bottom border for first rows when there are multiple rows
                    i < testimonials.length - 3 ? 'md:border-b md:border-b-gold/[0.1]' : '',
                    // Last card spans full if lonely
                    isLastOdd ? 'sm:col-span-2 md:col-span-3' : '',
                  ].filter(Boolean).join(' ')}
                >

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5 text-gold text-[13px]">
                    {'★'.repeat(t.rating)}
                  </div>

                  {/* Opening quote */}
                  <div className="font-cormorant text-[28px] text-gold/40 leading-none mb-2">
                    "
                  </div>

                  {/* Review content */}
                  <p className="font-cormorant text-[16px] md:text-[18px] font-light italic
                    leading-[1.65] mb-7 text-white/85">
                    {t.content}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-3 md:gap-4 pt-5 border-t border-gold/10">

                    {/* Avatar — pure Tailwind gradient, no inline style */}
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex-shrink-0
                      flex items-center justify-center
                      bg-gradient-to-br from-gold-dim to-gold
                      font-cormorant text-lg font-semibold text-bg-primary">
                      {t.avatar_letter}
                    </div>

                    <div>
                      <div className="text-[14px] font-medium text-white/90">
                        {t.author_name}
                      </div>
                      <div className="font-mono text-[9px] tracking-[0.1em] uppercase
                        text-white/45 mt-0.5">
                        {t.author_role}
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="border border-gold/[0.1] py-20 text-center
            text-white/30 font-mono text-[11px] tracking-widest">
            No testimonials yet. Be the first to share your experience!
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="reveal text-center mt-10 md:mt-12">
          <p className="text-[14px] text-white/30 font-light mb-4">
            Worked with us? We'd love to hear from you.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="font-mono text-[10px] tracking-[0.2em] uppercase
              text-gold hover:text-white/70
              transition-colors duration-200
              underline underline-offset-4"
          >
            Write a Review →
          </button>
        </div>

      </section>

      {showModal && (
        <TestimonialModal onClose={() => setShowModal(false)} />
      )}
    </>
  )
}