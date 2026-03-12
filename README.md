# Studio — Agency Website (Next.js + Supabase)

## Stack
- **Next.js 14** (App Router)
- **Supabase** (Database + Auth)
- **Tailwind CSS**
- **TypeScript**

---

## Setup (5 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Supabase Project
- Go to [supabase.com](https://supabase.com) → New Project
- Copy your **Project URL** and **Anon Key**

### 3. Setup Database
- Go to Supabase → SQL Editor
- Copy & paste the entire contents of `supabase-schema.sql`
- Click **Run**

### 4. Setup Environment Variables
```bash
cp .env.local.example .env.local
```
Then edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Admin Panel

**URL:** `/admin`

### Create Admin User
1. Go to Supabase → Authentication → Users
2. Click **Add User** → set email + password
3. Login at `/admin/login`

### Admin Features
- ✅ View & manage all **projects** (add, edit, delete)
- ✅ View & manage all **testimonials** (add, edit, delete)
- ✅ View **contact form submissions** (mark as read)

---

## Customization

### Change Agency Name
Search for `Studio` in all files and replace with your agency name.

### Update Contact Details
Edit `components/Contact.tsx` — update email, WhatsApp, location.

### Update Pricing
Edit `components/Pricing.tsx` — update plan names, prices, features.

### Update Social Links
Edit `components/Footer.tsx` — update LinkedIn, Fiverr, GitHub, Instagram URLs.

---

## Deploy to Vercel
```bash
npm run build  # test build locally first
```
Then connect your GitHub repo to [vercel.com](https://vercel.com) and add environment variables.

---

## File Structure
```
agency/
├── app/
│   ├── page.tsx              # Main page (fetches from Supabase)
│   ├── layout.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard
│   │   ├── layout.tsx
│   │   └── login/page.tsx    # Admin login
│   └── api/
│       └── contact/route.ts  # Contact form API
├── components/
│   ├── Loader.tsx
│   ├── CustomCursor.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx              # Particles, glitch, counters
│   ├── Services.tsx          # 3D tilt cards
│   ├── Portfolio.tsx         # Dynamic from Supabase
│   ├── About.tsx
│   ├── Testimonials.tsx      # Dynamic from Supabase
│   ├── Pricing.tsx
│   ├── Contact.tsx           # Saves to Supabase
│   └── Footer.tsx
├── lib/
│   └── supabase.ts
├── types/
│   └── index.ts
├── supabase-schema.sql       # Run this in Supabase SQL Editor
└── .env.local.example
```
