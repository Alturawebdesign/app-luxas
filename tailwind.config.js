/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, editorial palette inspired by The Look by Lilia
        cream: {
          50: '#FBFAF7',
          100: '#F5F2EC',
          200: '#EDE8DF',
          300: '#E1D9CB',
        },
        ink: {
          DEFAULT: '#1A1A18',
          soft: '#3A3A36',
          muted: '#6B6A63',
        },
        camel: {
          50: '#F7F1E9',
          100: '#EBDCC7',
          200: '#D9BE9C',
          300: '#C7A277',
          400: '#B8895A',
          500: '#A5744A',
          600: '#8A5E3B',
        },
        sage: {
          100: '#E6EBE4',
          400: '#8CA084',
          600: '#5E7256',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(26,26,24,0.04), 0 8px 24px -12px rgba(26,26,24,0.10)',
        card: '0 1px 2px rgba(26,26,24,0.05), 0 12px 32px -16px rgba(26,26,24,0.14)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
