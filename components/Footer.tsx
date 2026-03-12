import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gold/10 px-16 py-10">
      <div className="flex justify-between items-center flex-wrap gap-6">
        <div className="font-cormorant text-[22px] font-semibold tracking-wide">
          CodeaPlus<span className="text-gold">.</span>
        </div>
        <div className="font-mono text-[9px] tracking-[.2em] uppercase text-white/30">
          © {new Date().getFullYear()} CodeaPlus. All rights reserved.
        </div>
        <div className="flex gap-7 flex-wrap">
          {['LinkedIn','Fiverr','GitHub','Instagram'].map(link => (
            <a key={link} href="#" className="font-mono text-[9px] tracking-[.18em] uppercase text-white/40 hover:text-gold transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
      {/* Legal links */}
      <div className="mt-6 pt-6 border-t border-gold/5 flex justify-center gap-8">
        <Link href="/privacy" className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25 hover:text-gold transition-colors">
          Privacy Policy
        </Link>
        <span className="text-white/10 font-mono text-[9px]">·</span>
        <Link href="/terms" className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25 hover:text-gold transition-colors">
          Terms of Service
        </Link>
      </div>
    </footer>
  )
}