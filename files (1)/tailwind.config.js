export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: { extend: { fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    keyframes: { fade: { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'none' } },
      pop: { from: { opacity: 0, transform: 'scale(.96)' }, to: { opacity: 1, transform: 'none' } } },
    animation: { fade: 'fade .25s ease-out', pop: 'pop .15s ease-out' } } },
}
