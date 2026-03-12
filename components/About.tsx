'use client'
import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="about" className="py-20 md:py-32 px-6 md:px-16 bg-[#0a0a0a] grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-center">
      {/* Visual */}
      <div className="reveal-left relative">
        <div className="bg-[#111] border border-gold/10 p-6 md:p-9 relative overflow-hidden min-h-[340px] md:min-h-[460px]">
          <div className="bg-[#0c0c0c] border border-white/5 rounded-md overflow-hidden">
            <div className="h-[30px] bg-white/3 border-b border-white/4 flex items-center px-3 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            <div className="p-4 md:p-5 font-mono text-[11px] md:text-[12px] leading-[2]">
              <span className="text-white/25">{`// Crafting your vision`}</span><br/>
              <span className="text-blue-300">const</span> <span className="text-white/90">project</span> = <span className="text-blue-300">await</span> <span className="text-orange-300">studio</span>.<span className="text-orange-300">create</span>{'({'}<br/>
              &nbsp;&nbsp;<span className="text-white/90">stack</span>: [<span className="text-green-300">'Next.js'</span>, <span className="text-green-300">'Node'</span>],<br/>
              &nbsp;&nbsp;<span className="text-white/90">db</span>: <span className="text-green-300">'MongoDB'</span>,<br/>
              &nbsp;&nbsp;<span className="text-white/90">deploy</span>: <span className="text-green-300">'Vercel'</span><br/>
              {'}'});<br/><br/>
              <span className="text-white/25">{`// Result ✓`}</span><br/>
              <span className="text-blue-300">return</span> {'{'}<br/>
              &nbsp;&nbsp;<span className="text-white/90">quality</span>: <span className="text-gold">'exceptional'</span>,<br/>
              &nbsp;&nbsp;<span className="text-white/90">client</span>: <span className="text-gold">'happy'</span>
              <span className="inline-block w-0.5 h-3.5 bg-gold ml-0.5 align-middle" style={{animation:'blink 1s infinite'}} /><br/>
              {'}'}; 
            </div>
          </div>
        </div>
        <div className="absolute -bottom-5 -right-5 w-[100px] h-[100px] md:w-[136px] md:h-[136px] bg-gold border-4 border-[#0a0a0a] flex flex-col items-center justify-center z-10">
          <div className="font-cormorant text-[32px] md:text-[42px] font-light text-[#060606] leading-none">3+</div>
          <div className="font-mono text-[8px] md:text-[9px] tracking-[.1em] uppercase text-[#060606] text-center mt-1">Years of<br/>Excellence</div>
        </div>
      </div>

      {/* Content */}
      <div className="reveal-right mt-8 md:mt-0">
        <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
          Who We Are <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
        </div>
        <h2 className="font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05] mb-5">
          Built by <em className="italic text-gold">Developers,</em><br/>for Business
        </h2>
        <p className="text-[15px] md:text-[16px] font-light text-white/50 leading-[1.8]">
          We're a boutique full-stack studio. We don't just code — we engineer digital products that solve real problems and drive measurable growth.
        </p>
        <div className="flex flex-col gap-4 mt-8 md:mt-10">
          {[
            { icon:'⚡', title:'Lightning Fast Delivery', desc:'Most projects shipped in 2–4 weeks without sacrificing quality.' },
            { icon:'🔒', title:'Security First', desc:'Enterprise-grade security baked into every layer.' },
            { icon:'♾', title:'Built to Scale', desc:'Architecture designed to grow from 100 to 1,000,000 users.' },
          ].map(f => (
            <div key={f.title} className="flex gap-4 md:gap-5 items-start p-5 md:p-6 border border-gold/10 hover:border-gold/38 hover:bg-gold/2 transition-all group relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <span className="text-xl mt-0.5">{f.icon}</span>
              <div>
                <h4 className="text-[14px] md:text-[15px] font-medium mb-1">{f.title}</h4>
                <p className="text-[13px] text-white/50 font-light leading-[1.65]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}