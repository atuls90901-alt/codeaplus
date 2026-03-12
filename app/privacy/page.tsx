import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'CodeaPlus privacy policy — how we collect, use and protect your data.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#060606] text-[#f0ece4]">
      {/* Header */}
      <div className="border-b border-gold/10 px-16 py-6 flex justify-between items-center">
        <Link href="/" className="font-cormorant text-2xl font-light tracking-widest">
          CodeaPlus<span className="text-gold">.</span>
        </Link>
        <Link href="/" className="font-mono text-[10px] tracking-[.2em] uppercase text-white/40 hover:text-gold transition-colors">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-20">
        <div className="font-mono text-[9px] tracking-[.3em] uppercase text-gold mb-4">Legal</div>
        <h1 className="font-cormorant text-[52px] font-light mb-4">Privacy Policy</h1>
        <p className="font-mono text-[11px] text-white/30 mb-16">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="space-y-12 text-[15px] font-light leading-[1.9] text-white/70">

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">1. Information We Collect</h2>
            <p>When you use CodeaPlus ("we", "our", "us"), we may collect the following information:</p>
            <ul className="list-none mt-4 space-y-2 pl-4 border-l border-gold/20">
              <li>Name and email address when you contact us or sign up</li>
              <li>Project details you share through our contact form or chatbot</li>
              <li>Usage data such as pages visited and time spent on site</li>
              <li>Google account information if you sign in via Google OAuth</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information collected to:</p>
            <ul className="list-none mt-4 space-y-2 pl-4 border-l border-gold/20">
              <li>Respond to your project inquiries and provide our services</li>
              <li>Improve our website and user experience</li>
              <li>Send project updates and relevant communications (with your consent)</li>
              <li>Maintain security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">3. Data Storage & Security</h2>
            <p>Your data is securely stored on Supabase servers with industry-standard encryption. We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">4. Cookies</h2>
            <p>We use essential cookies to maintain your authentication session. We do not use tracking or advertising cookies. You may disable cookies in your browser, though some features may not function correctly.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">5. Third-Party Services</h2>
            <p>We use the following third-party services which have their own privacy policies:</p>
            <ul className="list-none mt-4 space-y-2 pl-4 border-l border-gold/20">
              <li>Supabase — Database & Authentication</li>
              <li>Google OAuth — Sign-in service</li>
              <li>Vercel — Website hosting</li>
              <li>Google Gemini / OpenRouter — AI chatbot responses</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at <a href="mailto:hello@codeaplus.com" className="text-gold hover:underline">hello@codeaplus.com</a>.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">7. Contact</h2>
            <p>For any privacy-related questions, please contact us at <a href="mailto:hello@codeaplus.com" className="text-gold hover:underline">hello@codeaplus.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}