// lib/toolkit.ts

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
export type ProjectType = 'saas' | 'marketplace' | 'platform' | 'ecommerce'
export type UserScale   = '100' | '1k' | '10k' | '100k'
export type UILevel     = 'basic' | 'modern' | 'premium'
export type Complexity  = 'Simple' | 'Medium' | 'Complex'

export interface Feature {
  id:    string
  label: string
  cost:  number
  time:  number
}

export interface TechStack {
  frontend:  string[]
  backend:   string[]
  database:  string[]
  hosting:   string[]
  extras:    string[]
}

export interface PlannerInput {
  idea:        string
  projectType: ProjectType
  userScale:   UserScale
  features:    string[]
}

export interface PlannerOutput {
  recommendedFeatures: string[]
  techStack:           TechStack
  timeline:            string
  costRange:           CostRange
  starterKit:          string
  summary:             string
}

export interface ScopeInput {
  projectType: ProjectType
  features:    string[]
  userScale:   UserScale
  uiLevel:     UILevel
}

export interface ScopeOutput {
  summary:    string
  costRange:  CostRange
  timeline:   string
  techStack:  TechStack
  complexity: Complexity
}

export interface CostRange {
  min: number
  max: number
}

export interface StarterKit {
  id:      string
  name:    string
  icon:    string
  desc:    string
  type:    ProjectType
  price:   number
  time:    string
  features: string[]
  stack:   string[]
  popular: boolean
}

export interface LabProject {
  id:       string
  name:     string
  tagline:  string
  type:     string
  icon:     string
  image:    string
  url:      string
  problem:  string
  solution: string
  stack:    string[]
  features: string[]
  timeline: string
  results:  { metric: string; label: string }[]
  similar:  ProjectType
}

/* ══════════════════════════════════════
   BASE COSTS
══════════════════════════════════════ */
export const BASE_COSTS: Record<ProjectType, number> = {
  saas:        3500,
  marketplace: 4000,
  platform:    3000,
  ecommerce:   2500,
}

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  saas:        'SaaS MVP',
  marketplace: 'Marketplace Platform',
  platform:    'Startup Web Platform',
  ecommerce:   'E-Commerce Store',
}

/* ══════════════════════════════════════
   FEATURES
══════════════════════════════════════ */
export const ALL_FEATURES: Feature[] = [
  { id: 'payments',      label: 'Payment Gateway',      cost: 500, time: 1   },
  { id: 'messaging',     label: 'Real-time Messaging',  cost: 700, time: 1.5 },
  { id: 'analytics',     label: 'Analytics Dashboard',  cost: 400, time: 1   },
  { id: 'admin',         label: 'Admin Dashboard',      cost: 600, time: 1   },
  { id: 'notifications', label: 'Push Notifications',   cost: 300, time: 0.5 },
  { id: 'api',           label: 'API Integrations',     cost: 400, time: 1   },
  { id: 'auth',          label: 'Auth & User Roles',    cost: 400, time: 1   },
  { id: 'search',        label: 'Search & Filters',     cost: 350, time: 0.5 },
  { id: 'reviews',       label: 'Reviews & Ratings',    cost: 300, time: 0.5 },
  { id: 'subscriptions', label: 'Subscription Billing', cost: 600, time: 1   },
  { id: 'multivendor',   label: 'Multi-vendor Support', cost: 800, time: 2   },
  { id: 'seo',           label: 'SEO Optimisation',     cost: 200, time: 0.5 },
  { id: 'email',         label: 'Email Automation',     cost: 300, time: 0.5 },
]

/* ══════════════════════════════════════
   SCALE + UI MULTIPLIERS
══════════════════════════════════════ */
export const SCALE_MULTIPLIER: Record<UserScale, number> = {
  '100':  1.0,
  '1k':   1.2,
  '10k':  1.4,
  '100k': 1.7,
}

export const SCALE_LABELS: Record<UserScale, string> = {
  '100':  'Up to 100 users',
  '1k':   'Up to 1,000 users',
  '10k':  'Up to 10,000 users',
  '100k': '100,000+ users',
}

