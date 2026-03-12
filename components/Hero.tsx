'use client'
import { useEffect, useRef, useState } from 'react'

// ============================================
// APNI IMAGES YAHAN LAGAO — BAS INHE BADLO
// ============================================
const IMG_BG        = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&q=90'
const IMG_LAPTOP    = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90'
const IMG_PHONE     = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=90'
const IMG_CARD      = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=90'
// ============================================

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [counts, setCounts] = useState({ projects: 0, satisfaction: 0, years: 0 })

  // Particles
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const cx = cv.getContext('2d')!
    let W = cv.width = window.innerWidth
    let H = cv.height = window.innerHeight
    let mx = W / 2, my = H / 2

    class Pt {
      x = Math.random() * W; y = Math.random() * H
      sz = Math.random() * 1.4 + 0.3
      sx = (Math.random() - .5) * .22; sy = (Math.random() - .5) * .22
      op = Math.random() * .45 + .1; gold = Math.random() > .65
      u() { this.x += this.sx; this.y += this.sy; if(this.x<0)this.x=W;if(this.x>W)this.x=0;if(this.y<0)this.y=H;if(this.y>H)this.y=0 }
      d() { cx.beginPath();cx.arc(this.x,this.y,this.sz,0,Math.PI*2);cx.fillStyle=this.gold?`rgba(201,168,76,${this.op})`:`rgba(240,236,228,${this.op*.35})`;cx.fill() }
    }
    const pts = Array.from({length:130}, () => new Pt())

    const onMM = (e: MouseEvent) => { mx=e.clientX;my=e.clientY;pts.forEach(p=>{p.x+=(e.clientX/W-.5)*.25;p.y+=(e.clientY/H-.5)*.25}) }
    document.addEventListener('mousemove', onMM)
    window.addEventListener('resize', () => { W=cv.width=innerWidth;H=cv.height=innerHeight })

    let raf: number
    const draw = () => {
      cx.clearRect(0,0,W,H)
      for(let i=0;i<pts.length;i++){for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<115){cx.beginPath();cx.moveTo(pts[i].x,pts[i].y);cx.lineTo(pts[j].x,pts[j].y);cx.strokeStyle=`rgba(201,168,76,${.045*(1-d/115)})`;cx.lineWidth=.5;cx.stroke()}}}
      pts.forEach(p=>{p.u();p.d()})
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); document.removeEventListener('mousemove', onMM) }
  }, [])

  // Counters - start after loader
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
    <section id="home" className="min-h-screen relative flex flex-col justify-center px-16 overflow-hidden">
      {/* Animated bg + background image */}
      <div className="absolute inset-0 z-0">
        {/* Background image - subtle */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url('${IMG_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
          filter: 'grayscale(40%)',
        }} />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{background:'linear-gradient(135deg,#060606 40%,rgba(6,6,6,0.85) 100%)'}} />
        <div className="absolute inset-[-40%]" style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 50%,rgba(201,168,76,.065) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 80% 30%,rgba(201,168,76,.04) 0%,transparent 60%)',
          animation: 'bgPulse 9s ease-in-out infinite alternate'
        }} />
      </div>

      {/* Animated Code Lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[
          { top: '8%',  left: '55%', opacity: 0.045, delay: '0s',   duration: '18s' },
          { top: '18%', left: '62%', opacity: 0.035, delay: '2s',   duration: '22s' },
          { top: '28%', left: '48%', opacity: 0.05,  delay: '4s',   duration: '16s' },
          { top: '38%', left: '70%', opacity: 0.03,  delay: '1s',   duration: '24s' },
          { top: '50%', left: '52%', opacity: 0.045, delay: '3s',   duration: '20s' },
          { top: '62%', left: '65%', opacity: 0.035, delay: '5s',   duration: '19s' },
          { top: '72%', left: '45%', opacity: 0.04,  delay: '2.5s', duration: '21s' },
          { top: '82%', left: '58%', opacity: 0.03,  delay: '1.5s', duration: '23s' },
          { top: '12%', left: '80%', opacity: 0.025, delay: '3.5s', duration: '17s' },
          { top: '45%', left: '85%', opacity: 0.03,  delay: '0.5s', duration: '25s' },
        ].map((line, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: line.top,
            left: line.left,
            opacity: line.opacity,
            animation: `codeLine ${line.duration} linear ${line.delay} infinite`,
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#C9A84C',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
          }}>
            {[
              'const buildExperience = async (client) => {',
              'import { NextJS, MERN } from "@studio/stack"',
              'export default function PremiumSite({ data }) {',
              'const response = await fetch("/api/project")',
              'return <div className="luxury-design" />',
              'db.collection("clients").insertOne(project)',
              'git commit -m "feat: launch client website"',
              'npm run build && vercel deploy --prod',
              'const [success, setSuccess] = useState(true)',
              'tailwind.config = { theme: { gold: "#C9A84C" } }',
            ][i]}
          </div>
        ))}
        <style>{`
          @keyframes codeLine {
            0%   { transform: translateX(0);      opacity: 0; }
            5%   { opacity: 1; }
            95%  { opacity: 1; }
            100% { transform: translateX(-120px); opacity: 0; }
          }
        `}</style>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

      <div className="relative z-[5] grid grid-cols-2 items-center gap-8">
        {/* Left: Text */}
        <div>
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold mb-8 flex items-center gap-4 opacity-0" style={{animation:'fadeUp .8s ease 2.9s both'}}>
            <span className="w-9 h-px bg-gold opacity-50" />
            CodeaPlus · Est. 2022
          </div>

          <h1 className="font-cormorant text-[clamp(58px,8vw,128px)] font-light leading-[.92] tracking-tight mb-10 opacity-0" style={{animation:'fadeUp .9s ease 3.1s both'}}>
            <span className="block">We Build</span>
            <span className="block">
              <em className="glitch italic text-gold" data-text="Digital">Digital</em>
            </span>
            <span className="block">Experiences</span>
          </h1>

          <p className="text-[17px] font-light leading-[1.75] text-white/50 max-w-[420px] mb-14 opacity-0" style={{animation:'fadeUp .8s ease 3.3s both'}}>
            Full-stack mastery meets design precision. We engineer MERN & Next.js solutions that transform ambitious ideas into market-leading digital products.
          </p>

          <div className="flex gap-6 items-center opacity-0" style={{animation:'fadeUp .8s ease 3.5s both'}}>
            <a href="#work" className="font-mono text-[11px] tracking-[.15em] uppercase text-[#060606] bg-gold px-10 py-4 relative overflow-hidden group inline-block">
              <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative z-10">Explore Work</span>
            </a>
            <a href="#contact" className="font-mono text-[11px] tracking-[.15em] uppercase text-white/50 hover:text-gold transition-colors flex items-center gap-3 group relative py-4">
              Start a Project
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              <span className="absolute bottom-3 left-0 w-0 group-hover:w-full h-px bg-gold transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* Right: 3D Floating Mockups */}
        <div className="relative h-[580px] opacity-0" style={{animation:'fadeUp 1s ease 3.4s both'}}>

          {/* Laptop Mockup */}
          <div className="absolute top-[5%] left-[5%] w-[75%]" style={{
            animation: 'floatA 6s ease-in-out infinite',
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,.7)) drop-shadow(0 0 40px rgba(201,168,76,.08))',
          }}>
            {/* Screen */}
            <div style={{
              background: 'linear-gradient(145deg,#1a1a1a,#0d0d0d)',
              border: '1.5px solid rgba(201,168,76,0.2)',
              borderRadius: '10px 10px 0 0',
              padding: '10px',
              transform: 'perspective(900px) rotateY(-8deg) rotateX(4deg)',
            }}>
              {/* Browser bar */}
              <div style={{background:'#111',borderRadius:'5px 5px 0 0',padding:'7px 10px',display:'flex',alignItems:'center',gap:'6px',borderBottom:'1px solid rgba(201,168,76,0.08)'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:'#ff5f57'}} />
                <div style={{width:8,height:8,borderRadius:'50%',background:'#febc2e'}} />
                <div style={{width:8,height:8,borderRadius:'50%',background:'#28c840'}} />
                <div style={{flex:1,background:'#1a1a1a',borderRadius:3,height:16,marginLeft:8,display:'flex',alignItems:'center',paddingLeft:8}}>
                  <div style={{width:'60%',height:4,background:'rgba(201,168,76,0.2)',borderRadius:2}} />
                </div>
              </div>
              {/* Screen content - Website screenshot */}
              <div style={{background:'#060606',height:200,borderRadius:'0 0 5px 5px',overflow:'hidden',position:'relative'}}>
                <img src={IMG_LAPTOP} alt="Website preview"
                  style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.9,display:'block'}} />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 60%,rgba(6,6,6,0.5) 100%)'}} />
                {/* Bottom stats overlay */}
                <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex',borderTop:'1px solid rgba(201,168,76,0.1)',padding:'5px 14px',gap:14,background:'rgba(6,6,6,0.7)',backdropFilter:'blur(8px)'}}>
                  {['50+','98%','3yr'].map((v,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:4}}>
                      <div style={{fontSize:8,color:'rgba(201,168,76,0.9)',fontWeight:600,fontFamily:'monospace'}}>{v}</div>
                      <div style={{width:24,height:1.5,background:'rgba(201,168,76,0.2)',borderRadius:2}} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Laptop base */}
            <div style={{
              background:'linear-gradient(180deg,#222,#161616)',
              border:'1.5px solid rgba(201,168,76,0.15)',
              borderTop:'none',
              borderRadius:'0 0 8px 8px',
              height:14,
              transform:'perspective(900px) rotateY(-8deg) rotateX(4deg)',
            }} />
            <div style={{
              background:'linear-gradient(180deg,#1a1a1a,#111)',
              height:8,
              borderRadius:'0 0 20px 20px',
              margin:'0 8%',
              boxShadow:'0 8px 30px rgba(0,0,0,0.5)',
            }} />
          </div>

          {/* Phone Mockup */}
          <div className="absolute bottom-[8%] right-[2%] w-[28%]" style={{
            animation: 'floatB 5s ease-in-out infinite',
            filter: 'drop-shadow(0 30px 50px rgba(0,0,0,.8)) drop-shadow(0 0 25px rgba(201,168,76,.1))',
          }}>
            <div style={{
              background:'linear-gradient(145deg,#1e1e1e,#0d0d0d)',
              border:'1.5px solid rgba(201,168,76,0.25)',
              borderRadius:24,
              padding:'10px 8px',
              transform:'perspective(600px) rotateY(6deg) rotateX(-3deg)',
            }}>
              {/* Notch */}
              <div style={{width:60,height:8,background:'#111',borderRadius:10,margin:'0 auto 8px',border:'1px solid rgba(201,168,76,0.1)'}} />
              {/* Phone screen - Mobile screenshot */}
              <div style={{background:'#060606',borderRadius:16,overflow:'hidden',height:220,position:'relative'}}>
                <img src={IMG_PHONE} alt="Mobile preview"
                  style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.9,display:'block'}} />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 50%,rgba(6,6,6,0.6) 100%)'}} />
                {/* Gold border glow */}
                <div style={{position:'absolute',inset:0,boxShadow:'inset 0 0 20px rgba(201,168,76,0.05)'}} />
              </div>
              {/* Home indicator */}
              <div style={{width:50,height:4,background:'rgba(201,168,76,0.2)',borderRadius:3,margin:'8px auto 0'}} />
            </div>
          </div>

          {/* Floating UI card - Portfolio preview */}
          <div className="absolute top-[38%] right-[4%] w-[36%]" style={{
            animation: 'floatC 7s ease-in-out infinite',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.6))',
          }}>
            <div style={{
              background:'rgba(10,10,10,0.97)',
              border:'1px solid rgba(201,168,76,0.25)',
              borderRadius:12,
              overflow:'hidden',
              backdropFilter:'blur(20px)',
              transform:'perspective(500px) rotateY(-4deg)',
            }}>
              {/* Card header */}
              <div style={{padding:'8px 12px',borderBottom:'1px solid rgba(201,168,76,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontFamily:'monospace',fontSize:8,color:'rgba(201,168,76,0.7)',letterSpacing:'0.15em'}}>PORTFOLIO</div>
                <div style={{width:6,height:6,borderRadius:'50%',background:'rgba(201,168,76,0.5)'}} />
              </div>
              {/* Portfolio image */}
              <div style={{position:'relative',height:80,overflow:'hidden'}}>
                <img
                  src={IMG_CARD}
                  alt="Portfolio preview"
                  style={{width:'100%',height:'100%',objectFit:'cover',opacity:0.85,filter:'saturate(0.7)'}}
                />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(6,6,6,0.3),rgba(201,168,76,0.05))'}} />
              </div>
              {/* Card footer */}
              <div style={{padding:'8px 12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{width:70,height:3,background:'rgba(240,236,228,0.5)',borderRadius:2,marginBottom:4}} />
                  <div style={{width:50,height:2.5,background:'rgba(201,168,76,0.4)',borderRadius:2}} />
                </div>
                <div style={{fontFamily:'monospace',fontSize:9,color:'rgba(201,168,76,0.6)'}}>↗</div>
              </div>
            </div>
          </div>

          {/* Glow orb behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none" style={{
            background:'radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)',
            filter:'blur(40px)',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(.4deg); }
          66% { transform: translateY(-6px) rotate(-.3deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(-18px) rotate(-.5deg); }
          70% { transform: translateY(-8px) rotate(.3deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* Stats + scroll */}
      <div className="absolute bottom-12 left-16 right-16 flex justify-between items-end z-[5] opacity-0" style={{animation:'fadeUp .8s ease 3.7s both'}}>
        <div className="flex gap-16">
          {[
            { val: counts.projects, suffix: '+', label: 'Projects Delivered' },
            { val: counts.satisfaction, suffix: '%', label: 'Client Satisfaction' },
            { val: counts.years, suffix: 'yr', label: 'Of Excellence' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-cormorant text-[46px] font-light leading-none">
                {s.val}<span className="text-gold">{s.suffix}</span>
              </div>
              <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/50 mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-14 bg-gradient-to-b from-gold to-transparent" style={{animation:'scrollPulse 2s ease-in-out infinite'}} />
          <div className="font-mono text-[9px] tracking-[.25em] uppercase text-white/50" style={{writingMode:'vertical-rl'}}>Scroll</div>
        </div>
      </div>
    </section>
  )
}