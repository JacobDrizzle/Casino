import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'b-gold': 'rgba(244, 196, 88, 0.8)',
        'b-black': 'rgba(0, 0, 0, 0.7)',
      },
      width: {
        'win-card': '263.5px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: any, variants?: any) => void }) {
      const newUtilities = {
        '.authButton': {
          width: '3.2rem',
          height: '2.5rem',
          backgroundColor: 'rgba(60,60,60,0.8)',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.2)',
          borderRadius: '0.5rem', // Changed to 0.5rem for the example
          transitionProperty: 'color, background-color, borderColor',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-in-out',
          '&:hover': {
            color: '#63b3ed',
            backgroundColor:'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,0.6)'
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

export default config
