import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'CodeaPlus terms of service — rules and guidelines for using our services.',
}

export default function TermsOfService() {
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
        <h1 className="font-cormorant text-[52px] font-light mb-4">Terms of Service</h1>
        <p className="font-mono text-[11px] text-white/30 mb-16">Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="space-y-12 text-[15px] font-light leading-[1.9] text-white/70">

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using CodeaPlus services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">2. Services</h2>
            <p>CodeaPlus provides web design and development services including but not limited to:</p>
            <ul className="list-none mt-4 space-y-2 pl-4 border-l border-gold/20">
              <li>Website design and development</li>
              <li>Full-stack web application development (MERN / Next.js)</li>
              <li>E-commerce solutions</li>
              <li>Website maintenance and support</li>
              <li>API development and integration</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">3. Project Terms & Payment</h2>
            <ul className="list-none mt-4 space-y-2 pl-4 border-l border-gold/20">
              <li>50% advance payment required before project commencement</li>
              <li>Remaining 50% due upon project completion before final delivery</li>
              <li>Timelines agreed upon in the project proposal are estimates and may vary</li>
              <li>Additional features beyond agreed scope will be quoted separately</li>
              <li>Prices are in Indian Rupees (INR) and exclusive of GST unless stated</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">4. Intellectual Property</h2>
            <p>Upon full payment, the client owns all rights to the final deliverables. CodeaPlus retains the right to showcase the project in our portfolio unless otherwise agreed in writing. All third-party libraries and frameworks remain under their respective licenses.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">5. Refund Policy</h2>
            <ul className="list-none mt-4 space-y-2 pl-4 border-l border-gold/20">
              <li>Advance payments are non-refundable once work has commenced</li>
              <li>If we are unable to deliver due to our fault, a full refund will be issued</li>
              <li>Disputes must be raised within 7 days of final delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">6. Client Responsibilities</h2>
            <p>The client agrees to provide all necessary content, assets, and feedback in a timely manner. Delays caused by the client may result in revised timelines and additional charges.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">7. Limitation of Liability</h2>
            <p>CodeaPlus shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in dispute.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">8. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-[28px] text-white mb-4">9. Contact</h2>
            <p>For any questions regarding these terms, contact us at <a href="mailto:hello@codeaplus.com" className="text-gold hover:underline">hello@codeaplus.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}