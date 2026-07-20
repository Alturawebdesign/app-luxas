/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Thomas Nurit — refonte « liquid glass » bleu périwinkle
        ink: {
          DEFAULT: '#1B2A4A',
          soft: '#3B4B70',
          muted: '#7C89A6',
        },
        paper: {
          50: '#FBFCFF',
          100: '#EEF2FC',
          200: '#E1E8F7',
          300: '#CED9F2',
        },
        // deep navy (accents sombres)
        forest: {
          700: '#20305C',
          800: '#17244A',
          900: '#0F1A38',
        },
        // "emerald" est REMAPPÉ en bleu = accent principal de marque
        emerald: {
          50: '#EFF4FF',
          100: '#DDE8FF',
          200: '#C0D4FE',
          300: '#97B6FD',
          400: '#6296FB',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
        },
        // "lime" remappé en cyan/sky (pop secondaire)
        lime: {
          100: '#E0F2FE',
          300: '#7DD3FC',
          400: '#38BDF8',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -3px rgba(30,58,120,0.08), 0 18px 42px -22px rgba(30,58,120,0.3)',
        card: '0 2px 10px -3px rgba(30,58,120,0.1), 0 26px 52px -26px rgba(30,58,120,0.34)',
        glow: '0 8px 26px -6px rgba(59,130,246,0.5)',
        'glow-lg': '0 16px 46px -10px rgba(59,130,246,0.55)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 22px 48px -24px rgba(30,58,120,0.28)',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
