/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        haboro: ['"Haboro Norm Regular"', 'serif'],
        geist: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
