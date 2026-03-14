'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import LoginModal from './LoginModal'

const NAV_LINKS = ['Services', 'Work', 'About', 'Pricing']
const ADMIN_EMAIL = 'itsatul45@gmail.com'

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [showModal,    setShowModal]     = useState(false)
  const [menuOpen,     setMenuOpen]      = useState(false)
  const [dropdownOpen, setDropdownOpen]  = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, signOut } = useAuth()

  const avatar = user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'U')}&background=7a6028&color=fff`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close dropdown on outside click
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
      <nav className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-300
        ${scrolled || menuOpen
          ? 'bg-bg-primary/[0.98] backdrop-blur-xl border-b border-gold/10 py-3.5 px-5 md:px-16'
          : 'bg-transparent py-5 px-5 md:px-16'}`}>

        {/* Logo */}
        <Link href="/" onClick={closeMenu}
          className="font-cormorant text-2xl font-semibold tracking-wide text-white">
          CodeaPlus<span className="text-gold">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {NAV_LINKS.map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-gold transition-colors duration-300">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              {/* Avatar */}
              <button onClick={() => setDropdownOpen(o => !o)}
                className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20 hover:border-gold/40 transition-colors">
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-surface border border-gold/10 rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                  animate-fade-up z-50">
                  <div className="px-4 py-3 font-mono text-[10px] text-white/40 border-b border-white/[0.06] truncate tracking-[.05em]">
                    {user.email}
                  </div>
                  {user.email === ADMIN_EMAIL && (
                    <Link href="/admin" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-white/70 hover:text-gold hover:bg-white/5 transition-colors">
                      ⚙ Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setDropdownOpen(false) }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-[13px] text-white/70 hover:text-red-400 hover:bg-white/5 transition-colors">
                    ↩ Sign Out
                  </button>
                </div>
              )}

              {/* CTA */}
              <a href="#contact"
                className="relative overflow-hidden group font-mono text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold px-6 py-3 inline-block">
                <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">Start Project</span>
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => setShowModal(true)}
                className="font-mono text-[10px] tracking-[.15em] uppercase text-white/50 hover:text-gold border border-gold/10 hover:border-gold/30 px-5 py-3 transition-colors">
                Sign In
              </button>
              <button onClick={() => setShowModal(true)}
                className="relative overflow-hidden group font-mono text-[10px] tracking-[.15em] uppercase text-bg-primary bg-gold px-6 py-3">
                <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">Start Project</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu">
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
        <div className="fixed inset-0 z-[999] bg-bg-primary flex flex-col pt-24 px-8 pb-10 md:hidden overflow-y-auto
          animate-fade-up">

          {/* Nav links */}
          <div className="flex flex-col gap-1 mb-10">
            {NAV_LINKS.map((item, i) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}
                className="font-cormorant text-[38px] sm:text-[44px] font-light text-white/70 hover:text-gold transition-colors py-1.5 border-b border-gold/[0.06]"
                style={{ animationDelay: `${i * 0.05}s` }}>
                {item}
              </a>
            ))}
          </div>

          {/* Auth section */}
          <div className="mt-auto flex flex-col gap-3">
            {user ? (
              <>
                {/* User info */}
                <div className="flex items-center gap-3 p-3 border border-gold/10 bg-white/[0.02] rounded-lg mb-1">
                  <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full border border-white/20" />
                  <div className="min-w-0">
                    <div className="text-white/70 text-sm truncate">{user.email}</div>
                    {user.email === ADMIN_EMAIL && (
                      <div className="font-mono text-[9px] text-gold tracking-[.1em] uppercase mt-0.5">Admin</div>
                    )}
                  </div>
                </div>

                {user.email === ADMIN_EMAIL && (
                  <Link href="/admin" onClick={closeMenu}
                    className="font-mono text-[11px] tracking-[.15em] uppercase text-white/50 hover:text-gold border border-gold/10 px-5 py-3.5 text-center transition-colors">
                    ⚙ Admin Dashboard
                  </Link>
                )}

                <a href="#contact" onClick={closeMenu}
                  className="font-mono text-[11px] tracking-[.15em] uppercase text-bg-primary bg-gold px-6 py-4 text-center">
                  Start Project
                </a>

                <button onClick={() => { signOut(); closeMenu() }}
                  className="font-mono text-[10px] tracking-[.15em] uppercase text-white/35 hover:text-red-400 border border-gold/10 px-5 py-3 transition-colors">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setShowModal(true); closeMenu() }}
                  className="font-mono text-[11px] tracking-[.15em] uppercase text-white/60 border border-gold/10 px-5 py-4">
                  Sign In
                </button>
                <button onClick={() => { setShowModal(true); closeMenu() }}
                  className="font-mono text-[11px] tracking-[.15em] uppercase text-bg-primary bg-gold px-6 py-4">
                  Start Project
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <LoginModal onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />
      )}
    </>
  )
}