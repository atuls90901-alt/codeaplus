'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'About',    href: '#about'    },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'Audit',    href: '/audit',   highlight: true },
]

const ADMIN_EMAIL = 'itsatul45@gmail.com'

const MOBILE_DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:50ms]',
  '[animation-delay:100ms]',
  '[animation-delay:150ms]',
  '[animation-delay:200ms]',
] as const

export default function Navbar() {
  const [scrolled,     setScrolled]    = useState(false)
  const [menuOpen,     setMenuOpen]    = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
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
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const closeMenu = () => setMenuOpen(false)

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
            hover:text-white/90 transition-colors duration-200">
          CodeaPlus<span className="text-gold">.</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          {NAV_LINKS.map(({ label, href, highlight }) => (
            <li key={label}>
              {highlight ? (
                /* Audit — special gold pill style */
                <Link
                  href={href}
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
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">

          {/* Admin avatar dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="w-9 h-9 rounded-full overflow-hidden
                  border border-white/20 hover:border-gold/40
                  transition-colors duration-200"
                aria-label="Account menu"
              >
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
                      className="flex items-center gap-2 px-4 py-2.5
                        text-[13px] text-white/70
                        hover:text-gold hover:bg-white/5 transition-colors">
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

          {/* Start Project CTA */}
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
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`absolute block w-6 h-[1.5px] bg-gold
            transition-all duration-300
            ${menuOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
          <span className={`absolute block w-6 h-[1.5px] bg-gold
            transition-all duration-300
            ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
          <span className={`absolute block w-6 h-[1.5px] bg-gold
            transition-all duration-300
            ${menuOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-bg-primary
          flex flex-col pt-24 px-8 pb-10 md:hidden overflow-y-auto
          animate-fade-up">

          {/* Nav links */}
          <div className="flex flex-col gap-1 mb-10">
            {NAV_LINKS.map(({ label, href, highlight }, i) => (
              highlight ? (
                /* Audit link — gold highlight mobile */
                <Link
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className={`opacity-0 animate-fade-up ${MOBILE_DELAYS[i]}
                    inline-flex items-center gap-3
                    font-cormorant text-[38px] sm:text-[44px] font-light
                    text-gold transition-colors
                    py-1.5 border-b border-gold/[0.06]`}
                >
                  {label}
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase
                    text-bg-primary bg-gold px-2 py-0.5 self-center">
                    Free
                  </span>
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className={`opacity-0 animate-fade-up ${MOBILE_DELAYS[i]}
                    font-cormorant text-[38px] sm:text-[44px] font-light
                    text-white/70 hover:text-gold transition-colors
                    py-1.5 border-b border-gold/[0.06]`}
                >
                  {label}
                </a>
              )
            ))}
          </div>

          {/* Bottom actions */}
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
                  text-white/50 hover:text-gold
                  border border-gold/10 px-5 py-3.5 text-center
                  transition-colors duration-200">
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
                  text-white/35 hover:text-red-400
                  border border-gold/10 px-5 py-3
                  transition-colors duration-200">
                Sign Out
              </button>
            )}

          </div>
        </div>
      )}
    </>
  )
}