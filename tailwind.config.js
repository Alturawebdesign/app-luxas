/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Thomas Nurit — liquid glass NOIR & VERT
        ink: {
          DEFAULT: '#0A0F0D',
          soft: '#232A27',
          muted: '#6B7772',
        },
        paper: {
          50: '#FAFBFA',
          100: '#F1F5F3',
          200: '#E5EBE7',
          300: '#D3DCD6',
        },
        // near-black (accents sombres = « noir »)
        forest: {
          700: '#15231C',
          800: '#0C1712',
          900: '#05100B',
        },
        // accent principal = VERT
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
        },
        // pop vert clair / menthe
        lime: {
          100: '#DCFCE7',
          300: '#86EFAC',
          400: '#4ADE80',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -3px rgba(6,17,12,0.08), 0 18px 42px -22px rgba(6,17,12,0.3)',
        card: '0 2px 10px -3px rgba(6,17,12,0.1), 0 26px 52px -26px rgba(6,17,12,0.34)',
        glow: '0 8px 26px -6px rgba(16,185,129,0.5)',
        'glow-lg': '0 16px 46px -10px rgba(16,185,129,0.55)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 22px 48px -24px rgba(6,17,12,0.26)',
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
