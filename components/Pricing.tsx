'use client'
import { useEffect, useRef } from 'react'

const plans = [
  {
    name: 'Starter', price: '25K', period: 'One Time',
    features: [
      { text:'Up to 5 Pages', on:true }, { text:'Responsive Design', on:true },
      { text:'Contact Form + CMS', on:true }, { text:'Basic SEO Setup', on:true },
      { text:'Custom Web App', on:false }, { text:'E-commerce', on:false }, { text:'Priority Support', on:false },
    ]
  },
  {
    name: 'Professional', price: '75K', period: 'One Time', featured: true,
    features: [
      { text:'Up to 15 Pages', on:true }, { text:'Custom UI/UX Design', on:true },
      { text:'Full Stack MERN', on:true }, { text:'Auth + Admin Panel', on:true },
      { text:'Dashboard Included', on:true }, { text:'1 Month Support', on:true },
      { text:'E-commerce Module', on:false },
    ]
  },
  {
    name: 'Enterprise', price: 'Custom', period: 'Tailored',
    features: [
      { text:'Unlimited Pages', on:true }, { text:'Full E-commerce Store', on:true },
      { text:'Payment Gateway', on:true }, { text:'Custom Integrations', on:true },
      { text:'Priority Support', on:true }, { text:'Monthly Maintenance', on:true },
      { text:'Dedicated Manager', on:true },
    ]
  },
]

export default function Pricing() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="pricing" className="py-32 px-16 bg-[#0a0a0a]">
      <div className="text-center mb-18">
        <div className="reveal font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center justify-center gap-3">
          Investment
        </div>
        <h2 className="reveal delay-1 font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05]">
          Simple <em className="italic text-gold">Pricing</em>
        </h2>
        <p className="reveal delay-2 text-[16px] font-light text-white/50 leading-[1.8] max-w-[400px] mx-auto mt-4">
          Transparent pricing, zero hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-px" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.1)'}}>
        {plans.map((plan, i) => (
          <div key={plan.name}
            className={`reveal delay-${i} p-14 relative transition-colors duration-300 ${plan.featured ? 'bg-[#111]' : 'bg-[#0a0a0a] hover:bg-[#111]'}`}
            data-hover
          >
            {plan.featured && (
              <div className="absolute top-0 right-9 font-mono text-[9px] tracking-[.15em] uppercase text-[#060606] bg-gold px-3.5 py-1.5">
                Most Popular
              </div>
            )}
            <div className="font-mono text-[10px] tracking-[.25em] uppercase text-gold mb-5">{plan.name}</div>
            <div className="font-cormorant text-[62px] font-light leading-none mb-1.5">
              {plan.price !== 'Custom' && <sup className="text-[26px] align-super text-gold">₹</sup>}
              {plan.price}
            </div>
            <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50 mb-10">{plan.period}</div>
            <ul className="flex flex-col gap-3.5 mb-11">
              {plan.features.map(f => (
                <li key={f.text} className={`text-[14px] font-light flex items-center gap-3 ${f.on ? 'text-white' : 'text-white/30'}`}>
                  <span className="font-mono text-[12px] text-gold">—</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <a href="#contact"
              className="block font-mono text-[10px] tracking-[.18em] uppercase text-center py-4 border border-gold/10 text-white/50 relative overflow-hidden group transition-all duration-300 hover:text-[#060606] hover:border-gold"
              style={plan.featured ? {color:'#060606', background:'#C9A84C', borderColor:'#C9A84C'} : {}}
            >
              <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
              <span className="relative z-10">{plan.price === 'Custom' ? "Let's Talk" : 'Get Started'}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
