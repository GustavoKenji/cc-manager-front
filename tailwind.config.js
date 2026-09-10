/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Chrome neutro do app — as cores vivas ficam por conta de cada
        // cartão (bandeira/banco), não da interface.
        paper: '#F7F7F4', // fundo
        ink: '#22261F', // texto principal (nunca preto puro)
        muted: '#6B7066', // texto secundário
        line: '#E3E3DC', // bordas e divisores
        surface: '#FFFFFF', // cards e superfícies elevadas
        // Único acento da UI: verde escuro abafado, usado com moderação
        // em botões primários e links.
        primary: {
          DEFAULT: '#1F5C4A',
          hover: '#184A3C',
        },
        warning: '#8A5A1E',
        'warning-bg': '#F3E7D3',
        danger: '#8A2E22',
        'danger-bg': '#F3DCD6',
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
      },
    },
  },
  plugins: [],
};
