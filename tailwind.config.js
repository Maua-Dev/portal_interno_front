/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  important: '#root',
  theme: {
    extend: {
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          hover: 'var(--color-text-hover)',
          inverted: 'var(--color-background)'
        }
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-background)',
          secundary: 'var(--color-secundary)',
          'base-foreground': 'var(--color-text-base)',
          'button-blue-accent': '--color-button-accent-blue',
          'button-blue-accent-hover': '--color-button-accent-blue-hover',
          'button-red-accent': '--color-button-accent-red',
          'button-red-accent-hover': '--color-button-accent-red-hover'
        }
      },
      borderColor: {
        skin: {
          muted: 'var(--color-text-muted)'
        }
      }
    }
  },
  plugins: []
}
