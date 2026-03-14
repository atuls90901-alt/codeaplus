'use client'
import { useEffect, useRef } from 'react'

const plans = [
  {
    name: 'Starter', price: '25K', period: 'One Time', featured: false,
    features: [
      { text: 'Up to 5 Pages',          on: true  },
      { text: 'Responsive Design',       on: true  },
      { text: 'Contact Form + CMS',      on: true  },
      { text: 'Basic SEO Setup',         on: true  },
      { text: 'Custom Web App',          on: false },
      { text: 'E-commerce',              on: false },
      { text: 'Priority Support',        on: false },
    ],
  },
  {
    name: 'Professional', price: '35K', period: 'One Time', featured: true,
    features: [
      { text: 'Up to 15 Pages',          on: true  },
      { text: 'Custom UI/UX Design',     on: true  },
      { text: 'Full Stack MERN',         on: true  },
      { text: 'Auth + Admin Panel',      on: true  },
      { text: 'Dashboard Included',      on: true  },
      { text: '1 Month Support',         on: true  },
      { text: 'E-commerce Module',       on: false },
    ],
  },
  {
    name: 'Enterprise', price: 'Custom', period: 'Tailored', featured: false,
    features: [
      { text: 'Unlimited Pages',         on: true },
      { text: 'Full E-commerce Store',   on: true },
      { text: 'Payment Gateway',         on: true },
      { text: 'Custom Integrations',     on: true },
      { text: 'Priority Support',        on: true },
      { text: 'Monthly Maintenance',     on: true },
      { text: 'Dedicated Manager',       on: true },
    ],
  },
]

export default function Pricing() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="pricing" className="bg-bg-secondary py-20 md:py-32 px-4 sm:px-8 md:px-16">

      {/* ── Header ── */}
      <div className="text-center mb-12 md:mb-16">
        <div className="reveal font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center justify-center gap-3">
          Investment
        </div>
        <h2 className="reveal delay-1 font-cormorant text-[clamp(36px,5vw,68px)] font-light leading-[1.05]">
          Simple <em className="italic text-gold">Pricing</em>
        </h2>
        <p className="reveal delay-2 text-[14px] md:text-[16px] font-light text-white/50 leading-[1.8] max-w-[400px] mx-auto mt-4">
          Transparent pricing, zero hidden fees.
        </p>
      </div>

      {/* ── Plans grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.1)' }}>
        {plans.map((plan, i) => (
          <div key={plan.name}
            className={`reveal delay-${i} relative flex flex-col
              p-8 sm:p-10 md:p-14
              transition-colors duration-300
              ${plan.featured ? 'bg-surface' : 'bg-bg-secondary hover:bg-surface'}`}>

            {/* Most Popular badge */}
            {plan.featured && (
              <div className="absolute top-0 right-6 md:right-9 font-mono text-[9px] tracking-[.15em] uppercase text-bg-primary bg-gold px-3.5 py-1.5">
                Most Popular
              </div>
            )}

            {/* Plan name */}
            <div className="font-mono text-[10px] tracking-[.25em] uppercase text-gold mb-5">
              {plan.name}
            </div>

            {/* Price */}
            <div className="font-cormorant text-[48px] sm:text-[56px] md:text-[62px] font-light leading-none mb-1.5">
              {plan.price !== 'Custom' && (
                <sup className="text-[20px] sm:text-[24px] md:text-[26px] align-super text-gold">₹</sup>
              )}
              {plan.price}
            </div>

            {/* Period */}
            <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50 mb-8 md:mb-10">
              {plan.period}
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 mb-8 md:mb-11 flex-1">
              {plan.features.map(f => (
                <li key={f.text}
                  className={`text-[13px] md:text-[14px] font-light flex items-center gap-3
                    ${f.on ? 'text-white' : 'text-white/30'}`}>
                  <span className="font-mono text-[12px] text-gold flex-shrink-0">—</span>
                  {f.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a href="#contact"
              className={`relative overflow-hidden group block font-mono text-[10px] tracking-[.18em] uppercase
                text-center py-4 border transition-all duration-300
                ${plan.featured
                  ? 'text-bg-primary bg-gold border-gold'
                  : 'text-white/50 border-gold/10 hover:text-bg-primary hover:border-gold'}`}>
              <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
              <span className="relative z-10">
                {plan.price === 'Custom' ? "Let's Talk" : 'Get Started'}
              </span>
            </a>

          </div>
        ))}
      </div>

      {/* ── Trust note ── */}
      <div className="reveal text-center mt-8 md:mt-10">
        <p className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25">
          No hidden fees · Cancel anytime · Free consultation included
        </p>
      </div>

    </section>
  )
}