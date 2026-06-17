export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d7eeff',
          200: '#b8dbff',
          300: '#86b9ff',
          400: '#4d88ff',
          500: '#2361ff',
          600: '#1c4bd4',
          700: '#193fae',
          800: '#1a3a82',
          900: '#19315f'
        }
      },
      boxShadow: {
        soft: '0 20px 45px rgba(20, 42, 92, 0.12)',
      }
    },
  },
  plugins: [],
}
