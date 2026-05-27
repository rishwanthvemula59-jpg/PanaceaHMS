/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: { DEFAULT: '#6D28D9', 600: '#5B21B6', 700: '#4C1D95', 500: '#7C3AED' },
        accent: '#D946EF',
        deep: '#2E1065',
        navy: '#0F172A',
        lavender: '#F5F3FF',
        'soft-lavender': '#FAF5FF',
        emergency: '#DC2626',
        success: '#16A34A',
        ink: '#0F0A1A',
        muted: '#6B6478',
      },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem' },
      boxShadow: {
        card: '0 1px 2px rgba(36,11,54,.04), 0 8px 24px -8px rgba(36,11,54,.08)',
        cardHover: '0 6px 14px rgba(36,11,54,.06), 0 24px 48px -16px rgba(36,11,54,.18)',
        ring: '0 0 0 4px rgba(139,44,194,.18)',
      },
    },
  },
  plugins: [],
}
