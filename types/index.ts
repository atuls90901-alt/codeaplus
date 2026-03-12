export interface Project {
  id: string
  title: string
  category: string
  description: string | null
  tech_stack: string[]
  image_url: string | null
  live_url: string | null
  gradient: string
  display_order: number
  is_featured: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  author_name: string
  author_role: string
  content: string
  rating: number
  avatar_letter: string
  is_active: boolean
  display_order: number
  created_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  service: string | null
  budget: string | null
  message: string | null
  is_read: boolean
  created_at: string
}
