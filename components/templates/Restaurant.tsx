'use client'
import { useState } from 'react'
import Link from 'next/link'

const MENU = {
  Starters: [
    { name: 'Burrata & Heirloom Tomato', desc: 'Fresh burrata, basil oil, aged balsamic, sourdough crostini', price: 18, veg: true },
    { name: 'Seared Scallops', desc: 'Hand-dived scallops, pea purée, crispy pancetta, truffle foam', price: 26 },
    { name: 'Charcuterie Board', desc: 'Chef\'s selection of cured meats, pickles, mustard, artisan bread', price: 22 },
  ],
  Mains: [
    { name: 'Dry-Aged Ribeye 300g', desc: '28-day aged prime ribeye, roasted bone marrow butter, truffle fries', price: 68 },
    { name: 'Wild Sea Bass', desc: 'Line-caught sea bass, fennel bisque, capers, lemon gremolata', price: 44 },
    { name: 'Mushroom Risotto', desc: 'Arborio rice, mixed wild mushrooms, aged parmesan, fresh truffle', price: 34, veg: true },
  ],
  Desserts: [
    { name: 'Valrhona Chocolate Fondant', desc: 'Warm dark chocolate fondant, vanilla bean ice cream, hazelnut praline', price: 16 },
    { name: 'Crème Brûlée', desc: 'Classic vanilla custard, caramelised sugar crust, fresh berries', price: 14, veg: true },
  ],
}

