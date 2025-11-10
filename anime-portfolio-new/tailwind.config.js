/**
 * Tailwind CSS configuration for the anime portfolio project.
 *
 * The configuration enables class‑based dark mode and defines a handful
 * of custom colours used throughout the site.  Colour values are
 * intentionally expressed using CSS variables; these variables are
 * defined in the global stylesheet and toggled via a theme context.
 */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};