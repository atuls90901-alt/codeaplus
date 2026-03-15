'use client'
import dynamic from 'next/dynamic'

const Chatbot        = dynamic(() => import('@/components/Chatbot'),        { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })
const ExitPopup      = dynamic(() => import('@/components/ExitPopup'),      { ssr: false })

export default function ClientComponents() {
  return (
    <>
      <Chatbot />
      <WhatsAppButton />
      <ExitPopup />
    </>
  )
}