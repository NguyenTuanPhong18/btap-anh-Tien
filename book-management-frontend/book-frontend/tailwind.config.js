/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bảng màu: xanh navy đậm (tri thức, tin cậy) + vàng đồng ấm (giấy sách cũ) làm điểm nhấn
        ink: {
          50: '#f3f5f7',
          100: '#e2e6ec',
          400: '#5b6b82',
          600: '#324158',
          800: '#1c2637',
          900: '#11161f',
        },
        brass: {
          400: '#d9a85c',
          500: '#c8903f',
          600: '#a8752f',
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
