import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ivory: '#F5F3EE', sand: '#EAE6DC', charcoal: '#242721', olive: { DEFAULT: '#7D806C', deep: '#5F6250' } },
    fontFamily: { serif: ['var(--font-serif)', 'Georgia', 'serif'], sans: ['var(--font-sans)', 'system-ui', 'sans-serif'] },
    keyframes: { rise: { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'none' } } },
    animation: { rise: 'rise 1.1s cubic-bezier(.2,.7,.2,1) both' },
  } },
  plugins: [],
} satisfies Config;
