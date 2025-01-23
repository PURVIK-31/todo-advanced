/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#F5F5F5',
        'light-sidebar': '#FFFFFF',
        'light-surface': '#FFFFFF',
        'light-input': '#F0F0F0',
        'accent-green': '#4CAF50',
        'light-border': '#E5E5E5',
        'light-text': '#333333',
        'light-text-secondary': '#666666',
        
        // Dark theme colors
        'dark-bg': '#1E1E1E',
        'dark-sidebar': '#252526',
        'dark-surface': '#2D2D2D',
        'dark-input': '#3C3C3C',
        'dark-border': '#404040',
        'dark-text': '#FFFFFF',
        'dark-text-secondary': '#A0A0A0',
      },
    },
  },
  plugins: [],
};