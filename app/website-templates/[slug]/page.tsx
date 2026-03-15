// app/website-templates/[slug]/page.tsx
import { TEMPLATES, getTemplate } from '@/lib/templates'
import TemplateDetailPage from '@/components/toolkit/TemplateDetailPage'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return TEMPLATES.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const t = getTemplate(slug)
  return {
    title:       t ? `${t.name} Template — CodeaPlus` : 'Template — CodeaPlus',
    description: t?.description ?? 'Premium website template by CodeaPlus.',
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) notFound()
  return <TemplateDetailPage template={template} />
}