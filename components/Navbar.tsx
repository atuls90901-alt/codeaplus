'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import LoginModal from './LoginModal'

export default function Navbar() {

const [scrolled, setScrolled] = useState(false)
const [showModal, setShowModal] = useState(false)
const [menuOpen, setMenuOpen] = useState(false)
const [dropdownOpen, setDropdownOpen] = useState(false)

const { user, signOut } = useAuth()

const ADMIN_EMAIL = "[itsatul45@gmail.com](mailto:itsatul45@gmail.com)"

useEffect(() => {


const onScroll = () => setScrolled(window.scrollY > 60)

window.addEventListener('scroll', onScroll)

return () => window.removeEventListener('scroll', onScroll)


}, [])

useEffect(() => {


document.body.style.overflow = menuOpen ? 'hidden' : ''

return () => { document.body.style.overflow = '' }


}, [menuOpen])

const closeMenu = () => setMenuOpen(false)

const avatar =
user?.user_metadata?.avatar_url ||
`https://ui-avatars.com/api/?name=${user?.email}`

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

    <ul className="hidden md:flex gap-11 list-none">
      {['Services','Work','About','Pricing'].map(item => (
        <li key={item}>
          <a
            href={`#${item.toLowerCase()}`}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-gold transition-colors duration-300"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>

    {/* DESKTOP RIGHT */}
    <div className="hidden md:flex items-center gap-3">

      {user ? (

        <div className="flex items-center gap-3 relative">

          <img
            src={avatar}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full cursor-pointer border border-white/20"
          />

          {dropdownOpen && (

            <div className="absolute right-0 top-12 w-44 bg-[#111] border border-gold/10 rounded-lg overflow-hidden shadow-lg">

              <div className="px-4 py-3 text-xs text-white/50 border-b border-white/10">
                {user.email}
              </div>

              

              {user.email === ADMIN_EMAIL && (
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-sm hover:bg-white/5"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={signOut}
                className="w-full text-left px-4 py-2 text-sm hover:bg-white/5"
              >
                Logout
              </button>

            </div>

          )}

          <a
            href="#contact"
            className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-3"
          >
            Start Project
          </a>

        </div>

      ) : (

        <div className="flex items-center gap-3">

          <button
            onClick={() => setShowModal(true)}
            className="font-mono text-[10px] tracking-[.15em] uppercase text-white/50 hover:text-gold border border-gold/10 px-5 py-3"
          >
            Sign In
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="font-mono text-[10px] tracking-[.15em] uppercase text-[#060606] bg-gold px-6 py-3"
          >
            Start Project
          </button>

        </div>

      )}

    </div>

    {/* MOBILE HAMBURGER */}
    <button
      onClick={() => setMenuOpen(o => !o)}
      className="md:hidden relative w-10 h-10 flex items-center justify-center"
    >
      <span className="absolute block w-6 h-[1.5px] bg-gold transition-all"
        style={{
          transform: menuOpen ? 'rotate(45deg)' : 'translateY(-5px)'
        }}
      />
      <span className="absolute block w-6 h-[1.5px] bg-gold transition-all"
        style={{
          opacity: menuOpen ? 0 : 1
        }}
      />
      <span className="absolute block w-6 h-[1.5px] bg-gold transition-all"
        style={{
          transform: menuOpen ? 'rotate(-45deg)' : 'translateY(5px)'
        }}
      />
    </button>

  </nav>

  {/* MOBILE MENU */}
  {menuOpen && (

    <div className="fixed inset-0 z-[999] bg-[#060606] flex flex-col pt-24 px-8 md:hidden">

      {['Services','Work','About','Pricing'].map(item => (

        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          onClick={closeMenu}
          className="font-cormorant text-[40px] font-light text-white/70 py-2"
        >
          {item}
        </a>

      ))}

      <div className="mt-10 flex flex-col gap-3">

        {user ? (

          <>
            <div className="flex items-center gap-3 mb-2">
              <img src={avatar} className="w-10 h-10 rounded-full"/>
              <span className="text-white/60 text-sm">{user.email}</span>
            </div>

            <button
              onClick={() => { signOut(); closeMenu() }}
              className="border border-gold/10 px-5 py-3 text-white/50"
            >
              Sign Out
            </button>
          </>

        ) : (

          <>
            <button
              onClick={() => { setShowModal(true); closeMenu() }}
              className="border border-gold/10 px-5 py-4 text-white/60"
            >
              Sign In
            </button>

            <button
              onClick={() => { setShowModal(true); closeMenu() }}
              className="bg-gold text-black px-6 py-4"
            >
              Start Project
            </button>
          </>

        )}

      </div>

    </div>

  )}

  {showModal && (

    <LoginModal
      onClose={() => setShowModal(false)}
      onSuccess={() => setShowModal(false)}
    />

  )}

</>


)
}
