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
        sand: 'hsl(var(--sand))',
        ocean: 'hsl(var(--ocean))',
        mixedPlastic: 'hsl(var(--mixedPlastic))',
        nets: 'hsl(var(--nets))',
        metal: 'hsl(var(--metal))',
        rubber: 'hsl(var(--rubber))',
        port: 'hsl(var(--port))',
        recycler: 'hsl(var(--recycler))',
        factory: 'hsl(var(--factory))',
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
    'bg-plastics',
    'bg-nets',
    'bg-metal',
    'bg-rubber',
    'bg-fishingForLitter',
    'bg-adHoc',
    'bg-prevention',
    'bg-beach'
  ],
  plugins: [require("tailwindcss-animate")],
}

