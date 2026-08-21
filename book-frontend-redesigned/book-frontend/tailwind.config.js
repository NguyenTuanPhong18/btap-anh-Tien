/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#f7f5f1', 100: '#f1eee7', 200: '#e8e3d8' },
        ink: {
          50: '#f4f5f7', 100: '#e3e6ec', 300: '#8b95a8', 400: '#5b6b82',
          600: '#2c384c', 800: '#161d2c', 900: '#0d1119',
        },
        brass: { 400: '#d9a85c', 500: '#c8903f', 600: '#a8752f' },
        moss: { 500: '#4b6355', 600: '#3a4e42' },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,17,25,0.04), 0 8px 24px -12px rgba(13,17,25,0.12)',
        'card-hover': '0 4px 10px rgba(13,17,25,0.06), 0 16px 32px -12px rgba(13,17,25,0.18)',
      },
    },
  },
  plugins: [],
};
