/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        drama: ['Aachen', 'serif'],
      },
      backgroundSize: {
        '200%': '200%',
        '300%': '300%',
        '400%': '400%',
      },
      keyframes: {
        'bg-wave': {
          '0%': {
            'clip-path': 'polygon(15% 95%, 30% 05%, 45% 95%, 60% 05%, 75% 95%, 90% 05%)',
            'background-position': '0% 50%',
          },
          '50%': {
            'clip-path': 'polygon(15% 5%, 30% 95%, 45% 5%, 60% 95%, 75% 5%, 90% 95%)',
            'background-position': '100% 50%',
          },
          '100%': {
            'clip-path': 'polygon(15% 95%, 30% 05%, 45% 95%, 60% 05%, 75% 95%, 90% 05%)',
            'background-position': '0% 50%',
          },
        },
      },
      animation: {
        'bg-wave': 'bg-wave 30s linear infinite alternate',
      },
    },
  },
  plugins: [],
}
