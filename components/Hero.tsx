'use client'
import { useEffect, useState } from 'react'

const IMG_BG        = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&q=90'
const IMG_LAPTOP    = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90'
const IMG_PHONE     = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=90'
const IMG_CARD      = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=90'

export default function Hero() {
  const [counts, setCounts] = useState({ projects: 0, satisfaction: 0, years: 0 })

  useEffect(() => {
    const timer = setTimeout(() => {
      const animate = (key: keyof typeof counts, target: number) => {
        let s = 0
        const step = (ts: number) => {
          if(!s) s=ts
          const pr = Math.min((ts-s)/2200,1)
          const ease = 1-Math.pow(1-pr,4)
          setCounts(prev => ({...prev, [key]: Math.floor(ease*target)}))
          if(pr<1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
      animate('projects', 50)
      animate('satisfaction', 98)
      animate('years', 3)
    }, 3800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 overflow-hidden" suppressHydrationWarning>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ backgroundImage:`url('${IMG_BG}')`, backgroundSize:'cover', backgroundPosition:'center', opacity:0.06, filter:'grayscale(40%)' }} />
        <div className="absolute inset-0" style={{background:'linear-gradient(135deg,#060606 40%,rgba(6,6,6,0.85) 100%)'}} />
        <div className="absolute inset-[-40%]" style={{ background:'radial-gradient(ellipse 60% 50% at 20% 50%,rgba(201,168,76,.065) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 80% 30%,rgba(201,168,76,.04) 0%,transparent 60%)', animation:'bgPulse 9s ease-in-out infinite alternate' }} />
      </div>

      {/* Floating orbs — replaces particle grid */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Large gold orb — left */}
        <div style={{
          position:'absolute', top:'20%', left:'-10%',
          width:500, height:500, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)',
          animation:'orbFloat1 12s ease-in-out infinite',
          filter:'blur(40px)',
        }} />
        {/* Medium orb — top right */}
        <div style={{
          position:'absolute', top:'-5%', right:'10%',
          width:350, height:350, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)',
          animation:'orbFloat2 15s ease-in-out infinite',
          filter:'blur(50px)',
        }} />
        {/* Small orb — bottom right */}
        <div style={{
          position:'absolute', bottom:'15%', right:'20%',
          width:250, height:250, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)',
          animation:'orbFloat3 10s ease-in-out infinite',
          filter:'blur(30px)',
        }} />
        {/* Subtle horizontal light streak */}
        <div style={{
          position:'absolute', top:'45%', left:0, right:0,
          height:1,
          background:'linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.08) 30%,rgba(201,168,76,0.15) 50%,rgba(201,168,76,0.08) 70%,transparent 100%)',
          animation:'streakPulse 6s ease-in-out infinite',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-[5] grid grid-cols-1 md:grid-cols-2 items-center gap-8 pt-24 md:pt-0">
        {/* Left: Text */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold mb-6 md:mb-8 flex items-center gap-4 opacity-0" style={{animation:'fadeUp .8s ease 2.9s both'}}>
            <span className="w-9 h-px bg-gold opacity-50" />
            CodeaPlus · Est. 2022
          </div>
          <h1 className="font-cormorant text-[clamp(48px,10vw,128px)] font-light leading-[.92] tracking-tight mb-8 md:mb-10 opacity-0" style={{animation:'fadeUp .9s ease 3.1s both'}}>
            <span className="block">We Build</span>
            <span className="block"><em className="glitch italic text-gold" data-text="Digital">Digital</em></span>
            <span className="block">Experiences</span>
          </h1>
          <p className="text-[15px] md:text-[17px] font-light leading-[1.75] text-white/50 max-w-[420px] mb-10 md:mb-14 opacity-0" style={{animation:'fadeUp .8s ease 3.3s both'}}>
            Full-stack mastery meets design precision. We engineer MERN & Next.js solutions that transform ambitious ideas into market-leading digital products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center opacity-0" style={{animation:'fadeUp .8s ease 3.5s both'}}>
            <a href="#work" className="font-mono text-[11px] tracking-[.15em] uppercase text-[#060606] bg-gold px-8 py-4 relative overflow-hidden group inline-block">
              <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative z-10">Explore Work</span>
            </a>
            <a href="#contact" className="font-mono text-[11px] tracking-[.15em] uppercase text-white/50 hover:text-gold transition-colors flex items-center gap-3 group relative py-4">
              Start a Project
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Right: 3D Mockups — hidden on small mobile, show md+ */}
        <div className="relative h-[380px] md:h-[580px] opacity-0 hidden sm:block" style={{animation:'fadeUp 1s ease 3.4s both'}}>
          {/* Laptop */}
          <div className="absolute top-[5%] left-[5%] w-[75%]" style={{ animation:'floatA 6s ease-in-out infinite', filter:'drop-shadow(0 40px 60px rgba(0,0,0,.7))' }}>
            <div style={{ background:'linear-gradient(145deg,#1a1a1a,#0d0d0d)', border:'1.5px solid rgba(201,168,76,0.2)', borderRadius:'10px 10px 0 0', padding:'10px', transform:'perspective(900px) rotateY(-8deg) rotateX(4deg)' }}>
              <div style={{background:'#111',borderRadius:'5px 5px 0 0',padding:'7px 10px',display:'flex',alignItems:'center',gap:'6px',borderBottom:'1px solid rgba(201,168,76,0.08)'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:'#ff5f57'}} />
                <div style={{width:8,height:8,borderRadius:'50%',background:'#febc2e'}} />
                <div style={{width:8,height:8,borderRadius:'50%',background:'#28c840'}} />
                <div style={{flex:1,background:'#1a1a1a',borderRadius:3,height:16,marginLeft:8,display:'flex',alignItems:'center',paddingLeft:8}}>
                  <div style={{width:'60%',height:4,background:'rgba(201,168,76,0.2)',borderRadius:2}} />
                </div>
              </div>
              <div style={{background:'#060606',height:200,borderRadius:'0 0 5px 5px',overflow:'hidden',position:'relative'}}>
                <img src={IMG_LAPTOP} alt="Website preview" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.9,display:'block'}} />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 60%,rgba(6,6,6,0.5) 100%)'}} />
              </div>
            </div>
            <div style={{ background:'linear-gradient(180deg,#222,#161616)', border:'1.5px solid rgba(201,168,76,0.15)', borderTop:'none', borderRadius:'0 0 8px 8px', height:14, transform:'perspective(900px) rotateY(-8deg) rotateX(4deg)' }} />
            <div style={{ background:'linear-gradient(180deg,#1a1a1a,#111)', height:8, borderRadius:'0 0 20px 20px', margin:'0 8%' }} />
          </div>

          {/* Phone */}
          <div className="absolute bottom-[8%] right-[2%] w-[28%]" style={{ animation:'floatB 5s ease-in-out infinite', filter:'drop-shadow(0 30px 50px rgba(0,0,0,.8))' }}>
            <div style={{ background:'linear-gradient(145deg,#1e1e1e,#0d0d0d)', border:'1.5px solid rgba(201,168,76,0.25)', borderRadius:24, padding:'10px 8px', transform:'perspective(600px) rotateY(6deg) rotateX(-3deg)' }}>
              <div style={{width:60,height:8,background:'#111',borderRadius:10,margin:'0 auto 8px'}} />
              <div style={{background:'#060606',borderRadius:16,overflow:'hidden',height:220,position:'relative'}}>
                <img src={IMG_PHONE} alt="Mobile preview" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.9,display:'block'}} />
              </div>
              <div style={{width:50,height:4,background:'rgba(201,168,76,0.2)',borderRadius:3,margin:'8px auto 0'}} />
            </div>
          </div>

          {/* Card */}
          <div className="absolute top-[38%] right-[4%] w-[36%]" style={{ animation:'floatC 7s ease-in-out infinite', filter:'drop-shadow(0 20px 40px rgba(0,0,0,.6))' }}>
            <div style={{ background:'rgba(10,10,10,0.97)', border:'1px solid rgba(201,168,76,0.25)', borderRadius:12, overflow:'hidden', transform:'perspective(500px) rotateY(-4deg)' }}>
              <div style={{padding:'8px 12px',borderBottom:'1px solid rgba(201,168,76,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontFamily:'monospace',fontSize:8,color:'rgba(201,168,76,0.7)',letterSpacing:'0.15em'}}>PORTFOLIO</div>
                <div style={{width:6,height:6,borderRadius:'50%',background:'rgba(201,168,76,0.5)'}} />
              </div>
              <div style={{position:'relative',height:80,overflow:'hidden'}}>
                <img src={IMG_CARD} alt="Portfolio preview" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.85}} />
              </div>
              <div style={{padding:'8px 12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{width:70,height:3,background:'rgba(240,236,228,0.5)',borderRadius:2,marginBottom:4}} />
                  <div style={{width:50,height:2.5,background:'rgba(201,168,76,0.4)',borderRadius:2}} />
                </div>
                <div style={{fontFamily:'monospace',fontSize:9,color:'rgba(201,168,76,0.6)'}}>↗</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-16 right-6 md:right-16 flex justify-between items-end z-[5] opacity-0" style={{animation:'fadeUp .8s ease 3.7s both'}}>
        <div className="flex gap-8 md:gap-16">
          {[
            { val: counts.projects, suffix: '+', label: 'Projects' },
            { val: counts.satisfaction, suffix: '%', label: 'Satisfaction' },
            { val: counts.years, suffix: 'yr', label: 'Excellence' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-cormorant text-[32px] md:text-[46px] font-light leading-none">
                {s.val}<span className="text-gold">{s.suffix}</span>
              </div>
              <div className="font-mono text-[8px] md:text-[9px] tracking-[.2em] uppercase text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-14 bg-gradient-to-b from-gold to-transparent" style={{animation:'scrollPulse 2s ease-in-out infinite'}} />
          <div className="font-mono text-[9px] tracking-[.25em] uppercase text-white/50" style={{writingMode:'vertical-rl'}}>Scroll</div>
        </div>
      </div>

      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0px) rotate(0deg)} 33%{transform:translateY(-14px) rotate(.4deg)} 66%{transform:translateY(-6px) rotate(-.3deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px)} 40%{transform:translateY(-18px) rotate(-.5deg)} 70%{transform:translateY(-8px) rotate(.3deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-30px) scale(1.08)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.05)} }
        @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.1)} }
        @keyframes streakPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>
    </section>
  )
}