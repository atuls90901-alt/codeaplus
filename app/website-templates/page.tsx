import WebsiteTemplatesPage from '@/components/toolkit/WebsiteTemplatesPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Templates — CodeaPlus',
  description: 'Premium Next.js website templates for startups, agencies, and founders.',
}

export default function Page() {
  return <WebsiteTemplatesPage />
}