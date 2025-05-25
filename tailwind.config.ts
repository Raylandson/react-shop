// tailwind.config.js OU tailwind.config.ts
/** @type {import('tailwindcss').Config} */
export default {
  // Se for .ts, ou se .js com "type": "module" no package.json
  // module.exports = { // Se for um arquivo .js tradicional (CommonJS)
  content: [
    "./index.html", // Seu HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos relevantes dentro de src
  ],
  theme: {
    extend: {
      colors: {
        "fundo-principal": "#0D1B2A",
        "fundo-card": "#F8F9FA",
        "cta-amarelo": "#FFC107",
        "acento-ciano": "#5DADE2",
        "texto-principal-escuro": "#1F2937",
        "texto-secundario-escuro": "#6B7280",
        "texto-principal-claro": "#FFFFFF",
        "texto-secundario-claro": "#E5E7EB",
      },
    },
  },
  plugins: [],
};
