import StarterKitsPage from '@/components/toolkit/StarterKitsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Starter Kits — CodeaPlus',
  description: 'Pre-scoped startup kits for SaaS MVPs, marketplaces, platforms, and e-commerce.',
}

export default function Page() {
  return <StarterKitsPage />
}