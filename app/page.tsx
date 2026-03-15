import { createClient } from '@supabase/supabase-js'
import Loader            from '@/components/Loader'
import Navbar            from '@/components/Navbar'
import Hero              from '@/components/Hero'
import ClientLogos       from '@/components/ClientLogos'
import ToolkitHighlight  from '@/components/ToolkitHighlight'
import Services          from '@/components/Services'
import CaseStudies       from '@/components/CaseStudies'
import Portfolio         from '@/components/Portfolio'
import ProcessSection    from '@/components/ProcessSection'
import Testimonials      from '@/components/Testimonials'
import Pricing           from '@/components/Pricing'
import AuditSection      from '@/components/AuditSection'
import Contact           from '@/components/Contact'
import Footer            from '@/components/Footer'
import About             from '@/components/About'
import ClientComponents  from '@/components/ClientComponents'

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
        {/* 1. Hero — First impression, strong CTA */}
        <Hero />

        {/* 2. Client Logos — Instant trust after hero */}
        <ClientLogos />
        <div className="gold-line" />

        {/* 3. Toolkit Highlight — Free value, lead capture */}
        <ToolkitHighlight />
        <div className="gold-line" />

        {/* 4. Services — What we build */}
        <Services />
        <div className="gold-line" />

        {/* 5. Case Studies — Proof */}
        <CaseStudies />
        <div className="gold-line" />

        {/* 6. Portfolio — Visual proof */}
        <Portfolio projects={projects} />
        <div className="gold-line" />

        {/* 7. About — Who we are */}
        <About />
        <div className="gold-line" />

        {/* 8. Process — How we work */}
        <ProcessSection />
        <div className="gold-line" />

        {/* 9. Testimonials — Social proof */}
        <Testimonials testimonials={testimonials} />
        <div className="gold-line" />

        {/* 10. Pricing — Anchor expectations */}
        <Pricing />
        <div className="gold-line" />

        {/* 11. Free Audit — Lead magnet */}
        <AuditSection />
        <div className="gold-line" />

        {/* 12. Contact — Final CTA */}
        <Contact />
      </main>
      <Footer />
      <ClientComponents />
    </>
  )
}