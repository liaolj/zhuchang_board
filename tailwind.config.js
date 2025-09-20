/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F54EB',
        warning: '#FAAD14',
        danger: '#FF4D4F',
        success: '#52C41A',
        dark: '#0B1E3C'
      }
    }
  },
  plugins: []
};
