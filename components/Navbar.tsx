'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'

const NAV_LINKS = [
  { label: 'Services', href: '#services'  },
  { label: 'Work',     href: '#work'      },
  { label: 'About',    href: '#about'     },
  { label: 'Pricing',  href: '#pricing'   },
  { label: 'Audit',    href: '/audit', highlight: true },
]

const TOOLKIT_LINKS = [
  { label: 'AI Project Planner', href: '/ai-project-planner', icon: '🤖', desc: 'Turn idea → full tech plan'  },
  { label: 'Cost Calculator',    href: '/startup-cost',        icon: '💰', desc: 'Real-time project estimate'  },
  { label: 'Starter Kits',       href: '/starter-kits',        icon: '📦', desc: 'Pre-scoped project kits'     },
  { label: 'Scope Builder',      href: '/build-your-project',  icon: '🛠️', desc: '4-step project scope wizard' },
  { label: 'Startup Lab',        href: '/startup-lab',         icon: '🧪', desc: 'Real projects we built'      },
  { label: 'Templates',          href: '/website-templates',   icon: '🎨', desc: 'Ready-to-launch templates'   },
]

const ADMIN_EMAIL = 'itsatul45@gmail.com'

const MOBILE_DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:50ms]',
  '[animation-delay:100ms]',
  '[animation-delay:150ms]',
  '[animation-delay:200ms]',
  '[animation-delay:250ms]',
] as const

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [dropdownOpen,  setDropdownOpen]  = useState(false)
  const [toolkitOpen,   setToolkitOpen]   = useState(false)
  const [mobileToolkit, setMobileToolkit] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const toolkitRef  = useRef<HTMLLIElement>(null)  // ← Fix: li element = HTMLLIElement
  const { user, signOut } = useAuth()

  const isAdmin = user?.email === ADMIN_EMAIL
  const avatar  = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'U')}&background=7a6028&color=fff`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false)
      if (toolkitRef.current && !toolkitRef.current.contains(e.target as Node))
        setToolkitOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const closeMenu = () => { setMenuOpen(false); setMobileToolkit(false) }

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000]
        flex items-center justify-between
        transition-all duration-300 px-5 md:px-16
        ${scrolled || menuOpen
          ? 'bg-bg-primary/[0.98] backdrop-blur-xl border-b border-gold/10 py-3.5'
          : 'bg-transparent py-5'}`}>

        {/* Logo */}
        <Link href="/" onClick={closeMenu}
          className="font-cormorant text-2xl font-semibold tracking-wide text-white
            hover:text-white/90 transition-colors duration-200 flex-shrink-0">
          CodeaPlus<span className="text-gold">.</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-6 lg:gap-8 list-none items-center">

          {NAV_LINKS.map(({ label, href, highlight }) => (
            <li key={label}>
              {highlight ? (
                <Link href={href}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase
                    text-bg-primary bg-gold/90 hover:bg-gold
                    px-3.5 py-1.5 transition-all duration-200">
                  {label}
                </Link>
              ) : (
                <a href={href}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase
                    text-white/50 hover:text-gold transition-colors duration-300">
                  {label}
                </a>
              )}
            </li>
          ))}

          {/* Toolkit dropdown — ref HTMLLIElement */}
          <li className="relative" ref={toolkitRef}>
            <button
              onClick={() => setToolkitOpen(o => !o)}
              className={`flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em]
                uppercase transition-colors duration-300
                ${toolkitOpen ? 'text-gold' : 'text-white/50 hover:text-gold'}`}>
              Toolkit
              <span className={`text-[8px] transition-transform duration-200
                ${toolkitOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {toolkitOpen && (
              <div className="absolute top-full right-0 mt-3 w-[320px] z-50
                bg-bg-secondary border border-gold/15
                shadow-[0_16px_48px_rgba(0,0,0,0.6)] animate-fade-up overflow-hidden">

                <div className="px-4 py-3 border-b border-gold/[0.08]
                  flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/60">
                    Startup Toolkit
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.1em] uppercase
                    text-bg-primary bg-gold/80 px-2 py-0.5">
                    Free
                  </span>
                </div>

                {TOOLKIT_LINKS.map(({ label, href, icon, desc }) => (
                  <Link key={label} href={href}
                    onClick={() => setToolkitOpen(false)}
                    className="flex items-start gap-3 px-4 py-3.5
                      border-b border-gold/[0.06] last:border-b-0
                      hover:bg-white/[0.03] transition-colors duration-200 group">
                    <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.1em] uppercase
                        text-white/75 group-hover:text-gold transition-colors duration-200">
                        {label}
                      </div>
                      <div className="text-[11px] text-white/35 font-light mt-0.5">
                        {desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(o => !o)}
                className="w-9 h-9 rounded-full overflow-hidden
                  border border-white/20 hover:border-gold/40
                  transition-colors duration-200"
                aria-label="Account menu">
                <img src={avatar} alt="avatar" width={36} height={36}
                  className="w-full h-full object-cover" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-52 z-50
                  bg-surface border border-gold/10 rounded-lg overflow-hidden
                  shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-fade-up">
                  <div className="px-4 py-3 font-mono text-[10px] text-white/40
                    border-b border-white/[0.06] truncate tracking-[0.05em]">
                    {user.email}
                  </div>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-[13px]
                        text-white/70 hover:text-gold hover:bg-white/5 transition-colors">
                      ⚙ Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setDropdownOpen(false) }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5
                      text-[13px] text-white/70
                      hover:text-red-400 hover:bg-white/5 transition-colors">
                    ↩ Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <a href="#contact"
            className="relative overflow-hidden group
              font-mono text-[10px] tracking-[0.15em] uppercase
              text-bg-primary bg-gold px-6 py-3 inline-block">
            <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
              group-hover:scale-x-100 transition-transform duration-300" />
            <span className="relative z-10">Start Project</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}>
          <span className={`absolute block w-6 h-[1.5px] bg-gold transition-all duration-300
            ${menuOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
          <span className={`absolute block w-6 h-[1.5px] bg-gold transition-all duration-300
            ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
          <span className={`absolute block w-6 h-[1.5px] bg-gold transition-all duration-300
            ${menuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-bg-primary
          flex flex-col pt-24 px-8 pb-10 md:hidden overflow-y-auto
          animate-fade-up">

          <div className="flex flex-col gap-1 mb-10">
            {NAV_LINKS.map(({ label, href, highlight }, i) => (
              highlight ? (
                <Link key={label} href={href} onClick={closeMenu}
                  className={`opacity-0 animate-fade-up ${MOBILE_DELAYS[i]}
                    inline-flex items-center gap-3
                    font-cormorant text-[38px] sm:text-[44px] font-light
                    text-gold py-1.5 border-b border-gold/[0.06]`}>
                  {label}
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase
                    text-bg-primary bg-gold px-2 py-0.5 self-center">
                    Free
                  </span>
                </Link>
              ) : (
                <a key={label} href={href} onClick={closeMenu}
                  className={`opacity-0 animate-fade-up ${MOBILE_DELAYS[i]}
                    font-cormorant text-[38px] sm:text-[44px] font-light
                    text-white/70 hover:text-gold transition-colors
                    py-1.5 border-b border-gold/[0.06]`}>
                  {label}
                </a>
              )
            ))}

            {/* Toolkit accordion */}
            <div className={`opacity-0 animate-fade-up ${MOBILE_DELAYS[5]}
              border-b border-gold/[0.06]`}>
              <button
                onClick={() => setMobileToolkit(o => !o)}
                className="w-full flex items-center justify-between
                  font-cormorant text-[38px] sm:text-[44px] font-light
                  text-white/70 hover:text-gold transition-colors py-1.5">
                <span>Toolkit</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase
                    text-bg-primary bg-gold/80 px-2 py-0.5">
                    Free
                  </span>
                  <span className={`text-gold text-[18px] transition-transform duration-200
                    ${mobileToolkit ? 'rotate-45' : ''}`}>+</span>
                </div>
              </button>

              {mobileToolkit && (
                <div className="flex flex-col mb-3 pl-4 border-l-2 border-gold/20">
                  {TOOLKIT_LINKS.map(({ label, href, icon }) => (
                    <Link key={label} href={href} onClick={closeMenu}
                      className="flex items-center gap-3 py-2.5
                        font-mono text-[11px] tracking-[0.15em] uppercase
                        text-white/50 hover:text-gold transition-colors duration-200">
                      <span className="text-base">{icon}</span>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {user && (
              <div className="flex items-center gap-3 p-3
                border border-gold/10 bg-white/[0.02] rounded-lg mb-1">
                <img src={avatar} alt="avatar" width={40} height={40}
                  className="w-10 h-10 rounded-full border border-white/20" />
                <div className="min-w-0">
                  <div className="text-white/70 text-sm truncate">{user.email}</div>
                  {isAdmin && (
                    <div className="font-mono text-[9px] text-gold tracking-[0.1em] uppercase mt-0.5">
                      Admin
                    </div>
                  )}
                </div>
              </div>
            )}

            {isAdmin && (
              <Link href="/admin" onClick={closeMenu}
                className="font-mono text-[11px] tracking-[0.15em] uppercase
                  text-white/50 hover:text-gold border border-gold/10
                  px-5 py-3.5 text-center transition-colors duration-200">
                ⚙ Admin Dashboard
              </Link>
            )}

            <a href="#contact" onClick={closeMenu}
              className="font-mono text-[11px] tracking-[0.15em] uppercase
                text-bg-primary bg-gold px-6 py-4 text-center">
              Start Project →
            </a>

            {user && (
              <button onClick={() => { signOut(); closeMenu() }}
                className="font-mono text-[10px] tracking-[0.15em] uppercase
                  text-white/35 hover:text-red-400 border border-gold/10
                  px-5 py-3 transition-colors duration-200">
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}