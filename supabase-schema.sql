-- =============================================
-- AGENCY WEBSITE - SUPABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- PROJECTS TABLE
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  description text,
  tech_stack text[] default '{}',
  image_url text,
  live_url text,
  gradient text default 'linear-gradient(135deg,#0a1628,#1a3a5c)',
  display_order integer default 0,
  is_featured boolean default false,
  created_at timestamp with time zone default now()
);

-- TESTIMONIALS TABLE
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  author_name text not null,
  author_role text not null,
  content text not null,
  rating integer default 5 check (rating >= 1 and rating <= 5),
  avatar_letter text generated always as (upper(left(author_name, 1))) stored,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default now()
);

-- CONTACTS TABLE
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  service text,
  budget text,
  message text,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- ROW LEVEL SECURITY
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.contacts enable row level security;

-- PUBLIC READ for projects & testimonials
create policy "Public can read projects" on public.projects for select using (true);
create policy "Public can read testimonials" on public.testimonials for select using (is_active = true);

-- AUTHENTICATED users can do everything (admin)
create policy "Admin full access projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Admin full access testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Admin full access contacts" on public.contacts for all using (auth.role() = 'authenticated');

-- Anyone can INSERT into contacts (contact form)
create policy "Anyone can submit contact" on public.contacts for insert with check (true);

-- =============================================
-- SAMPLE DATA
-- =============================================
insert into public.projects (title, category, description, tech_stack, gradient, display_order, is_featured) values
('LuxCart — Premium Retail', 'E-Commerce · MERN Stack', 'Full-featured e-commerce platform with payment gateway, inventory management and admin dashboard.', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'linear-gradient(135deg,#0a1628,#1a3a5c,#0d2540)', 1, true),
('DataPulse Analytics', 'SaaS · Dashboard', 'Real-time analytics dashboard with data visualization, user management and export features.', ARRAY['Next.js', 'Supabase', 'Chart.js'], 'linear-gradient(135deg,#1a0a0a,#3c1515,#1a0f05)', 2, false),
('Savora Dining', 'Restaurant · Next.js', 'Online restaurant with table booking, menu management and online ordering system.', ARRAY['Next.js', 'Node.js', 'MongoDB'], 'linear-gradient(135deg,#0a1a0a,#1a3c1a,#0a150a)', 3, false),
('Hexa Properties', 'Real Estate · Portal', 'Property listing portal with advanced search, virtual tours and agent management system.', ARRAY['MERN', 'Redis', 'AWS S3'], 'linear-gradient(135deg,#180a28,#2d1a4a,#120a20)', 4, false);

insert into public.testimonials (author_name, author_role, content, rating, display_order) values
('Rahul Sharma', 'CEO, TechVentures', 'They transformed our entire online presence. Our sales doubled within 3 months of launching the new site. Absolutely world-class work.', 5, 1),
('Priya Mehta', 'Founder, StyleMart', 'The attention to detail is unreal. Every pixel is perfect, the backend is rock-solid. Best investment we made for our startup, period.', 5, 2),
('Arjun Patel', 'Director, NovaBuild', 'Fast, professional, and they truly understand modern web development. Delivered ahead of schedule with quality beyond expectations.', 5, 3);
