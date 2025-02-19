/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["DM Sans Variable", ...fontFamily.sans]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      backgroundColor: {
        mixedPlastic: 'hsl(var(--chart-1))',
        metal: 'hsl(var(--chart-2))',
        rubber: 'hsl(var(--chart-3))',
        preventionNet: 'hsl(var(--chart-4))',
        ghostNet: 'hsl(var(--chart-5))',
        rope: 'hsl(var(--chart-6))',
        other: 'hsl(var(--chart-7))',
        fishingForLitter: 'hsl(var(--chart-8))',
        adHoc: 'hsl(var(--chart-9))',
        prevention: 'hsl(var(--chart-10))',
        beach: 'hsl(var(--chart-11))'
      },
  		colors: {
        softBlack: 'hsl(var(--softBlack))',
        darkSand: 'hsl(var(--darkSand))',
        sand: 'hsl(var(--sand))',
        ocean: 'hsl(var(--ocean))',
        mixedPlastic: 'hsl(var(--mixedPlastic))',
        metal: 'hsl(var(--metal))',
        rubber: 'hsl(var(--rubber))',
        preventionNet: 'hsl(var(--preventionNet))',
        ghostNet: 'hsl(var(--ghostNet))',
        rope: 'hsl(var(--rope))',
        other: 'hsl(var(--other))',
        fishingForLitter: 'hsl(var(--fishingForLitter))',
        adHoc: 'hsl(var(--adHoc))',
        prevention: 'hsl(var(--prevention))',
        beach: 'hsl(var(--beach))',
        port: 'hsl(var(--port))',
        recycler: 'hsl(var(--recycler))',
        manufacturer: 'hsl(var(--manufacturer))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  safelist: [
    'bg-mixedPlastic',
    'bg-metal',
    'bg-rubber',
    'bg-preventionNet',
    'bg-ghostNet',
    'bg-rope',
    'bg-other',
    'bg-fishingForLitter',
    'bg-adHoc',
    'bg-prevention',
    'bg-beach'
  ],
  plugins: [require("tailwindcss-animate")],
}

