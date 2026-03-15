'use client'
import { useState } from 'react'
import Link from 'next/link'

const LISTINGS = [
  { id: 1, title: 'Modern Penthouse', location: 'Mayfair, London', price: '£4,200,000', type: 'Sale', beds: 4, baths: 3, sqft: 2800, img: '🏙️', badge: 'Featured' },
  { id: 2, title: 'Victorian Townhouse', location: 'Notting Hill, London', price: '£2,850,000', type: 'Sale', beds: 5, baths: 4, sqft: 3200, img: '🏡', badge: 'New' },
  { id: 3, title: 'Riverside Apartment', location: 'Battersea, London', price: '£1,200,000', type: 'Sale', beds: 2, baths: 2, sqft: 1100, img: '🌊', badge: '' },
  { id: 4, title: 'City Studio', location: 'Shoreditch, London', price: '£2,800/mo', type: 'Rent', beds: 1, baths: 1, sqft: 650, img: '🏢', badge: '' },
  { id: 5, title: 'Garden Cottage', location: 'Richmond, London', price: '£1,750,000', type: 'Sale', beds: 3, baths: 2, sqft: 1900, img: '🌿', badge: 'Price Drop' },
  { id: 6, title: 'Loft Conversion', location: 'Hackney, London', price: '£3,500/mo', type: 'Rent', beds: 2, baths: 1, sqft: 890, img: '🏗️', badge: '' },
]

const AGENTS = [
  { name: 'Sophie Williams', role: 'Senior Agent', deals: 142, img: 'SW' },
  { name: 'James Thornton', role: 'Luxury Specialist', deals: 89, img: 'JT' },
  { name: 'Emma Clarke', role: 'Rental Expert', deals: 203, img: 'EC' },
]

