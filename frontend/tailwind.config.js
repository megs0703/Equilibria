/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      colors: {
        // Zen Sage Greens (matching the image)
        sage: {
          50: '#f8faf8',
          100: '#f0f4f0',
          200: '#e1e9e1',
          300: '#c8d5c8',
          400: '#a8bfa8',
          500: '#7a9b7a', // Main sage from image
          600: '#6b8a6b',
          700: '#5a7a5a',
          800: '#4a6a4a',
          900: '#3a5a3a',
        },
        // Off-white and cream tones
        cream: {
          50: '#fefefe',
          100: '#fdfdfc',
          200: '#faf9f7',
          300: '#f6f4f1',
          400: '#f1eeea',
          500: '#ebe7e2',
          600: '#d9d4ce',
          700: '#c7c1ba',
          800: '#b5aea6',
          900: '#a39b92',
        },
        // Warm terracotta accent (for buttons)
        terracotta: {
          50: '#fdf7f5',
          100: '#fbeee9',
          200: '#f6ddd3',
          300: '#f0c4b3',
          400: '#e8a389',
          500: '#d97d5c', // Matching the "Get Started" button
          600: '#c66a47',
          700: '#a8573a',
          800: '#8a4730',
          900: '#6f3a28',
        },
        // Muted neutrals
        stone: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      }
    },
  },
  plugins: [],
}