import Link from 'next/link'

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: '#' },
  { label: 'Fiverr',    href: '#' },
  { label: 'GitHub',    href: '#' },
  { label: 'Instagram', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-gold/10 px-6 md:px-16 py-10">

      {/* Main row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5 text-center sm:text-left flex-wrap">

        {/* Logo */}
        <div className="font-cormorant text-[22px] font-semibold tracking-wide">
          CodeaPlus<span className="text-gold">.</span>
        </div>

        {/* Copyright */}
        <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30 order-last sm:order-none">
          © {new Date().getFullYear()} CodeaPlus. All rights reserved.
        </div>

        {/* Social links */}
        <div className="flex gap-5 flex-wrap justify-center">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a key={label} href={href}
              className="font-mono text-[9px] tracking-[.18em] uppercase text-white/40 hover:text-gold transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Legal row */}
      <div className="mt-6 pt-6 border-t border-gold/[0.05] flex justify-center items-center gap-6 md:gap-8 flex-wrap">
        <Link href="/privacy"
          className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25 hover:text-gold transition-colors duration-200">
          Privacy Policy
        </Link>
        <span className="text-white/10 font-mono text-[9px]">·</span>
        <Link href="/terms"
          className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25 hover:text-gold transition-colors duration-200">
          Terms of Service
        </Link>
      </div>

    </footer>
  )
}