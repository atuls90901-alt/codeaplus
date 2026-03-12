'use client'
import { useEffect, useRef } from 'react'
import { Project } from '@/types'

export default function Portfolio({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="py-32 px-16 bg-[#060606]">
      <div className="flex justify-between items-end mb-16">
        <div className="reveal-left">
          <div className="font-mono text-[10px] tracking-[.3em] uppercase text-gold mb-3 flex items-center gap-3">
            Selected Work <span className="flex-1 max-w-[50px] h-px bg-gold/10" />
          </div>
          <h2 className="font-cormorant text-[clamp(38px,5vw,68px)] font-light leading-[1.05]">
            Our <em className="italic text-gold">Projects</em>
          </h2>
        </div>
        <a href="#contact" className="reveal-right font-mono text-[11px] tracking-[.15em] uppercase text-white/50 hover:text-gold flex items-center gap-3 group transition-colors relative py-4">
          All Projects <span className="group-hover:translate-x-1.5 transition-transform">→</span>
          <span className="absolute bottom-3 left-0 w-0 group-hover:w-full h-px bg-gold transition-all duration-300" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-0.5" style={{background:'rgba(201,168,76,0.1)'}}>
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`reveal delay-${i%2} relative overflow-hidden bg-[#111] group ${i===0 ? 'col-span-2' : ''}`}
            style={{ aspectRatio: i === 0 ? '21/8' : '16/9' }}
            data-hover
          >
            {/* Animated bg */}
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]"
              style={{ background: project.gradient }}
            />

            {/* 3D Mockup */}
            <div
              className="absolute inset-[5%] border border-white/7 rounded-md overflow-hidden bg-black/30 group-hover:[transform:perspective(800px)_rotateX(4deg)_rotateY(-2deg)] transition-transform duration-500"
              style={{ transform: 'perspective(800px) rotateX(8deg) rotateY(-4deg)', boxShadow:'0 30px 60px rgba(0,0,0,.5)' }}
            >
              <div className="h-6 bg-white/4 border-b border-white/5 flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/30" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
                <div className="w-2 h-2 rounded-full bg-green-400/30" />
                <div className="flex-1 mx-3 bg-white/4 rounded h-3 max-w-[160px]" />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <div className="h-16 rounded bg-gradient-to-br from-gold/8 to-gold/3 border border-gold/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/6 to-transparent" style={{animation:'shimmer 2s infinite'}} />
                </div>
                <div className="h-1.5 rounded bg-gold/15 w-[55%]" />
                <div className="h-1.5 rounded bg-white/6 w-[70%]" />
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="h-7 rounded bg-white/4 border border-white/4" />
                  <div className="h-7 rounded bg-white/4 border border-white/4" />
                </div>
              </div>
            </div>

            {/* Hover info */}
            <div className="absolute inset-0 flex flex-col justify-end p-9 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{background:'linear-gradient(to top,rgba(6,6,6,.97) 0%,rgba(6,6,6,.3) 50%,transparent 100%)'}}>
              <div className="font-mono text-[9px] tracking-[.3em] uppercase text-gold mb-2">{project.category}</div>
              <div className="font-cormorant text-3xl font-normal">{project.title}</div>
              {project.tech_stack?.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {project.tech_stack.slice(0,3).map(t => (
                    <span key={t} className="font-mono text-[8px] tracking-widest uppercase text-white/40 border border-white/10 px-2 py-0.5">{t}</span>
                  ))}
                </div>
              )}
              <div className="font-mono text-[10px] tracking-[.2em] uppercase text-white/40 flex items-center gap-2 mt-3">
                {project.live_url ? <a href={project.live_url} target="_blank" rel="noopener noreferrer">View Live →</a> : 'Case Study →'}
              </div>
            </div>
          </div>
        ))}

        {/* Fallback if no projects */}
        {projects.length === 0 && (
          <div className="col-span-2 py-20 text-center text-white/30 font-mono text-sm tracking-widest">
            No projects yet. Add some from the admin panel.
          </div>
        )}
      </div>
    </section>
  )
}
