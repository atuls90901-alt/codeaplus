import StartupCostPage from '@/components/toolkit/StartupCostPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Cost Calculator — CodeaPlus',
  description: 'Calculate the exact cost to build your startup MVP, marketplace, or SaaS product.',
}

export default function Page() {
  return <StartupCostPage />
}