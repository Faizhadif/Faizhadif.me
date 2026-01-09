/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Google Sans"',
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "Arial",
          '"sans-serif"',
        ],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.25)",
        insetGlow: "inset 0 1px 0 rgba(255,255,255,.07)",
      },
    },
  },
};
