'use client'
import { useState } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  { id: 1, name: 'Classic Linen Tee', price: 49, originalPrice: 69, category: 'Tops', rating: 4.8, reviews: 124, badge: 'Sale', img: '👕', colors: ['#f5f5f0', '#2d2d2d', '#8b6914'] },
  { id: 2, name: 'Merino Wool Sweater', price: 129, originalPrice: null, category: 'Tops', rating: 4.9, reviews: 89, badge: 'New', img: '🧥', colors: ['#1a1a2e', '#8b4513', '#2d4a2d'] },
  { id: 3, name: 'Straight Leg Trousers', price: 89, originalPrice: null, category: 'Bottoms', rating: 4.7, reviews: 203, badge: '', img: '👖', colors: ['#2d2d2d', '#8b8b6b', '#4a3728'] },
  { id: 4, name: 'Cashmere Scarf', price: 79, originalPrice: 99, category: 'Accessories', rating: 5.0, reviews: 56, badge: 'Sale', img: '🧣', colors: ['#c4a882', '#8b1a1a', '#2d2d2d'] },
  { id: 5, name: 'Leather Tote Bag', price: 189, originalPrice: null, category: 'Bags', rating: 4.8, reviews: 167, badge: 'Bestseller', img: '👜', colors: ['#c4a882', '#2d2d2d'] },
  { id: 6, name: 'Canvas Sneakers', price: 69, originalPrice: null, category: 'Shoes', rating: 4.6, reviews: 341, badge: '', img: '👟', colors: ['#f5f5f0', '#2d2d2d', '#8b1a1a'] },
]

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Accessories', 'Bags', 'Shoes']

export default function EcommerceTemplate() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cartCount, setCartCount] = useState(0)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory)

  const addToCart = (id: number) => {
    setCartCount(c => c + 1)
    setAddedToCart(id)
    setTimeout(() => setAddedToCart(null), 1500)
  }

  const toggleWishlist = (id: number) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] overflow-x-hidden"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500&display=swap');
        .jost { font-family: 'Jost', sans-serif; }
        .product-card:hover .product-overlay { opacity: 1; }
        .product-card:hover img { transform: scale(1.05); }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .cart-toast { animation: slideIn 0.3s ease; }
      `}</style>

      {/* Top bar */}
      <div className="bg-[#1a1a1a] text-white text-center py-2.5 jost text-xs tracking-widest uppercase">
        Free shipping on orders over $150 · Use code WELCOME20 for 20% off
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#f9f8f6] border-b border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-8 jost text-xs tracking-[0.2em] uppercase text-black/50">
            {['Collections', 'New In', 'Sale'].map(item => (
              <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
            ))}
          </div>

          <div className="text-3xl font-bold tracking-tight mx-auto md:mx-0">
            MAISON
          </div>

          <div className="flex items-center gap-5">
            <button className="jost text-xs tracking-widest uppercase text-black/50 hover:text-black transition-colors">
              🔍
            </button>
            <button className="jost text-xs tracking-widest uppercase text-black/50 hover:text-black transition-colors">
              ♡ {wishlist.length > 0 && <span className="text-red-500">({wishlist.length})</span>}
            </button>
            <button className="relative jost text-xs tracking-widest uppercase text-black/50 hover:text-black transition-colors">
              ☐ Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 w-4 h-4 rounded-full bg-black text-white
                  text-[10px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart toast */}
      {addedToCart && (
        <div className="fixed top-20 right-6 z-50 cart-toast
          bg-black text-white jost text-sm px-5 py-3 flex items-center gap-2">
          <span>✓</span> Added to cart
        </div>
      )}

      {/* Hero */}
      <section className="relative h-[85vh] bg-[#1a1a1a] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[#2d2416] flex items-center justify-center">
          <div className="text-[200px] opacity-10">🌿</div>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-8 text-white">
          <p className="jost text-xs tracking-[0.4em] uppercase text-white/50 mb-6">
            New Collection — Spring 2026
          </p>
          <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] mb-8">
            Quiet<br /><em className="font-normal">Luxury</em>
          </h1>
          <p className="jost text-white/60 max-w-xs mb-10 text-lg font-light leading-relaxed">
            Timeless pieces crafted for those who value quality over quantity.
          </p>
          <div className="flex gap-4">
            <button className="jost text-xs tracking-[0.3em] uppercase
              bg-white text-black px-10 py-4 hover:bg-white/90 transition-colors">
              Shop Collection
            </button>
            <button className="jost text-xs tracking-[0.3em] uppercase
              border border-white/30 text-white px-10 py-4 hover:border-white/60 transition-colors">
              Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-12 px-6 border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-0">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`jost text-[11px] tracking-[0.3em] uppercase px-6 py-3
                border-b-2 transition-all duration-200
                ${activeCategory === cat
                  ? 'border-black text-black'
                  : 'border-transparent text-black/35 hover:text-black/60'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(product => (
            <div key={product.id} className="product-card group cursor-pointer">
              {/* Image */}
              <div className="relative overflow-hidden bg-[#efefea] mb-5 aspect-[3/4]
                flex items-center justify-center">
                <div className="text-8xl">{product.img}</div>
                {product.badge && (
                  <span className={`absolute top-4 left-4 jost text-[9px] tracking-[0.2em] uppercase
                    px-3 py-1.5 font-medium
                    ${product.badge === 'Sale' ? 'bg-red-500 text-white' :
                      product.badge === 'New' ? 'bg-black text-white' :
                      'bg-amber-100 text-amber-800'}`}>
                    {product.badge}
                  </span>
                )}
                {/* Overlay */}
                <div className="product-overlay absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300
                  flex items-end justify-center pb-6">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="jost text-[10px] tracking-[0.25em] uppercase
                      bg-white text-black px-8 py-3.5 hover:bg-black hover:text-white
                      transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white
                    flex items-center justify-center text-sm transition-transform hover:scale-110">
                  {wishlist.includes(product.id) ? '♥' : '♡'}
                </button>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <div className="text-right">
                    <div className="font-medium">${product.price}</div>
                    {product.originalPrice && (
                      <div className="jost text-xs text-black/35 line-through">${product.originalPrice}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="jost text-xs text-black/40 flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {product.rating} ({product.reviews})
                  </div>
                  <div className="flex gap-1 ml-auto">
                    {product.colors.map(color => (
                      <div key={color} className="w-3 h-3 rounded-full border border-black/10"
                        style={{ background: color }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 border-t border-black/[0.06] bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['🚚', 'Free Shipping', 'On orders over $150'],['↩', 'Easy Returns', '30 days, no questions'],['🔒', 'Secure Payment', '256-bit encryption'],['🌿', 'Sustainable', 'Ethical manufacturing']].map(([icon, title, desc]) => (
            <div key={title}>
              <div className="text-3xl mb-3">{icon}</div>
              <div className="font-semibold mb-1">{title}</div>
              <div className="jost text-xs text-black/40">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-8 bg-[#1a1a1a] text-white/40 jost text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>MAISON</span>
          <p>© 2026 Maison. All rights reserved.</p>
          <Link href="/website-templates/ecommerce"
            className="text-gold/50 hover:text-gold transition-colors">
            Template by CodeaPlus →
          </Link>
        </div>
      </footer>
    </div>
  )
}