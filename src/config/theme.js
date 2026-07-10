/**
 * Theme configuration module mirroring the CSS tokens.
 * Useful for Three.js logic and Javascript animations.
 */

export const THEME = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    charcoal: '#111111',
    cerulean: '#3A86FF',
    softGray: '#EAEAEA',
    warmGold: '#D8A629',
    ribbonRed: '#8B1E24',
    mist: 'rgba(255, 255, 255, 0.08)',
    glassDark: 'rgba(20, 20, 20, 0.30)',
  },
  typography: {
    fontPrimary: "'Plus Jakarta Sans', sans-serif",
    fontAccent: "'Gochi Hand', cursive",
  },
  motion: {
    fast: 0.12,    // In seconds for GSAP
    normal: 0.3,
    slow: 0.6,
    heroReveal: 1.2,
  },
  easing: {
    spring: 'custom', // To be defined with CustomEase in GSAP if needed
    smooth: 'power2.inOut',
  },
  zIndices: {
    background: -10,
    terrain: -5,
    sceneObjects: 10,
    interactive: 20,
    ui: 30,
    cursor: 40,
    debug: 50,
  }
};
