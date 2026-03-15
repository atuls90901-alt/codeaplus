import AIProjectPlannerPage from '@/components/toolkit/AIProjectPlannerPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Project Planner — CodeaPlus',
  description: 'Turn your startup idea into a complete technical project plan. Get recommended features, tech stack, timeline, and cost estimate — free.',
  openGraph: {
    title: 'Free AI Project Planner — CodeaPlus',
    description: 'Free startup project planner. Get tech stack, timeline, and cost estimate instantly.',
  },
}

export default function Page() {
  return <AIProjectPlannerPage />
}