import { supabase } from '@/lib/supabase'
import { Project, Testimonial } from '@/types'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ClientLogos from '@/components/ClientLogos'
import CaseStudies from '@/components/CaseStudies'
import dynamic from 'next/dynamic'
const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })
const ExitPopup = dynamic(() => import('@/components/ExitPopup'), { ssr: false })

export const revalidate = 0

async function getProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
  return data || []
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  return data || []
}

export default async function Home() {
  const [projects, testimonials] = await Promise.all([
    getProjects(),
    getTestimonials(),
  ])

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
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <WhatsAppButton />
      <ExitPopup />
    </>
  )
}