export const UI_MULTIPLIER: Record<UILevel, number> = {
  basic:   1.0,
  modern:  1.15,
  premium: 1.30,
}

export const UI_LABELS: Record<UILevel, string> = {
  basic:   'Basic — Clean & Functional',
  modern:  'Modern — Polished & Professional',
  premium: 'Premium — Luxury & Distinctive',
}

/* ══════════════════════════════════════
   TECH STACKS
══════════════════════════════════════ */
export const TECH_STACKS: Record<ProjectType, TechStack> = {
  saas: {
    frontend: ['Next.js 14', 'Tailwind CSS', 'React Query'],
    backend:  ['Node.js', 'Express', 'REST API'],
    database: ['MongoDB', 'Redis'],
    hosting:  ['Vercel', 'Railway'],
    extras:   ['Stripe', 'Resend', 'Supabase Auth'],
  },
  marketplace: {
    frontend: ['Next.js 14', 'Tailwind CSS', 'Framer Motion'],
    backend:  ['Node.js', 'Express', 'Socket.io'],
    database: ['MongoDB', 'Redis'],
    hosting:  ['Vercel', 'AWS S3'],
    extras:   ['Stripe Connect', 'Cloudinary', 'Mapbox'],
  },
  platform: {
    frontend: ['Next.js 14', 'Tailwind CSS', 'shadcn/ui'],
    backend:  ['Node.js', 'Express', 'WebSockets'],
    database: ['MongoDB', 'Redis'],
    hosting:  ['Vercel', 'Railway'],
    extras:   ['Stripe', 'SendGrid', 'Supabase'],
  },
  ecommerce: {
    frontend: ['Next.js 14', 'Tailwind CSS'],
    backend:  ['Node.js', 'Express'],
    database: ['MongoDB'],
    hosting:  ['Vercel'],
    extras:   ['Stripe', 'Razorpay', 'Cloudinary'],
  },
}

export const BASE_TIMELINE: Record<ProjectType, number> = {
  saas:        4,
  marketplace: 6,
  platform:    5,
  ecommerce:   3,
}

const RECOMMENDED_FEATURES: Record<ProjectType, string[]> = {
  saas:        ['auth', 'payments', 'admin', 'analytics', 'email'],
  marketplace: ['auth', 'payments', 'messaging', 'reviews', 'admin', 'multivendor'],
  platform:    ['auth', 'admin', 'analytics', 'notifications', 'api'],
  ecommerce:   ['auth', 'payments', 'admin', 'search', 'email'],
}

export const STARTER_KIT_NAMES: Record<ProjectType, string> = {
  saas:        'SaaS MVP Starter Kit',
  marketplace: 'Marketplace Starter Kit',
  platform:    'Startup Platform Kit',
  ecommerce:   'E-Commerce Starter Kit',
}

/* ══════════════════════════════════════
   CALCULATE COST
══════════════════════════════════════ */
export function calculateCost(
  projectType: ProjectType,
  features:    string[],
  userScale:   UserScale,
  uiLevel:     UILevel = 'modern'
): CostRange {
  const base        = BASE_COSTS[projectType]
  const featureCost = features.reduce((sum: number, fId: string) => {
    const f = ALL_FEATURES.find((x: Feature) => x.id === fId)
    return sum + (f?.cost ?? 0)
  }, 0)
  const total = (base + featureCost) * SCALE_MULTIPLIER[userScale] * UI_MULTIPLIER[uiLevel]
  return {
    min: Math.round(total * 0.9  / 100) * 100,
    max: Math.round(total * 1.15 / 100) * 100,
  }
}

/* ══════════════════════════════════════
   CALCULATE TIMELINE
══════════════════════════════════════ */
export function calculateTimeline(projectType: ProjectType, features: string[]): string {
  const base    = BASE_TIMELINE[projectType]
  const addTime = features.reduce((sum: number, fId: string) => {
    const f = ALL_FEATURES.find((x: Feature) => x.id === fId)
    return sum + (f?.time ?? 0)
  }, 0)
  const total = Math.ceil(base + addTime * 0.6)
  if (total <= 4)  return '2–4 weeks'
  if (total <= 6)  return '4–6 weeks'
  if (total <= 10) return '6–10 weeks'
  return '10–14 weeks'
}

