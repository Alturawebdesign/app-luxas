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
        glow: '0 0 0 1px rgba(16,185,129,0.18), 0 8px 30px -8px rgba(16,185,129,0.35)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
