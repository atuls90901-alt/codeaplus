'use client'
import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { icon: '🎨', name: 'Design', count: '2.4k' },
  { icon: '💻', name: 'Development', count: '5.1k' },
  { icon: '📸', name: 'Photography', count: '1.8k' },
  { icon: '✍️', name: 'Writing', count: '3.2k' },
  { icon: '🎵', name: 'Music', count: '980' },
  { icon: '📱', name: 'Marketing', count: '2.7k' },
]

const FEATURED = [
  { title: 'Premium UI Kit — 500+ Components', seller: 'Alex Morgan', price: 49, rating: 4.9, reviews: 284, badge: 'Bestseller', img: '🎨' },
  { title: 'Full-Stack SaaS Boilerplate', seller: 'Dev Studio', price: 129, rating: 4.8, reviews: 156, badge: 'New', img: '💻' },
  { title: 'Brand Identity Package', seller: 'Creative Co', price: 299, rating: 5.0, reviews: 67, badge: 'Top Rated', img: '✨' },
  { title: 'Mobile App UI Templates', seller: 'UI Crafts', price: 79, rating: 4.7, reviews: 412, badge: '', img: '📱' },
  { title: 'Motion Graphics Pack', seller: 'Pixel Studio', price: 59, rating: 4.9, reviews: 203, badge: 'Bestseller', img: '🎬' },
  { title: 'SEO Content Templates', seller: 'WordCraft', price: 39, rating: 4.6, reviews: 891, badge: '', img: '📝' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Browse & Discover', desc: 'Explore thousands of digital products from verified creators worldwide.' },
  { step: '02', title: 'Buy Instantly', desc: 'Secure checkout with instant digital delivery. No waiting, no friction.' },
  { step: '03', title: 'Start Creating', desc: 'Download and use immediately. Lifetime access to your purchases.' },
]

export default function MarketplaceTemplate() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1a1a1a] overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,700;1,700&display=swap');
        .hero-gradient { background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #ecfdf5 100%); }
        .badge-green { background: #dcfce7; color: #16a34a; }
        .badge-blue { background: #dbeafe; color: #1d4ed8; }
        .badge-orange { background: #fed7aa; color: #ea580c; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
        .btn-main { background: #1a1a1a; color: white; }
        .btn-main:hover { background: #333; }
        .btn-seller { background: linear-gradient(135deg, #f59e0b, #ef4444); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.6s ease both; }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-bold">M</div>
            <span className="font-bold text-lg" style={{ fontFamily: "'Fraunces', serif" }}>Marketo</span>
          </div>
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search digital products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 bg-gray-50
                  text-sm outline-none focus:border-black/20 focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            {['Explore', 'Sell', 'Pricing'].map(item => (
              <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-sm text-gray-600 hover:text-black transition-colors px-3 py-2">
              Sign In
            </button>
            <button className="btn-main text-sm px-5 py-2.5 rounded-xl font-semibold
              transition-all hover:-translate-y-0.5">
              Start Selling
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient py-20 px-6">
        <div className="max-w-5xl mx-auto text-center fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-amber-100 text-amber-700 text-sm font-medium mb-8">
            🎉 50,000+ products · 100K+ happy buyers
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "'Fraunces', serif" }}>
            The marketplace for{' '}
            <em className="italic text-amber-500">digital creators</em>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Buy and sell premium digital products. UI kits, templates, code, music, and more —
            all from verified independent creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn-main px-8 py-4 rounded-2xl font-semibold text-lg
              transition-all hover:-translate-y-0.5">
              Explore Products →
            </button>
            <button className="btn-seller text-white px-8 py-4 rounded-2xl font-semibold text-lg
              transition-all hover:-translate-y-0.5">
              Start Selling Free
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">🔒 Secure payments</span>
            <span className="flex items-center gap-1.5">⚡ Instant delivery</span>
            <span className="flex items-center gap-1.5">♾️ Lifetime access</span>
            <span className="flex items-center gap-1.5">💰 30-day refund</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Fraunces', serif" }}>
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => (
              <button key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`p-5 rounded-2xl border text-center transition-all duration-200
                  hover:-translate-y-1 hover:shadow-md
                  ${activeCategory === cat.name
                    ? 'border-black bg-black text-white'
                    : 'border-black/[0.08] bg-gray-50 hover:border-black/20'}`}>
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-sm">{cat.name}</div>
                <div className={`text-xs mt-0.5 ${activeCategory === cat.name ? 'text-white/60' : 'text-gray-400'}`}>
                  {cat.count} items
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
              Featured Products
            </h2>
            <a href="#" className="text-sm font-semibold text-black underline">View all →</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map(product => (
              <div key={product.title}
                className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden
                  card-hover transition-all duration-300 cursor-pointer">
                <div className="h-44 bg-gradient-to-br from-amber-50 to-orange-50
                  flex items-center justify-center text-6xl relative">
                  {product.img}
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full
                      ${product.badge === 'Bestseller' ? 'badge-orange' :
                        product.badge === 'Top Rated' ? 'badge-green' : 'badge-blue'}`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-gray-500 text-xs mb-3">by {product.seller}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="font-semibold text-sm">{product.rating}</span>
                      <span className="text-gray-400 text-xs">({product.reviews})</span>
                    </div>
                    <div className="font-bold text-lg">${product.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            How <em className="italic text-amber-500">Marketo</em> works
          </h2>
          <p className="text-gray-500 mb-14 text-lg">Simple, fast, and built for creators.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map(step => (
              <div key={step.step} className="text-left">
                <div className="text-6xl font-bold text-black/5 mb-4"
                  style={{ fontFamily: "'Fraunces', serif" }}>{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell CTA */}
      <section className="py-20 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "'Fraunces', serif" }}>
            Turn your skills into <em className="italic text-amber-400">income</em>
          </h2>
          <p className="text-white/55 text-lg mb-10">
            Join 12,000+ creators earning passive income. Zero upfront cost.
          </p>
          <button className="btn-seller px-10 py-5 rounded-2xl font-bold text-xl
            transition-all hover:-translate-y-1 hover:shadow-xl">
            Start Selling Today — It&apos;s Free →
          </button>
          <p className="text-white/30 text-sm mt-4">Keep 80% of every sale. Withdraw anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-[#111] text-white/40 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'Fraunces', serif" }} className="text-white font-bold text-lg">Marketo</span>
          <p>© 2026 Marketo. All rights reserved.</p>
          <Link href="/website-templates/marketplace"
            className="text-gold/50 hover:text-gold transition-colors font-medium">
            Template by CodeaPlus →
          </Link>
        </div>
      </footer>
    </div>
  )
}