/* ══════════════════════════════════════
   GENERATE PROJECT PLAN
══════════════════════════════════════ */
export function generateProjectPlan(input: PlannerInput): PlannerOutput {
  const { projectType, userScale, features, idea } = input
  const allFeatures = [...new Set([...features, ...RECOMMENDED_FEATURES[projectType]])]
  const techStack   = { ...TECH_STACKS[projectType] }
  const extras      = [...techStack.extras]

  if (allFeatures.includes('messaging'))     extras.push('Socket.io')
  if (allFeatures.includes('subscriptions')) extras.push('Stripe Billing')
  if (allFeatures.includes('notifications')) extras.push('Firebase FCM')

  const costRange = calculateCost(projectType, allFeatures, userScale, 'modern')
  const timeline  = calculateTimeline(projectType, allFeatures)

  const summary =
    `Based on your idea, we recommend a ${PROJECT_TYPE_LABELS[projectType]} ` +
    `for ${SCALE_LABELS[userScale]}. ` +
    `Estimated investment: $${costRange.min.toLocaleString()}–$${costRange.max.toLocaleString()} ` +
    `with delivery in ${timeline}.` +
    (idea ? ` Your idea: "${idea.slice(0, 80)}${idea.length > 80 ? '...' : ''}"` : '')

  return {
    recommendedFeatures: allFeatures,
    techStack:           { ...techStack, extras: [...new Set(extras)] },
    timeline,
    costRange,
    starterKit: STARTER_KIT_NAMES[projectType],
    summary,
  }
}

/* ══════════════════════════════════════
   BUILD SCOPE
══════════════════════════════════════ */
export function buildScope(input: ScopeInput): ScopeOutput {
  const { projectType, features, userScale, uiLevel } = input
  const costRange  = calculateCost(projectType, features, userScale, uiLevel)
  const timeline   = calculateTimeline(projectType, features)
  const complexity: Complexity =
    features.length <= 3 ? 'Simple' :
    features.length <= 6 ? 'Medium' : 'Complex'

  const uiName = UI_LABELS[uiLevel].split(' — ')[0].toLowerCase()
  const summary =
    `A ${uiName} ${PROJECT_TYPE_LABELS[projectType]} ` +
    `with ${features.length} core features, built for ${SCALE_LABELS[userScale]}.`

  return {
    summary,
    costRange,
    timeline,
    techStack: TECH_STACKS[projectType],
    complexity,
  }
}

/* ══════════════════════════════════════
   STARTER KITS DATA
══════════════════════════════════════ */
export const STARTER_KITS_DATA: StarterKit[] = [
  {
    id: 'marketplace', name: 'Marketplace Starter Kit', icon: '🛒', type: 'marketplace',
    desc:    'Two-sided marketplace with buyer/seller flows, payments, reviews, and admin dashboard.',
    price:   4000, time: '4–6 weeks', popular: true,
    features: ['Buyer & Seller Profiles','Product Listings + Search','Stripe Connect Payments',
               'Review & Rating System','Real-time Messaging','Admin Dashboard','Order Management','Mobile Responsive'],
    stack:   ['Next.js','Node.js','MongoDB','Stripe Connect'],
  },
  {
    id: 'saas', name: 'SaaS MVP Starter Kit', icon: '🚀', type: 'saas',
    desc:    'Launch your SaaS fast. Auth, billing, dashboard, onboarding — everything for your first 100 users.',
    price:   3500, time: '3–5 weeks', popular: false,
    features: ['User Auth (Email + Google)','Subscription Billing (Stripe)','User Dashboard',
               'Admin Panel','Email Onboarding Flow','Analytics Dashboard','API Ready','Mobile Responsive'],
    stack:   ['Next.js','Node.js','MongoDB','Stripe'],
  },
  {
    id: 'platform', name: 'Startup Platform Kit', icon: '⚡', type: 'platform',
    desc:    'Full-featured platform for funded startups. Multi-role, real-time, Series A ready.',
    price:   5000, time: '5–8 weeks', popular: false,
    features: ['Multi-role User Access','Real-time Features (WebSockets)','Custom Workflow Builder',
               'Advanced Analytics','API Integrations','Admin + Super Admin Panel','Notification System','Cloud Infrastructure'],
    stack:   ['Next.js','Node.js','MongoDB','Socket.io','AWS'],
  },
  {
    id: 'ecommerce', name: 'E-Commerce Starter Kit', icon: '🛍️', type: 'ecommerce',
    desc:    'High-converting store built mobile-first. One-tap checkout, inventory, analytics.',
    price:   2500, time: '2–4 weeks', popular: false,
    features: ['Product Catalogue + Search','Cart & Checkout','Stripe + Razorpay',
               'Inventory Management','Order Tracking','Admin Dashboard','Coupon System','Mobile Responsive'],
    stack:   ['Next.js','Node.js','MongoDB','Stripe','Razorpay'],
  },
]

