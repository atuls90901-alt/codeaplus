import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | CodeaPlus',
  description: 'CodeaPlus privacy policy — how we collect, use and protect your data.',
}

const sections = [
  {
    num: '01', title: 'Information We Collect',
    content: 'When you use CodeaPlus ("we", "our", "us"), we may collect the following information:',
    list: [
      'Name and email address when you contact us or sign up',
      'Project details you share through our contact form or chatbot',
      'Usage data such as pages visited and time spent on site',
      'Google account information if you sign in via Google OAuth',
    ],
  },
  {
    num: '02', title: 'How We Use Your Information',
    content: 'We use the information collected to:',
    list: [
      'Respond to your project inquiries and provide our services',
      'Improve our website and user experience',
      'Send project updates and relevant communications (with your consent)',
      'Maintain security and prevent fraud',
    ],
  },
  {
    num: '03', title: 'Data Storage & Security',
    content: 'Your data is securely stored on Supabase servers with industry-standard encryption. We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law.',
  },
  {
    num: '04', title: 'Cookies',
    content: 'We use essential cookies to maintain your authentication session. We do not use tracking or advertising cookies. You may disable cookies in your browser, though some features may not function correctly.',
  },
  {
    num: '05', title: 'Third-Party Services',
    content: 'We use the following third-party services which have their own privacy policies:',
    list: [
      'Supabase — Database & Authentication',
      'Google OAuth — Sign-in service',
      'Vercel — Website hosting',
      'OpenRouter — AI chatbot responses',
    ],
  },
  {
    num: '06', title: 'Your Rights',
    content: null,
    custom: (
      <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at{' '}
        <a href="mailto:codeaplussupport@gmail.com" className="text-gold hover:underline transition-all">
          codeaplussupport@gmail.com
        </a>.
      </p>
    ),
  },
  {
    num: '07', title: 'Contact',
    content: null,
    custom: (
      <p>For any privacy-related questions, please contact us at{' '}
        <a href="mailto:codeaplussupport@gmail.com" className="text-gold hover:underline transition-all">
          codeaplussupport@gmail.com
        </a>.
      </p>
    ),
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg-primary text-[#f0ece4]">

      {/* Header */}
      <div className="border-b border-gold/10 px-6 md:px-16 py-5 flex justify-between items-center sticky top-0 bg-bg-primary/95 backdrop-blur-xl z-50">
        <Link href="/" className="font-cormorant text-xl md:text-2xl font-light tracking-widest">
          CodeaPlus<span className="text-gold">.</span>
        </Link>
        <Link href="/"
          className="font-mono text-[9px] md:text-[10px] tracking-[.2em] uppercase text-white/40 hover:text-gold transition-colors flex items-center gap-2">
          ← Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-14 md:py-20">

        {/* Page heading */}
        <div className="mb-12 md:mb-16">
          <div className="font-mono text-[9px] tracking-[.3em] uppercase text-gold mb-4">Legal</div>
          <h1 className="font-cormorant text-[40px] md:text-[52px] font-light leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-[10px] text-white/30 tracking-[.1em]">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Gold divider */}
        <div className="h-px w-full mb-12 md:mb-16"
          style={{ background: 'linear-gradient(90deg,#C9A84C,transparent)' }} />

        {/* Sections */}
        <div className="space-y-10 md:space-y-14">
          {sections.map((s) => (
            <section key={s.num} className="group">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-mono text-[9px] text-gold/40 tracking-[.1em] flex-shrink-0">{s.num}</span>
                <h2 className="font-cormorant text-[22px] md:text-[28px] text-white font-light leading-tight">
                  {s.title}
                </h2>
              </div>

              <div className="pl-0 md:pl-8 text-[14px] md:text-[15px] font-light leading-[1.9] text-white/65 space-y-4">
                {s.content && <p>{s.content}</p>}

                {s.list && (
                  <ul className="space-y-2.5 pl-4 border-l border-gold/20 mt-3">
                    {s.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-gold/40 mt-1.5 text-[8px] flex-shrink-0">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.custom && s.custom}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25">
            © {new Date().getFullYear()} CodeaPlus. All rights reserved.
          </p>
          <Link href="/terms"
            className="font-mono text-[9px] tracking-[.15em] uppercase text-white/25 hover:text-gold transition-colors">
            Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  )
}