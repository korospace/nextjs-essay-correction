import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        primary: {
          50: "#dbf8ff",
          100: "#b4e6fa",
          200: "#89d5f3",
          300: "#5ec2ec",
          400: "#34b1e5",
          500: "#1a97cb",
          600: "#0a769f",
          700: "#005473",
          800: "#003348",
          900: "#00131d",
          DEFAULT: "#1a97cb",
          foreground: "#ffffff"
        },
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true
  })],
}
export default config