export default function RestaurantTemplate() {
  const [activeMenu, setActiveMenu] = useState('Starters')
  const [reserveForm, setReserveForm] = useState({ date: '', time: '', guests: '2', name: '', email: '' })
  const [reserved, setReserved] = useState(false)

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault()
    if (reserveForm.name && reserveForm.email && reserveForm.date) setReserved(true)
  }

  return (
    <div className="min-h-screen bg-[#0e0b08] text-[#f0ebe4] overflow-x-hidden"
      style={{ fontFamily: "'Didact Gothic', 'Helvetica Neue', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Didact+Gothic&display=swap');
        .playfair { font-family: 'Playfair Display', Georgia, serif; }
        .gold-line { background: linear-gradient(90deg, transparent, #c9a84c, transparent); height: 1px; }
        .menu-item:hover { background: rgba(201,168,76,0.05); }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5
        bg-[#0e0b08]/90 backdrop-blur-xl border-b border-[#c9a84c]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xs tracking-[0.4em] uppercase text-[#c9a84c]/60">
            Est. 2018
          </div>
          <div className="text-2xl playfair font-bold tracking-wide">
            Osteria <em className="italic font-normal text-[#c9a84c]">Doro</em>
          </div>
          <a href="#reserve"
            className="text-xs tracking-[0.3em] uppercase text-[#c9a84c]
              border border-[#c9a84c]/30 px-5 py-2.5
              hover:bg-[#c9a84c] hover:text-[#0e0b08] transition-all duration-300">
            Reserve
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[#1a1208] flex items-center justify-center overflow-hidden">
          <div className="text-[300px] opacity-5">🍷</div>
        </div>
        <div className="absolute inset-0
          bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(201,168,76,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-3xl">
          <div className="gold-line w-24 mx-auto mb-10" />
          <p className="text-xs tracking-[0.5em] uppercase text-[#c9a84c]/60 mb-6">
            Fine Dining · London
          </p>
          <h1 className="text-7xl md:text-[100px] playfair font-bold leading-[0.92] mb-8"
            style={{ letterSpacing: '-0.02em' }}>
            Where food<br />becomes <em className="italic font-normal text-[#c9a84c]">art</em>
          </h1>
          <p className="text-[#f0ebe4]/45 text-lg leading-relaxed mb-12 max-w-lg mx-auto">
            A celebration of Italian culinary tradition, reimagined through
            seasonal ingredients and modern technique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#reserve"
              className="text-xs tracking-[0.3em] uppercase bg-[#c9a84c] text-[#0e0b08]
                px-10 py-4 font-bold hover:bg-[#b8973d] transition-colors">
              Reserve a Table
            </a>
            <a href="#menu"
              className="text-xs tracking-[0.3em] uppercase border border-[#f0ebe4]/20
                px-10 py-4 hover:border-[#c9a84c]/40 transition-colors">
              View Menu
            </a>
          </div>
          <div className="gold-line w-24 mx-auto mt-10" />
        </div>

        {/* Hours */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-12
          text-xs tracking-[0.25em] uppercase text-[#f0ebe4]/30">
          <span>Tue–Sun</span>
          <span className="text-[#c9a84c]/40">·</span>
          <span>18:00 – 23:00</span>
          <span className="text-[#c9a84c]/40">·</span>
          <span>12 Vine Street, London</span>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 px-6 border-t border-[#c9a84c]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.5em] uppercase text-[#c9a84c]/60 mb-4">
              Seasonal Menu
            </p>
            <h2 className="text-5xl playfair font-bold">
              Our <em className="italic font-normal text-[#c9a84c]">kitchen</em>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-0 mb-12 border-b border-[#c9a84c]/10">
            {Object.keys(MENU).map(cat => (
              <button key={cat} onClick={() => setActiveMenu(cat)}
                className={`px-8 py-4 text-xs tracking-[0.3em] uppercase transition-all
                  ${activeMenu === cat
                    ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]'
                    : 'text-[#f0ebe4]/35 hover:text-[#f0ebe4]/60'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="divide-y divide-[#c9a84c]/[0.08]">
            {MENU[activeMenu as keyof typeof MENU].map(item => (
              <div key={item.name} className="menu-item py-7 px-4 transition-colors flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="playfair text-xl font-medium">{item.name}</h3>
                    {'veg' in item && item.veg && (
                      <span className="text-[9px] tracking-[0.15em] uppercase
                        text-green-400/70 border border-green-400/20 px-2 py-0.5">
                        V
                      </span>
                    )}
                  </div>
                  <p className="text-[#f0ebe4]/35 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="playfair text-2xl text-[#c9a84c] flex-shrink-0">
                  £{item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 border-t border-[#c9a84c]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl playfair">The <em className="italic font-normal text-[#c9a84c]">Experience</em></h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['🍽️', '🥂', '🕯️', '🌿', '🍷', '🍰'].map((emoji, i) => (
              <div key={i}
                className={`bg-[#1a1208] flex items-center justify-center
                  ${i === 0 ? 'row-span-2 text-8xl' : 'text-6xl'}`}
                style={{ minHeight: i === 0 ? '320px' : '150px' }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="py-24 px-6 border-t border-[#c9a84c]/10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.5em] uppercase text-[#c9a84c]/60 mb-4">
              Book Your Table
            </p>
            <h2 className="text-5xl playfair">
              Reserve a <em className="italic font-normal text-[#c9a84c]">table</em>
            </h2>
          </div>

          {!reserved ? (
            <form onSubmit={handleReserve}
              className="border border-[#c9a84c]/15 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#f0ebe4]/35">Date</label>
                  <input type="date" value={reserveForm.date}
                    onChange={e => setReserveForm({...reserveForm, date: e.target.value})}
                    className="bg-transparent border border-[#c9a84c]/15 px-4 py-3
                      text-sm outline-none focus:border-[#c9a84c]/40 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#f0ebe4]/35">Time</label>
                  <select value={reserveForm.time}
                    onChange={e => setReserveForm({...reserveForm, time: e.target.value})}
                    className="bg-[#0e0b08] border border-[#c9a84c]/15 px-4 py-3
                      text-sm outline-none focus:border-[#c9a84c]/40 transition-colors">
                    {['18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#f0ebe4]/35">Guests</label>
                  <select value={reserveForm.guests}
                    onChange={e => setReserveForm({...reserveForm, guests: e.target.value})}
                    className="bg-[#0e0b08] border border-[#c9a84c]/15 px-4 py-3
                      text-sm outline-none focus:border-[#c9a84c]/40 transition-colors">
                    {['1','2','3','4','5','6','7','8'].map(n => (
                      <option key={n} value={n}>{n} guest{n !== '1' ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#f0ebe4]/35">Your Name</label>
                  <input value={reserveForm.name}
                    onChange={e => setReserveForm({...reserveForm, name: e.target.value})}
                    placeholder="John Smith"
                    className="bg-transparent border border-[#c9a84c]/15 px-4 py-3
                      text-sm placeholder:text-white/20 outline-none focus:border-[#c9a84c]/40 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#f0ebe4]/35">Email</label>
                  <input type="email" value={reserveForm.email}
                    onChange={e => setReserveForm({...reserveForm, email: e.target.value})}
                    placeholder="john@email.com"
                    className="bg-transparent border border-[#c9a84c]/15 px-4 py-3
                      text-sm placeholder:text-white/20 outline-none focus:border-[#c9a84c]/40 transition-colors" />
                </div>
              </div>
              <button type="submit"
                className="w-full bg-[#c9a84c] text-[#0e0b08] py-4
                  text-xs tracking-[0.3em] uppercase font-bold
                  hover:bg-[#b8973d] transition-colors">
                Confirm Reservation
              </button>
            </form>
          ) : (
            <div className="border border-[#c9a84c]/20 p-12 text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="playfair text-3xl mb-3">Reservation Confirmed</h3>
              <p className="text-[#f0ebe4]/45">
                We look forward to welcoming you. A confirmation has been sent to {reserveForm.email}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 border-t border-[#c9a84c]/10
        flex flex-col md:flex-row items-center justify-between gap-4
        text-[#f0ebe4]/30 text-sm">
        <span className="playfair text-xl text-[#f0ebe4]">
          Osteria <em className="italic text-[#c9a84c]">Doro</em>
        </span>
        <p>© 2026 Osteria Doro</p>
        <Link href="/website-templates/restaurant"
          className="text-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors text-xs tracking-widest uppercase">
          Template by CodeaPlus →
        </Link>
      </footer>
    </div>
  )
}