export default function RealEstateTemplate() {
  const [filter, setFilter] = useState('All')
  const [searchCity, setSearchCity] = useState('')
  const [savedListings, setSavedListings] = useState<number[]>([])
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contacted, setContacted] = useState(false)

  const filtered = filter === 'All' ? LISTINGS : LISTINGS.filter(l => l.type === filter)

  const toggleSave = (id: number) =>
    setSavedListings(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (contactForm.name && contactForm.email) setContacted(true)
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] overflow-x-hidden"
      style={{ fontFamily: "'Outfit', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        .baskerville { font-family: 'Libre Baskerville', Georgia, serif; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(26,26,46,0.1); }
        .gradient-hero { background: linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 50%, #1a2e4e 100%); }
      `}</style>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="baskerville italic">Prime</span>
            <span className="text-[#7c3aed]">Estate</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-black/50">
            {['Buy', 'Rent', 'Sell', 'Agents', 'Blog'].map(item => (
              <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {savedListings.length > 0 && (
              <span className="text-sm text-purple-600">❤ {savedListings.length} saved</span>
            )}
            <button className="bg-[#7c3aed] text-white px-5 py-2.5 rounded-xl text-sm font-medium
              hover:bg-[#6d28d9] transition-colors">
              List Property
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero py-28 px-6 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-purple-300/70 text-sm tracking-widest uppercase mb-6">
            Premium Property · London
          </p>
          <h1 className="baskerville text-6xl md:text-8xl font-bold leading-[0.92] mb-8">
            Find your<br /><em className="italic text-purple-300">perfect</em> home
          </h1>
          <p className="text-white/50 text-xl max-w-xl mx-auto mb-12">
            Discover exceptional properties across London&apos;s most sought-after neighbourhoods.
          </p>

          {/* Search */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto shadow-xl">
            <input
              value={searchCity}
              onChange={e => setSearchCity(e.target.value)}
              placeholder="📍 Search by area, postcode, or property name..."
              className="flex-1 px-5 py-3.5 text-[#1a1a2e] text-sm outline-none rounded-xl"
            />
            <div className="flex gap-2">
              {['Buy', 'Rent'].map(type => (
                <button key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all
                    ${filter === type
                      ? 'bg-[#7c3aed] text-white'
                      : 'text-black/50 hover:bg-gray-100'}`}>
                  {type}
                </button>
              ))}
              <button className="bg-[#7c3aed] text-white px-6 py-3 rounded-xl text-sm font-medium
                hover:bg-[#6d28d9] transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['2,400+', 'Properties'], ['£2.8B+', 'Total Value'], ['98%', 'Client Sat.'], ['14yr', 'Experience']].map(([val, label]) => (
            <div key={label}>
              <div className="text-4xl font-bold text-[#7c3aed] mb-1">{val}</div>
              <div className="text-black/40 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="baskerville text-3xl font-bold">
              <em className="italic">Latest</em> Listings
            </h2>
            <div className="flex gap-2">
              {['All', 'Sale', 'Rent'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${filter === f
                      ? 'bg-[#7c3aed] text-white'
                      : 'border border-black/[0.08] text-black/50 hover:border-purple-400'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(listing => (
              <div key={listing.id}
                className="card border border-black/[0.06] rounded-2xl overflow-hidden
                  transition-all duration-300 cursor-pointer bg-white">
                {/* Image */}
                <div className="h-52 bg-gradient-to-br from-purple-50 to-indigo-50
                  flex items-center justify-center text-7xl relative">
                  {listing.img}
                  {listing.badge && (
                    <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full
                      ${listing.badge === 'Featured' ? 'bg-purple-600 text-white' :
                        listing.badge === 'New' ? 'bg-green-500 text-white' :
                        listing.badge === 'Price Drop' ? 'bg-red-500 text-white' :
                        'bg-black text-white'}`}>
                      {listing.badge}
                    </span>
                  )}
                  <button onClick={() => toggleSave(listing.id)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white
                      flex items-center justify-center text-lg shadow-md hover:scale-110 transition-transform">
                    {savedListings.includes(listing.id) ? '❤️' : '🤍'}
                  </button>
                  <span className={`absolute bottom-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full
                    ${listing.type === 'Sale' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    For {listing.type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg leading-tight">{listing.title}</h3>
                    <div className="font-bold text-[#7c3aed] text-lg flex-shrink-0 ml-2">
                      {listing.price}
                    </div>
                  </div>
                  <p className="text-black/45 text-sm mb-4">📍 {listing.location}</p>
                  <div className="flex items-center gap-4 text-sm text-black/50">
                    <span>🛏 {listing.beds} beds</span>
                    <span>🚿 {listing.baths} baths</span>
                    <span>📐 {listing.sqft.toLocaleString()} sq ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="baskerville text-4xl font-bold mb-3">
            Meet Our <em className="italic text-[#7c3aed]">Agents</em>
          </h2>
          <p className="text-black/45 mb-12">Experts you can trust to find your perfect home.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGENTS.map(agent => (
              <div key={agent.name}
                className="bg-white rounded-2xl p-8 border border-black/[0.06] text-center
                  hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500
                  flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5">
                  {agent.img}
                </div>
                <h3 className="font-bold text-lg mb-1">{agent.name}</h3>
                <p className="text-black/45 text-sm mb-3">{agent.role}</p>
                <p className="text-purple-600 text-sm font-medium">{agent.deals} deals closed</p>
                <button className="mt-4 w-full border border-purple-200 text-purple-600 py-2.5 rounded-xl
                  text-sm font-medium hover:bg-purple-50 transition-colors">
                  Contact Agent
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 border-t border-black/[0.06]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="baskerville text-4xl font-bold mb-3">
              Start Your <em className="italic text-[#7c3aed]">Search</em>
            </h2>
            <p className="text-black/45">Tell us what you&apos;re looking for and we&apos;ll match you with the perfect property.</p>
          </div>
          {!contacted ? (
            <form onSubmit={handleContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={contactForm.name}
                  onChange={e => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="Your name"
                  className="px-5 py-4 border border-black/[0.08] rounded-xl text-sm outline-none
                    focus:border-purple-400 transition-colors" />
                <input type="email" value={contactForm.email}
                  onChange={e => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="Email address"
                  className="px-5 py-4 border border-black/[0.08] rounded-xl text-sm outline-none
                    focus:border-purple-400 transition-colors" />
              </div>
              <textarea value={contactForm.message}
                onChange={e => setContactForm({...contactForm, message: e.target.value})}
                placeholder="Tell us about your requirements — budget, area, number of rooms..."
                rows={4}
                className="w-full px-5 py-4 border border-black/[0.08] rounded-xl text-sm outline-none
                  focus:border-purple-400 transition-colors resize-none" />
              <button type="submit"
                className="w-full bg-[#7c3aed] text-white py-4 rounded-xl font-medium text-sm
                  hover:bg-[#6d28d9] transition-colors">
                Send Enquiry →
              </button>
            </form>
          ) : (
            <div className="text-center py-12 border border-purple-100 rounded-2xl bg-purple-50">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="text-2xl font-bold mb-2">Enquiry received!</h3>
              <p className="text-black/45">An agent will contact you within 2 hours.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 bg-[#1a1a2e] text-white/40 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white text-xl font-bold">
            <span className="baskerville italic">Prime</span>Estate
          </span>
          <p>© 2026 PrimeEstate. All rights reserved.</p>
          <Link href="/website-templates/real-estate"
            className="text-purple-400/60 hover:text-purple-400 transition-colors text-xs tracking-widest uppercase">
            Template by CodeaPlus →
          </Link>
        </div>
      </footer>
    </div>
  )
}