import StartupLabPage from '@/components/toolkit/StartupLabPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Lab — CodeaPlus',
  description: 'Real startup platforms built by CodeaPlus. Problem, solution, tech stack, and results.',
}

export default function Page() {
  return <StartupLabPage />
}