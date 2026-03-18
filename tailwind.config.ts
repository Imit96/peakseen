import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', '-apple-system', 'Helvetica Neue', 'sans-serif'],
        body: ['var(--font-body)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
      },
      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1.4' }],
        sm:   ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem',     { lineHeight: '1.7' }],
        lg:   ['1.125rem', { lineHeight: '1.7' }],
        xl:   ['1.25rem',  { lineHeight: '1.5' }],
        '2xl':  ['1.5rem',   { lineHeight: '1.3' }],
        '3xl':  ['1.875rem', { lineHeight: '1.3' }],
        '4xl':  ['2.25rem',  { lineHeight: '1.15' }],
        '5xl':  ['3rem',     { lineHeight: '1.1' }],
        '6xl':  ['3.75rem',  { lineHeight: '1.05' }],
        '7xl':  ['4.5rem',   { lineHeight: '1.05' }],
        '8xl':  ['6rem',     { lineHeight: '1.0' }],
      },
      colors: {
        charcoal: '#1A1A1A',
        ivory: '#F9F8F6',
        accent: {
          DEFAULT: '#D95C3C',
          hover: '#C14E31',
          subtle: 'rgba(217, 92, 60, 0.10)',
        },
        grey: {
          50:  '#F4F4F2',
          100: '#EBEBEB',
          200: '#D4D4D4',
          300: '#ABABAB',
          400: '#8C8C8C',
          500: '#6B6B6B',
          600: '#4A4A4A',
          700: '#3D3D3D',
          800: '#2C2C2C',
          900: '#1A1A1A',
        },
        success: {
          DEFAULT: '#1B7A4A',
          light: '#E8F5EE',
        },
        warning: {
          DEFAULT: '#C4841D',
          light: '#FFF5E0',
        },
        error: {
          DEFAULT: '#C93B3B',
          light: '#FDECEC',
        },
        info: {
          DEFAULT: '#2B5BEE',
          light: '#EBF0FF',
        },
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(26, 26, 26, 0.08)',
        md: '0 4px 16px rgba(26, 26, 26, 0.12)',
        lg: '0 8px 32px rgba(26, 26, 26, 0.16)',
        accent: '0 4px 24px rgba(217, 92, 60, 0.25)',
      },
      maxWidth: {
        prose: '680px',
      },
      height: {
        13: '3.25rem',
      },
      spacing: {
        13: '3.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
