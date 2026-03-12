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
    },
  },
  plugins: [],
}
export default config
