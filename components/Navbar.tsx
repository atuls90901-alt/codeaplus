'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import LoginModal from './LoginModal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const ADMIN_EMAIL = "itsatul45@gmail.com"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400"
        style={{
          padding: scrolled ? '14px 24px' : '20px 24px',
          background: scrolled || menuOpen ? 'rgba(6,6,6,0.98)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
        }}
      >
        <Link href="/" className="font-cormorant text-2xl font-semibold tracking-wide text-white">
          CodeaPlus<span className="text-gold">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-11 list-none">
          {['Services', 'Work', 'About', 'Pricing'].map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-gold transition-colors duration-300">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-cormorant text-sm font-semibold text-[#060606]"
                style={{ background: 'linear-gradient(135deg,#7a6028,#C9A84C)' }}>
                {user.email?.[0].toUpperCase()}
              </div>
              {user.email === ADMIN_EMAIL && (
                <Link href="/admin"
                  className="font-mono text-[10px] tracking-[.15em] uppercase text-white/50 hover:text-gold transition-colors border border-gold/10 px-5 py-3">
                  Dashboard
                </Link>
              )}
              <a href="#contact"
                className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-3 relative overflow-hidden group">
                <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">Start Project</span>
              </a>
              <button onClick={signOut}
                className="font-mono text-[9px] tracking-[.15em] uppercase text-white/30 hover:text-white/70 transition-colors border border-gold/10 px-3 py-3">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => setShowModal(true)}
                className="font-mono text-[10px] tracking-[.15em] uppercase text-white/50 hover:text-gold transition-colors border border-gold/10 px-5 py-3">
                Sign In
              </button>
              <button onClick={() => setShowModal(true)}
                className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-3 relative overflow-hidden group">
                <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <span className="relative z-10">Start Project</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger — FIXED */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Menu"
        >
          <span
            className="absolute block w-6 h-[1.5px] bg-gold transition-all duration-300 ease-in-out"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(0px)' : 'translateY(-5px)',
            }}
          />
          <span
            className="absolute block w-6 h-[1.5px] bg-gold transition-all duration-300 ease-in-out"
            style={{
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'scaleX(0)' : 'scaleX(1)',
            }}
          />
          <span
            className="absolute block w-6 h-[1.5px] bg-gold transition-all duration-300 ease-in-out"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(0px)' : 'translateY(5px)',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-[999] flex flex-col pt-20 px-8 pb-10 md:hidden"
        style={{
          background: 'rgba(6,6,6,0.99)',
          backdropFilter: 'blur(16px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        <ul className="flex flex-col gap-2 mb-10">
          {['Services', 'Work', 'About', 'Pricing'].map((item, i) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="block font-cormorant text-[40px] font-light text-white/70 hover:text-gold transition-colors py-2"
                style={{
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: menuOpen ? 1 : 0,
                  transition: `all 0.3s ease ${i * 0.07 + 0.1}s`,
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="border-t border-gold/10 pt-8 flex flex-col gap-3"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.3s ease 0.35s',
          }}
        >
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-cormorant text-base font-semibold text-[#060606]"
                  style={{ background: 'linear-gradient(135deg,#7a6028,#C9A84C)' }}>
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="font-mono text-[11px] text-white/50 truncate">{user.email}</span>
              </div>
              {user.email === ADMIN_EMAIL && (
                <Link href="/admin" onClick={closeMenu}
                  className="font-mono text-[11px] tracking-[.15em] uppercase text-white/50 border border-gold/10 px-5 py-3 text-center">
                  Dashboard
                </Link>
              )}
              <a href="#contact" onClick={closeMenu}
                className="font-mono text-[11px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-4 text-center">
                Start Project
              </a>
              <button onClick={() => { signOut(); closeMenu() }}
                className="font-mono text-[10px] tracking-[.15em] uppercase text-white/30 border border-gold/10 px-5 py-3">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { setShowModal(true); closeMenu() }}
                className="font-mono text-[11px] tracking-[.15em] uppercase text-white/50 border border-gold/10 px-5 py-4">
                Sign In
              </button>
              <button onClick={() => { setShowModal(true); closeMenu() }}
                className="font-mono text-[11px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-4">
                Start Project
              </button>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false)
            setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300)
          }}
        />
      )}
    </>
  )
}