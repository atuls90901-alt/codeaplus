'use client'
import { useEffect, useRef } from 'react'

const services = [
  { num:'01', icon:'⬡', name:'Web Design', desc:'Pixel-perfect responsive interfaces that convert. Every interaction designed with intention and craft.', tags:['UI/UX','Figma','Responsive'] },
  { num:'02', icon:'◈', name:'Full Stack Dev', desc:'Scalable MERN & Next.js apps. Fast, secure architecture built to handle real-world traffic.', tags:['Next.js','React','Node.js'] },
  { num:'03', icon:'◎', name:'E-Commerce', desc:'Revenue-driving storefronts with seamless checkout, inventory management and analytics dashboards.', tags:['Stripe','Razorpay','MongoDB'] },
  { num:'04', icon:'⬧', name:'API Development', desc:'RESTful & GraphQL APIs engineered for performance, security and seamless third-party integration.', tags:['REST','GraphQL','JWT'] },
  { num:'05', icon:'◇', name:'Maintenance', desc:'Proactive monthly care — monitoring, updates, backups and performance optimization.', tags:['24/7 Monitor','Updates','Backups'] },
  { num:'06', icon:'◉', name:'SEO & Speed', desc:'Core Web Vitals mastery and technical SEO. Your site ranks #1 and loads in under a second.', tags:['SEO','Performance','Analytics'] },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX-r.left)/r.width-.5, y = (e.clientY-r.top)/r.height-.5
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x*13}deg) rotateX(${-y*10}deg) scale(1.02)`
    e.currentTarget.style.setProperty('--mx', (e.clientX-r.left)/r.width*100+'%')
    e.currentTarget.style.setProperty('--my', (e.clientY-r.top)/r.height*100+'%')
  }
  const untilt = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = '' }

  return (
    <section ref={sectionRef} id="services" className="py-32 px-16 bg-[#0a0a0a]">
      <div className="grid grid-cols-2 gap-12 mb-20 items-end">
        <div className="reveal-left">
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
            What We Do <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
          </div>
          <h2 className="font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05]">
            Our <em className="italic text-gold">Services</em>
          </h2>
        </div>
        <p className="text-[16px] font-light text-white/50 leading-[1.8] max-w-[460px] reveal-right">
          End-to-end digital solutions engineered with modern stacks. Zero templates — every product built from scratch.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-px" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.1)'}}>
        {services.map((s, i) => (
          <div
            key={s.num}
            className={`reveal delay-${i%3} bg-[#0a0a0a] p-12 relative overflow-hidden group transition-colors duration-300 hover:bg-[#111]`}
            onMouseMove={tilt} onMouseLeave={untilt}
            data-hover
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="font-mono text-[10px] tracking-[.2em] text-gold/40 mb-7">{s.num}</div>
            <div className="text-[28px] mb-5">{s.icon}</div>
            <h3 className="font-cormorant text-[26px] font-normal mb-3">{s.name}</h3>
            <p className="text-[14px] text-white/50 leading-[1.75] font-light">{s.desc}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {s.tags.map(t => (
                <span key={t} className="font-mono text-[9px] tracking-[.1em] uppercase text-gold/40 border border-gold/10 group-hover:border-gold/35 group-hover:text-gold px-2.5 py-1 transition-all duration-300">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