/* ══════════════════════════════════════
   STARTUP LAB DATA
══════════════════════════════════════ */
export const STARTUP_LAB_DATA: LabProject[] = [
  {
    id: 'ezgrabs', name: 'EzGrabs', tagline: 'Peer-to-peer book marketplace',
    type: 'Marketplace', icon: '📚', similar: 'marketplace',
    image: 'https://dribuualrdtbvregxztn.supabase.co/storage/v1/object/public/projects/project-1773494218684.png',
    url:  'https://ezgrabs.com',
    problem:  'Students needed an affordable way to buy and sell second-hand books locally without shipping costs.',
    solution: 'Built a P2P marketplace where students list books, buyers browse nearby listings, and both connect for local pickup.',
    stack:    ['Next.js','Node.js','MongoDB','Razorpay','Google Maps API'],
    features: ['P2P Listings','Location-based Search','In-app Messaging','Deals Section','Seller Dashboard'],
    timeline: '5 weeks',
    results:  [{ metric: '500+', label: 'Books Listed' },{ metric: '2.8×', label: 'Mobile Conv.' },{ metric: '5 wks', label: 'Delivered' }],
  },
  {
    id: 'shilavilla', name: 'Shilavilla Resort', tagline: 'Premium resort booking platform',
    type: 'Platform', icon: '🏨', similar: 'platform',
    image: 'https://dribuualrdtbvregxztn.supabase.co/storage/v1/object/public/projects/project-1773511924299.png',
    url:  '#',
    problem:  'A beautiful resort near Kolkata had zero online presence, losing bookings to digital-first competitors.',
    solution: 'Built a premium resort website with online booking, room showcase, gallery, and WhatsApp lead capture.',
    stack:    ['Next.js','Tailwind CSS','Supabase','WhatsApp API'],
    features: ['Room Showcase','Online Booking','Gallery','WhatsApp Integration','CMS'],
    timeline: '3 weeks',
    results:  [{ metric: '12×', label: 'More Inquiries' },{ metric: '₹8L', label: 'First Month' },{ metric: '3 wks', label: 'Delivered' }],
  },
  {
    id: 'devblog', name: 'DevBlogger', tagline: 'Developer knowledge platform',
    type: 'SaaS', icon: '💻', similar: 'saas',
    image: 'https://dribuualrdtbvregxztn.supabase.co/storage/v1/object/public/projects/project-1773512274806.png',
    url:  'https://thedeveloperblog.vercel.app',
    problem:  'Developers needed a clean platform to share technical knowledge without the noise of mainstream platforms.',
    solution: 'Built a modern blogging platform with markdown support, code highlighting, tags, and community features.',
    stack:    ['Next.js','Node.js','MongoDB','Tailwind CSS'],
    features: ['Markdown Editor','Code Highlighting','Tag System','User Profiles','Comments'],
    timeline: '4 weeks',
    results:  [{ metric: '200+', label: 'Articles' },{ metric: '98%', label: 'Satisfaction' },{ metric: '4 wks', label: 'Delivered' }],
  },
]