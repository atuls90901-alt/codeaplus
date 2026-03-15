import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Services',    href: '#services' },
  { label: 'Work',        href: '#work'     },
  { label: 'About',       href: '#about'    },
  { label: 'Pricing',     href: '#pricing'  },
  { label: 'Contact',     href: '#contact'  },
  { label: 'Free Audit',  href: '/audit',   highlight: true },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/codeaplus'  },
  { label: 'GitHub',    href: 'https://github.com/codeaplus'            },
  { label: 'Instagram', href: 'https://instagram.com/codeaplus'         },
  { label: 'Fiverr',    href: 'https://fiverr.com/codeaplus'            },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Terms of Service', href: '/terms'   },
]

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-gold/10">

      {/* ── Final CTA strip ── */}
      <div className="px-6 md:px-16 py-14 md:py-20 border-b border-gold/[0.08]
        flex flex-col md:flex-row items-center md:items-end
        justify-between gap-8 text-center md:text-left">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
            Ready to start?
          </p>
          <h3 className="font-cormorant font-light leading-[1.05]
            text-[clamp(28px,4vw,52px)]">
            Let's Build Something{' '}
            <em className="italic text-gold">Extraordinary.</em>
          </h3>
        </div>
        <a href="#contact"
          className="relative overflow-hidden group flex-shrink-0
            font-mono text-[10px] tracking-[0.2em] uppercase
            text-bg-primary bg-gold px-8 py-4 inline-block
            hover:-translate-y-0.5 transition-all duration-300">
          <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left
            group-hover:scale-x-100 transition-transform duration-300" />
          <span className="relative z-10">Start Your Project →</span>
        </a>
      </div>

      {/* ── Main footer row ── */}
      <div className="px-6 md:px-16 py-10
        grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">

        {/* Logo + tagline */}
        <div>
          <div className="font-cormorant text-[22px] font-semibold tracking-wide mb-2">
            CodeaPlus<span className="text-gold">.</span>
          </div>
          <p className="font-mono text-[9px] tracking-[0.12em] uppercase
            text-white/30 leading-relaxed">
            Premium Web Agency<br />
            India · Working Globally
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400
              shadow-[0_0_6px_rgba(74,222,128,0.5)] animate-blink-dot" />
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-white/30">
              Available for projects
            </span>
          </div>
        </div>

        {/* Nav links */}
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/60 mb-4">
            Navigate
          </div>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map(({ label, href, highlight }) => (
              <li key={label}>
                {highlight ? (
                  /* Free Audit — gold highlight */
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2
                      font-mono text-[9px] tracking-[0.15em] uppercase
                      text-gold hover:text-white transition-colors duration-200">
                    {label}
                    <span className="text-bg-primary bg-gold px-1.5 py-0.5
                      font-mono text-[8px] tracking-[0.1em]">
                      Free
                    </span>
                  </Link>
                ) : (
                  <a href={href}
                    className="font-mono text-[9px] tracking-[0.15em] uppercase
                      text-white/35 hover:text-gold transition-colors duration-200">
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Social + contact */}
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/60 mb-4">
            Connect
          </div>
          <ul className="flex flex-col gap-2.5 mb-6">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[9px] tracking-[0.15em] uppercase
                    text-white/35 hover:text-gold transition-colors duration-200">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="mailto:codeaplussupport@gmail.com"
            className="font-mono text-[9px] tracking-[0.08em]
              text-white/25 hover:text-gold transition-colors duration-200 break-all">
            codeaplussupport@gmail.com
          </a>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="px-6 md:px-16 py-5 border-t border-gold/[0.05]
        flex flex-col sm:flex-row justify-between items-center
        gap-4 text-center sm:text-left">
        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/20">
          © 2026 CodeaPlus · Built in India · Serving Globally
        </p>
        <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          {LEGAL_LINKS.map(({ label, href }, i) => (
            <span key={label} className="flex items-center gap-4 md:gap-6">
              <Link href={href}
                className="font-mono text-[9px] tracking-[0.15em] uppercase
                  text-white/25 hover:text-gold transition-colors duration-200">
                {label}
              </Link>
              {i < LEGAL_LINKS.length - 1 && (
                <span className="text-white/10 font-mono text-[9px]">·</span>
              )}
            </span>
          ))}
        </div>
      </div>

    </footer>
  )
}