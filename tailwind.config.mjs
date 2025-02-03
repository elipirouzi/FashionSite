/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        '3xl': '1792px',
        '4xl': '2048px',
        '5xl': '2304',
      },
      width: {
        '80': '85%',
        '70': '75%',
        '60': '58%',
      },
      boxShadow: {
        'custom-light': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)', // سایه سفارشی شما
        'custom-dark': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',  // یک سایه سفارشی دیگر
      },
    },
  },
  plugins: [],
};



