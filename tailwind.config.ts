import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-dim': '#7a6028',
        'bg-primary': '#060606',
        'bg-secondary': '#0a0a0a',
        surface: '#111111',
        'surface-2': '#181818',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        mono: ['DM Mono', 'monospace'],
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        '2xs': '9px',
        'xxs': '10px',
      },
      animation: {
        // Page / reveal
        'fade-up':        'fadeUp 0.8s ease both',
        'fade-up-slow':   'fadeUp 1s ease both',
        // Floating mockups
        'float-a':        'floatA 6s ease-in-out infinite',
        'float-b':        'floatB 5s ease-in-out infinite',
        'float-c':        'floatC 7s ease-in-out infinite',
        // Logo strip
        'logo-scroll':    'logoScroll 32s linear infinite',
        // Scroll indicator
        'scroll-pulse':   'scrollPulse 2s ease-in-out infinite',
        // Cursor blink
        'blink':          'blink 1s infinite',
        // Background glow
        'bg-pulse':       'bgPulse 9s ease-in-out infinite alternate',
        // WhatsApp pulse
        'wa-pulse':       'whatsappPulse 2s ease-out infinite',
        // Chatbot ripple
        'cb-ripple':      'cbRipple 2.2s ease-out infinite',
        // Chatbot typing dots
        'cb-dot':         'cbDot 1.2s ease-in-out infinite',
        // Green online dot
        'blink-dot':      'blinkDot 2s ease-in-out infinite',
        // Code line scroll
        'code-line':      'codeLine 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatA: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-14px) rotate(0.4deg)' },
          '66%':     { transform: 'translateY(-6px) rotate(-0.3deg)' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '40%':     { transform: 'translateY(-18px) rotate(-0.5deg)' },
          '70%':     { transform: 'translateY(-8px) rotate(0.3deg)' },
        },
        floatC: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        logoScroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
        scrollPulse: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.3' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        bgPulse: {
          '0%':   { transform: 'scale(1) rotate(0deg)' },
          '100%': { transform: 'scale(1.1) rotate(3deg)' },
        },
        whatsappPulse: {
          '0%':   { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        cbRipple: {
          '0%':   { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        cbDot: {
          '0%,80%,100%': { transform: 'scale(0.7)', opacity: '0.4' },
          '40%':         { transform: 'scale(1.1)', opacity: '1' },
        },
        blinkDot: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.3' },
        },
        codeLine: {
          '0%':   { transform: 'translateX(0)',      opacity: '0' },
          '5%':   { opacity: '1' },
          '95%':  { opacity: '1' },
          '100%': { transform: 'translateX(-120px)', opacity: '0' },
        },
      },
      // Reusable animation delays
      transitionDelay: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
export default config