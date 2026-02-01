import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        heart: {
          DEFAULT: "hsl(var(--heart))",
          glow: "hsl(var(--heart-glow))",
        },
        cloud: {
          DEFAULT: "hsl(var(--cloud))",
          shadow: "hsl(var(--cloud-shadow))",
        },
        ground: {
          DEFAULT: "hsl(var(--ground))",
          highlight: "hsl(var(--ground-highlight))",
        },
        sparkle: {
          DEFAULT: "hsl(var(--sparkle))",
          pink: "hsl(var(--sparkle-pink))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "heart-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-5deg)" },
          "50%": { transform: "translateY(-15px) rotate(5deg)" },
        },
        "heart-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-10px) translateX(5px)" },
          "66%": { transform: "translateY(-5px) translateX(-5px)" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100vw)" },
          "100%": { transform: "translateX(-100px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "heart-float": "heart-float 3s ease-in-out infinite",
        "heart-pulse": "heart-pulse 1.5s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 1s ease-in-out infinite",
        "wiggle": "wiggle 2s ease-in-out infinite",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "slide-left": "slide-left 4s linear forwards",
      },
      boxShadow: {
        'soft': '0 4px 20px hsl(340 80% 65% / 0.2)',
        'button': '0 6px 25px hsl(350 85% 60% / 0.3)',
        'glow': '0 0 30px hsl(350 90% 65% / 0.4)',
        'heart': '0 0 20px hsl(350 90% 65% / 0.5)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
