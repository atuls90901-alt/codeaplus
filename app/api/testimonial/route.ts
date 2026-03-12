import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { author_name, author_role, content, rating, user_id } = body

    if (!author_name || !content) {
      return NextResponse.json({ error: 'Name and review are required' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Use service role to bypass RLS for insert
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.from('testimonials').insert([{
      author_name,
      author_role: author_role || 'Client',
      content,
      rating,
      status: 'pending',
      is_active: false,
      display_order: 99,
    }])

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Review submitted! It will appear after approval.' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 })
  }
}