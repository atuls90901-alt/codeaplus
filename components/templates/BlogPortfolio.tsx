'use client'
import { useState } from 'react'
import Link from 'next/link'

const PROJECTS = [
  { title: 'Designflow', desc: 'Design collaboration tool for distributed teams. Built with Next.js, WebSockets, and Figma API.', stack: ['Next.js', 'WebSockets', 'PostgreSQL'], link: '#', stars: 847 },
  { title: 'Codeblock', desc: 'VS Code extension for instant code snippet sharing with syntax highlighting.', stack: ['TypeScript', 'VS Code API', 'React'], link: '#', stars: 1.2 },
  { title: 'Heatmap', desc: 'Open-source analytics tool for tracking user interactions without compromising privacy.', stack: ['Go', 'ClickHouse', 'Next.js'], link: '#', stars: 2.4 },
]

const POSTS = [
  { title: 'Building a real-time collaborative editor from scratch', date: 'Mar 8, 2026', readTime: '12 min', tag: 'Engineering' },
  { title: 'Why I switched from React to vanilla JS for my portfolio', date: 'Feb 22, 2026', readTime: '7 min', tag: 'Opinion' },
  { title: 'The complete guide to WebSocket authentication', date: 'Feb 10, 2026', readTime: '15 min', tag: 'Tutorial' },
  { title: 'How I built and sold a SaaS in 90 days', date: 'Jan 28, 2026', readTime: '20 min', tag: 'Startup' },
]

const SKILLS = [
  { name: 'TypeScript', level: 95 },
  { name: 'React / Next.js', level: 92 },
  { name: 'Node.js', level: 88 },
  { name: 'PostgreSQL', level: 80 },
  { name: 'Go', level: 72 },
  { name: 'AWS / DevOps', level: 75 },
]

export default function BlogPortfolioTemplate() {
  const [activeSection, setActiveSection] = useState('all')
  const [isDark, setIsDark] = useState(true)

  const bg = isDark ? '#0f1117' : '#f9fafb'
  const text = isDark ? '#e2e8f0' : '#1a1a2e'
  const muted = isDark ? 'rgba(226,232,240,0.4)' : 'rgba(26,26,46,0.5)'
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : '#ffffff'

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{ background: bg, color: text, fontFamily: "'IBM Plex Mono', monospace" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .grotesk { font-family: 'Space Grotesk', sans-serif; }
        .tag { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor { animation: blink 1s infinite; }
        .skill-bar { transition: width 1s ease; }
      `}</style>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b"
        style={{ background: bg, borderColor: border }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sm font-medium" style={{ color: text }}>
            <span style={{ color: '#22d3ee' }}>~/</span>alex.dev
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs" style={{ color: muted }}>
            {['projects', 'writing', 'about', 'contact'].map(item => (
              <a key={item} href={`#${item}`}
                className="hover:opacity-100 transition-opacity"
                onClick={() => setActiveSection(item)}>
                ./{item}
              </a>
            ))}
          </div>
          <button onClick={() => setIsDark(d => !d)}
            className="text-xs px-3 py-1.5 rounded border transition-all"
            style={{ borderColor: border, color: muted }}>
            {isDark ? '☀ light' : '☾ dark'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-6 mb-12">
            <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl
              bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border"
              style={{ borderColor: border }}>
              👨‍💻
            </div>
            <div>
              <h1 className="grotesk text-4xl font-bold mb-2" style={{ color: text }}>Alex Kumar</h1>
              <p className="text-sm mb-3" style={{ color: muted }}>
                <span style={{ color: '#22d3ee' }}>@</span>alexkumar · Full-stack engineer
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: muted }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                Available for freelance · Berlin, DE
              </div>
            </div>
          </div>

          <div className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: muted }}>
            <span style={{ color: '#a78bfa' }}>const</span>{' '}
            <span style={{ color: '#22d3ee' }}>bio</span>{' '}
            <span style={{ color: text }}>=</span>{' '}
            <span style={{ color: '#34d399' }}>&quot;I build fast, beautiful web apps.
            Open-source contributor. Occasional writer about engineering, startups, and design.&quot;</span>
            <span className="cursor" style={{ color: text }}>_</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm transition-all
                hover:opacity-80"
              style={{ borderColor: border, color: text }}>
              <span>◈</span> GitHub
            </a>
            <a href="#contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 transition-all">
              <span>✉</span> Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-6 border-t" style={{ borderColor: border }}>
        <div className="max-w-3xl mx-auto">
          <p className="tag mb-8" style={{ color: '#22d3ee' }}>// skills</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SKILLS.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: text }}>{skill.name}</span>
                  <span style={{ color: muted }}>{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: border }}>
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 skill-bar"
                    style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-6 border-t" style={{ borderColor: border }}>
        <div className="max-w-3xl mx-auto">
          <p className="tag mb-8" style={{ color: '#22d3ee' }}>// projects</p>
          <div className="space-y-4">
            {PROJECTS.map(project => (
              <div key={project.title}
                className="p-6 rounded-xl border hover:opacity-90 transition-all cursor-pointer"
                style={{ background: cardBg, borderColor: border }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="grotesk text-lg font-semibold" style={{ color: text }}>
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: muted }}>
                    <span>★</span> {project.stars}k
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: muted }}>
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="tag px-2.5 py-1 rounded border"
                      style={{ borderColor: border, color: '#22d3ee' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section id="writing" className="py-16 px-6 border-t" style={{ borderColor: border }}>
        <div className="max-w-3xl mx-auto">
          <p className="tag mb-8" style={{ color: '#22d3ee' }}>// writing</p>
          <div className="divide-y" style={{ borderColor: border }}>
            {POSTS.map(post => (
              <a key={post.title} href="#"
                className="flex items-start justify-between gap-4 py-5
                  group hover:opacity-80 transition-opacity cursor-pointer">
                <div className="flex-1">
                  <h3 className="grotesk font-medium mb-2 group-hover:text-cyan-400 transition-colors"
                    style={{ color: text }}>
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs" style={{ color: muted }}>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
                <span className="tag px-2.5 py-1 rounded border flex-shrink-0"
                  style={{ borderColor: border, color: '#a78bfa' }}>
                  {post.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 border-t" style={{ borderColor: border }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="tag mb-4" style={{ color: '#22d3ee' }}>// contact</p>
          <h2 className="grotesk text-4xl font-bold mb-4" style={{ color: text }}>
            Let&apos;s build something
          </h2>
          <p className="text-sm mb-10" style={{ color: muted }}>
            Open for freelance projects, consulting, and interesting conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:alex@dev.com"
              className="px-8 py-4 rounded-xl font-medium text-sm
                bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 transition-all">
              ✉ alex@dev.com
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl text-sm border transition-all hover:opacity-70"
              style={{ borderColor: border, color: text }}>
              𝕏 @alexkumar
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t text-center text-xs" style={{ borderColor: border, color: muted }}>
        <p>Built with Next.js · © 2026 Alex Kumar ·{' '}
          <Link href="/website-templates/blog-portfolio"
            className="hover:text-cyan-400 transition-colors">
            Template by CodeaPlus →
          </Link>
        </p>
      </footer>
    </div>
  )
}