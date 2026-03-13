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

export default async function ProjectsPage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  const list = projects || []

  return (
    <>
      <Navbar />

      <main style={{ background: '#060606', minHeight: '100vh' }}>

        {/* Hero */}
        <section className="ph-hero">
          <div className="ph-wrap">
            <span className="ph-eyebrow">Our Work</span>
            <h1 className="ph-title">
              All <em>Projects</em>
            </h1>
            <p className="ph-sub">
              Every project tells a story of growth. Here's the complete collection of what we've built.
            </p>
            <div className="ph-stats">
              {[
                { num: list.length || '—', label: 'Projects Delivered' },
                { num: '100%', label: 'Client Satisfaction' },
                { num: '3+', label: 'Years Experience' },
              ].map(s => (
                <div key={s.label} className="ph-stat">
                  <div className="ph-stat-num">{s.num}</div>
                  <div className="ph-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="ph-divider" />

        {/* Grid — client component for 3D */}
        <div className="ph-wrap" style={{ paddingTop: '72px', paddingBottom: '80px' }}>
          <ProjectsGrid projects={list} />
        </div>

        {/* CTA */}
        <section className="ph-cta">
          <span className="ph-eyebrow">Ready to Build?</span>
          <h2 className="ph-cta-title">
            Your project could be <em>next.</em>
          </h2>
          <Link href="/#contact" className="ph-cta-btn">Start a Project</Link>
        </section>

      </main>

      <Footer />

      <style>{`
        .ph-hero { padding-top: 140px; padding-bottom: 64px; }
        .ph-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 64px;
          padding-right: 64px;
        }
        .ph-eyebrow {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 16px;
        }
        .ph-title {
          font-family: var(--font-cormorant);
          font-size: clamp(52px, 9vw, 100px);
          font-weight: 300;
          color: #fff;
          line-height: 1;
          margin: 0 0 20px;
        }
        .ph-title em { color: #C9A84C; font-style: italic; }
        .ph-sub {
          font-family: var(--font-outfit);
          font-size: 15px;
          color: rgba(255,255,255,0.38);
          max-width: 460px;
          line-height: 1.75;
          margin: 0 0 52px;
        }
        .ph-stats {
          display: flex;
          gap: 56px;
          flex-wrap: wrap;
          padding-top: 40px;
          border-top: 1px solid rgba(201,168,76,0.1);
        }
        .ph-stat-num {
          font-family: var(--font-cormorant);
          font-size: 52px;
          font-weight: 600;
          color: #C9A84C;
          line-height: 1;
        }
        .ph-stat-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-top: 6px;
        }
        .ph-divider {
          border-top: 1px solid rgba(201,168,76,0.07);
          margin: 0 64px;
        }
        .ph-cta {
          padding: 100px 64px;
          text-align: center;
          border-top: 1px solid rgba(201,168,76,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ph-cta-title {
          font-family: var(--font-cormorant);
          font-size: clamp(36px, 5vw, 76px);
          font-weight: 300;
          color: #fff;
          margin: 0 0 40px;
        }
        .ph-cta-title em { color: #C9A84C; font-style: italic; }
        .ph-cta-btn {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #060606;
          background: #C9A84C;
          padding: 18px 52px;
          text-decoration: none;
          transition: opacity 0.3s, transform 0.3s;
        }
        .ph-cta-btn:hover { opacity: 0.85; transform: translateY(-2px); }

        /* TABLET */
        @media (max-width: 1024px) {
          .ph-wrap { padding-left: 32px; padding-right: 32px; }
          .ph-divider { margin: 0 32px; }
          .ph-cta { padding: 80px 32px; }
        }
        /* MOBILE */
        @media (max-width: 768px) {
          .ph-hero { padding-top: 100px; padding-bottom: 40px; }
          .ph-wrap { padding-left: 20px; padding-right: 20px; }
          .ph-title { font-size: clamp(44px, 12vw, 64px); }
          .ph-sub { font-size: 14px; margin-bottom: 36px; }
          .ph-stats { gap: 28px; padding-top: 28px; }
          .ph-stat-num { font-size: 38px; }
          .ph-divider { margin: 0 20px; }
          .ph-cta { padding: 60px 20px; }
          .ph-cta-btn { padding: 16px 36px; width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .ph-wrap { padding-left: 16px; padding-right: 16px; }
          .ph-stat { flex: 1 1 40%; }
        }
      `}</style>
    </>
  )
}