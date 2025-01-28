import { colors } from './src/styles/colors'

const { hairlineWidth } = require('nativewind/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'lexend-thin': ['Lexend-Thin', 'sans-serif'],
        'lexend-light': ['Lexend-Light', 'sans-serif'],
        'lexend-regular': ['Lexend-Regular', 'sans-serif'],
        'lexend-medium': ['Lexend-Medium', 'sans-serif'],
        'lexend-semibold': ['Lexend-SemiBold', 'sans-serif'],
        'lexend-bold': ['Lexend-Bold', 'sans-serif'],
      },
      colors,
      borderWidth: { hairline: hairlineWidth() },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
