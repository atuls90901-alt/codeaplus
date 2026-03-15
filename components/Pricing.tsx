'use client'
import { useEffect, useRef } from 'react'

const plans = [
  {
    name:     'Starter',
    price:    '$1,500',
    period:   'One Time',
    desc:     'Landing pages, portfolio sites & brand websites that make a strong first impression.',
    featured: false,
    cta:      'Get Started',
    features: [
      { text: 'Up to 8 Pages',                on: true  },
      { text: 'Custom UI/UX Design',           on: true  },
      { text: 'Fully Responsive',              on: true  },
      { text: 'SEO-Ready Setup',               on: true  },
      { text: 'CMS Integration',               on: true  },
      { text: 'Contact Form & Analytics',      on: true  },
      { text: 'Auth & Admin Panel',            on: false },
      { text: 'Payment Gateway',               on: false },
    ],
  },
  {
    name:     'Growth',
    price:    '$4,000',
    period:   'One Time',
    desc:     'SaaS MVPs, marketplaces & full-stack apps. Everything to launch and acquire your first users.',
    featured: true,
    cta:      'Start Your MVP →',
    features: [
      { text: 'Full MERN Stack App',           on: true  },
      { text: 'Auth, Dashboard & Admin Panel', on: true  },
      { text: 'Payment Gateway Integration',   on: true  },
      { text: 'REST API + DB Architecture',    on: true  },
      { text: 'Figma Design System',           on: true  },
      { text: '1 Month Post-Launch Support',   on: true  },
      { text: 'Real-time Features',            on: false },
      { text: 'Cloud Infrastructure Setup',    on: false },
    ],
  },
  {
    name:     'Enterprise',
    price:    'Custom',
    period:   'Tailored',
    desc:     'Complex platforms, funded startup builds & multi-role apps with dedicated resources.',
    featured: false,
    cta:      "Let's Talk →",
    features: [
      { text: 'Unlimited Scope',               on: true },
      { text: 'Real-time (WebSockets)',        on: true },
      { text: 'Cloud Infrastructure & CI/CD',  on: true },
      { text: 'Dedicated Project Manager',     on: true },
      { text: 'Multi-role Access Control',     on: true },
      { text: 'Priority 24/7 Support',         on: true },
      { text: 'Monthly Retainer Available',    on: true },
      { text: 'Investor-ready Architecture',   on: true },
    ],
  },
]

const DELAYS = ['delay-1', 'delay-2', 'delay-3'] as const

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
    <section
      ref={ref}
      id="pricing"
      className="bg-bg-secondary py-20 md:py-32 px-4 sm:px-8 md:px-16"
    >

      {/* ── Header ── */}
      <div className="text-center mb-12 md:mb-16">
        <div className="reveal font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3
          flex items-center justify-center gap-3">
          Investment
        </div>
        <h2 className="reveal delay-1 font-cormorant font-light leading-[1.05]
          text-[clamp(36px,5vw,68px)]">
          Transparent <em className="italic text-gold">Pricing.</em>
          <br className="hidden sm:block" /> No Surprises.
        </h2>
        <p className="reveal delay-2 font-light text-white/50 leading-[1.8]
          max-w-[420px] mx-auto mt-4 text-[14px] md:text-[15px]">
          Fixed-scope, fixed-price projects. You always know exactly
          what you're paying for — and why.
        </p>
      </div>

      {/* ── Plans — simple flex/grid, no border tricks ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0
        md:border md:border-gold/[0.1]">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={[
              'reveal', DELAYS[i],
              'relative flex flex-col',
              'pt-10 pb-8 px-8 md:px-10',
              'transition-colors duration-300',
              // Mobile: card border
              'border border-gold/[0.1] md:border-0',
              // Desktop: only right border between cards
              i < plans.length - 1 ? 'md:border-r md:border-r-gold/[0.1]' : '',
              plan.featured
                ? 'bg-surface'
                : 'bg-bg-secondary hover:bg-surface',
            ].filter(Boolean).join(' ')}
          >

            {/* Badge — centered top, clear of all content */}
            {plan.featured && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2
                font-mono text-[9px] tracking-[0.15em] uppercase
                text-bg-primary bg-gold px-4 py-1.5 whitespace-nowrap">
                Most Popular
              </div>
            )}

            {/* Plan name */}
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold mb-3">
              {plan.name}
            </div>

            {/* Price */}
            <div className="font-cormorant font-light leading-none mb-1
              text-[42px] sm:text-[50px] md:text-[54px]">
              {plan.price}
            </div>

            {/* Period */}
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-3">
              {plan.period}
            </div>

            {/* Description */}
            <p className="text-[12px] md:text-[13px] font-light text-white/45 leading-[1.7]
              mb-6 pb-6 border-b border-gold/[0.08]">
              {plan.desc}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {plan.features.map(f => (
                <li
                  key={f.text}
                  className={`text-[12px] md:text-[13px] font-light flex items-start gap-3
                    ${f.on ? 'text-white/85' : 'text-white/25'}`}
                >
                  <span className={`font-mono text-[11px] flex-shrink-0 mt-px
                    ${f.on ? 'text-gold' : 'text-white/20'}`}>
                    {f.on ? '→' : '—'}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className={[
                'relative overflow-hidden group',
                'block font-mono text-[10px] tracking-[0.18em] uppercase',
                'text-center py-4 border transition-all duration-300',
                plan.featured
                  ? 'text-bg-primary bg-gold border-gold'
                  : 'text-white/50 border-gold/20 hover:text-bg-primary hover:border-gold',
              ].join(' ')}
            >
              <span className="absolute inset-0 bg-gold scale-x-0 origin-left
                group-hover:scale-x-100 transition-transform duration-300 z-0" />
              <span className="relative z-10">{plan.cta}</span>
            </a>

          </div>
        ))}
      </div>

      {/* ── Trust note ── */}
      <div className="reveal text-center mt-8 md:mt-10">
        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/25">
          No hidden fees · Fixed-price contracts · Free consultation included
        </p>
      </div>

    </section>
  )
}