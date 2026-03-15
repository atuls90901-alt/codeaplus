// lib/templates.ts

export interface Template {
  slug:        string
  name:        string
  tagline:     string
  category:    string
  icon:        string
  price:       number
  time:        string
  description: string
  features:    string[]
  stack:       string[]
  pages:       string[]
  color:       string
  preview:     string
  image:       string
  popular:     boolean
}

export const TEMPLATES: Template[] = [
  {
    slug:        'saas-landing',
    name:        'SaaS Landing Page',
    tagline:     'Convert visitors into trial signups',
    category:    'SaaS',
    icon:        '🚀',
    price:       1200,
    time:        '1–2 weeks',
    popular:     true,
    color:       'from-[#1a1a3e] to-[#0d0d1a]',
    preview:     'https://codeaplus.pro/templates/saas-landing',
    image:       'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    description: 'A high-converting SaaS landing page with hero, features, pricing, testimonials, and CTA sections. Built to turn visitors into trial users.',
    features:    ['Hero with animated gradient','Feature highlights','Pricing table (3 tiers)','Testimonials carousel','FAQ accordion','Newsletter signup','Mobile responsive','SEO optimised'],
    stack:       ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    pages:       ['Home', 'Pricing', 'Blog', 'Contact'],
  },
  {
    slug:        'marketplace',
    name:        'Marketplace Landing',
    tagline:     'Launch your two-sided marketplace',
    category:    'Marketplace',
    icon:        '🛒',
    price:       1500,
    time:        '2–3 weeks',
    popular:     false,
    color:       'from-[#1a2e1a] to-[#0d1a0d]',
    preview:     'https://codeaplus.pro/templates/marketplace',
    image:       'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Complete marketplace landing with buyer/seller value propositions, how it works, featured listings preview, and trust signals.',
    features:    ['Dual CTA (Buy & Sell)','How it works section','Featured listings preview','Category showcase','Trust & safety section','Stats counter','Mobile responsive','SEO optimised'],
    stack:       ['Next.js', 'Tailwind CSS', 'React'],
    pages:       ['Home', 'How It Works', 'Categories', 'Contact'],
  },
  {
    slug:        'agency-portfolio',
    name:        'Agency / Startup Portfolio',
    tagline:     'Premium portfolio for agencies & founders',
    category:    'Portfolio',
    icon:        '⚡',
    price:       1000,
    time:        '1–2 weeks',
    popular:     false,
    color:       'from-[#1a1208] to-[#0d0a04]',
    preview:     'https://codeaplus.pro/templates/agency-portfolio',
    image:       'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description: 'A premium dark-themed portfolio for web agencies and startup founders. Showcases work, services, team, and drives leads.',
    features:    ['Animated hero section','Services showcase','Portfolio/work grid','About & team section','Client testimonials','Contact form','Mobile responsive','Dark luxury theme'],
    stack:       ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    pages:       ['Home', 'Work', 'Services', 'About', 'Contact'],
  },
  {
    slug:        'ecommerce',
    name:        'E-Commerce Store',
    tagline:     'High-converting online store',
    category:    'E-Commerce',
    icon:        '🛍️',
    price:       1800,
    time:        '2–3 weeks',
    popular:     true,
    color:       'from-[#2e1a0a] to-[#1a0d05]',
    preview:     'https://codeaplus.pro/templates/ecommerce',
    image:       'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    description: 'Mobile-first e-commerce store with product listings, cart, checkout, and order tracking. Built for maximum conversions.',
    features:    ['Product catalogue + search','Cart & wishlist','Checkout flow','Product detail pages','Category pages','Coupon system','Mobile responsive','SEO optimised'],
    stack:       ['Next.js', 'Tailwind CSS', 'Stripe'],
    pages:       ['Home', 'Shop', 'Product', 'Cart', 'Checkout'],
  },
  {
    slug:        'restaurant',
    name:        'Restaurant / Hospitality',
    tagline:     'Beautiful site for restaurants & resorts',
    category:    'Hospitality',
    icon:        '🍽️',
    price:       900,
    time:        '1–2 weeks',
    popular:     false,
    color:       'from-[#2e0a0a] to-[#1a0505]',
    preview:     'https://codeaplus.pro/templates/restaurant',
    image:       'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    description: 'Elegant restaurant or hospitality website with menu showcase, online reservation, gallery, and location.',
    features:    ['Hero with ambience images','Menu showcase','Online reservation form','Gallery section','Chef / team section','Location & hours','Mobile responsive','WhatsApp integration'],
    stack:       ['Next.js', 'Tailwind CSS', 'CMS'],
    pages:       ['Home', 'Menu', 'Reservations', 'Gallery', 'Contact'],
  },
  {
    slug:        'blog-portfolio',
    name:        'Blog / Developer Portfolio',
    tagline:     'Clean portfolio for developers & writers',
    category:    'Blog',
    icon:        '✍️',
    price:       800,
    time:        '1 week',
    popular:     false,
    color:       'from-[#0a1a2e] to-[#050d1a]',
    preview:     'https://codeaplus.pro/templates/blog-portfolio',
    image:       'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    description: 'Minimal, fast blog and developer portfolio. Showcases projects, skills, and articles.',
    features:    ['Hero with bio','Skills & tech stack','Projects showcase','Blog / articles list','Article detail page','Dark/light mode','Mobile responsive','SEO + Open Graph'],
    stack:       ['Next.js', 'Tailwind CSS', 'MDX'],
    pages:       ['Home', 'Projects', 'Blog', 'About', 'Contact'],
  },
  {
    slug:        'real-estate',
    name:        'Real Estate Platform',
    tagline:     'PropTech platform for agents & developers',
    category:    'Real Estate',
    icon:        '🏠',
    price:       1600,
    time:        '2–3 weeks',
    popular:     false,
    color:       'from-[#1a1a2e] to-[#0d0d1a]',
    preview:     'https://codeaplus.pro/templates/real-estate',
    image:       'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    description: 'Modern real estate website with property listings, search & filters, agent profiles, and inquiry forms.',
    features:    ['Property listings grid','Search & filter system','Property detail pages','Agent profiles','Map integration','Inquiry / contact form','Mobile responsive','SEO optimised'],
    stack:       ['Next.js', 'Tailwind CSS', 'Google Maps'],
    pages:       ['Home', 'Listings', 'Property', 'Agents', 'Contact'],
  },
]

export function getTemplate(slug: string): Template | undefined {
  return TEMPLATES.find(t => t.slug === slug)
}

export const CATEGORIES = [...new Set(TEMPLATES.map(t => t.category))]