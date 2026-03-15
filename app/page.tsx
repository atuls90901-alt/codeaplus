import { createClient } from '@supabase/supabase-js'
import Loader           from '@/components/Loader'
import Navbar           from '@/components/Navbar'
import Hero             from '@/components/Hero'
import Services         from '@/components/Services'
import Portfolio        from '@/components/Portfolio'
import About            from '@/components/About'
import Testimonials     from '@/components/Testimonials'
import Pricing          from '@/components/Pricing'
import Contact          from '@/components/Contact'
import Footer           from '@/components/Footer'
import ClientLogos      from '@/components/ClientLogos'
import CaseStudies      from '@/components/CaseStudies'
import AuditSection     from '@/components/AuditSection'
import ClientComponents from '@/components/ClientComponents'

export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL      || 'placeholder',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)

export default async function Home() {
  const { data: projectsData,     error: pErr } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: testimonialsData, error: tErr } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (pErr) console.error('Projects fetch error:',     pErr.message)
  if (tErr) console.error('Testimonials fetch error:', tErr.message)

  const projects     = projectsData     || []
  const testimonials = testimonialsData || []

  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <div className="gold-line" />
        <Services />
        <div className="gold-line" />
        <CaseStudies />
        <div className="gold-line" />
        <Portfolio projects={projects} />
        <div className="gold-line" />
        <About />
        <div className="gold-line" />
        <Testimonials testimonials={testimonials} />
        <div className="gold-line" />
        <Pricing />
        <div className="gold-line" />
        <AuditSection />
        <div className="gold-line" />
        <Contact />
      </main>
      <Footer />
      {/* Chatbot, WhatsApp, ExitPopup — client only */}
      <ClientComponents />
    </>
  )
}