// app/projects/page.tsx
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectsGrid from '@/components/ProjectsGrid'

export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'placeholder',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)

export const metadata = {
  title: 'Our Projects | CodeaPlus',
  description: 'Explore all projects built by CodeaPlus.',
}

const stats = (count: number) => [
  { num: count || '—', label: 'Projects Delivered' },
  { num: '100%',       label: 'Client Satisfaction' },
  { num: '3+',         label: 'Years Experience' },
]

export default async function ProjectsPage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const list = projects || []

  return (
    <>
      <Navbar />

      <main className="bg-bg-primary min-h-screen">

        {/* ── Hero ── */}
        <section className="pt-32 md:pt-36 pb-12 md:pb-16 px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto">

          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold block mb-4">
            Our Work
          </span>

          <h1 className="font-cormorant font-light text-[clamp(52px,9vw,100px)] leading-none text-white mb-5">
            All <em className="text-gold italic">Projects</em>
          </h1>

          <p className="font-outfit text-[14px] md:text-[15px] text-white/38 max-w-[460px] leading-[1.75] mb-10 md:mb-14">
            Every project tells a story of growth. Here's the complete collection of what we've built.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-7 md:gap-14 pt-8 md:pt-10 border-t border-gold/10">
            {stats(list.length).map(s => (
              <div key={s.label} className="flex-1 basis-[30%] min-w-[80px]">
                <div className="font-cormorant text-[38px] md:text-[52px] font-semibold text-gold leading-none">
                  {s.num}
                </div>
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/28 mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gold/[0.07] mx-4 sm:mx-8 md:mx-16" />

        {/* ── Projects Grid ── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 pt-14 md:pt-20 pb-16 md:pb-24">
          <ProjectsGrid projects={list} />
        </div>

        {/* ── CTA ── */}
        <section className="border-t border-gold/[0.07] px-4 sm:px-8 md:px-16 py-16 md:py-24 flex flex-col items-center text-center">

          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold block mb-5">
            Ready to Build?
          </span>

          <h2 className="font-cormorant font-light text-[clamp(36px,5vw,76px)] text-white leading-tight mb-10">
            Your project could be <em className="text-gold italic">next.</em>
          </h2>

          <Link href="/#contact"
            className="relative overflow-hidden group inline-flex items-center justify-center font-mono text-[10px] tracking-[0.22em] uppercase text-bg-primary bg-gold px-10 md:px-14 py-4 w-full sm:w-auto max-w-[320px] hover:opacity-90 transition-all hover:-translate-y-0.5">
            <span className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10">Start a Project →</span>
          </Link>

        </section>

      </main>

      <Footer />
    </>
  )
}