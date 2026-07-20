/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Thomas Nurit — brand vert & noir (acquisition LinkedIn)
        ink: {
          DEFAULT: '#0A0F0D',
          soft: '#232A27',
          muted: '#697570',
        },
        paper: {
          50: '#FAFBFA',
          100: '#F3F6F4',
          200: '#E7ECE9',
          300: '#D6DED9',
        },
        forest: {
          700: '#0F241B',
          800: '#0A1A13',
          900: '#06110C',
        },
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
        lime: {
          300: '#BEF264',
          400: '#A3E635',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(10,15,13,0.04), 0 8px 24px -12px rgba(10,15,13,0.10)',
        card: '0 1px 2px rgba(10,15,13,0.05), 0 12px 32px -16px rgba(10,15,13,0.16)',
        glow: '0 0 0 1px rgba(16,185,129,0.25), 0 10px 34px -8px rgba(16,185,129,0.5)',
        'glow-lg': '0 0 0 1px rgba(16,185,129,0.3), 0 20px 60px -12px rgba(16,185,129,0.55)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 2px rgba(10,15,13,0.04), 0 20px 44px -22px rgba(6,17,12,0.45)',
        'glass-dark': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px -24px rgba(0,0,0,0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%,-1.5%,0) scale(1.08)' },
          '100%': { transform: 'translate3d(-2%,2%,0) scale(1.04)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        aurora: 'aurora 24s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
