import ScopeBuilderPage from '@/components/toolkit/ScopeBuilderPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Scope Builder — CodeaPlus',
  description: 'Build your project scope in 4 steps. Get cost range, timeline, and tech stack instantly.',
}

export default function Page() {
  return <ScopeBuilderPage />
}