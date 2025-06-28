export const colors = {
  // Primary cosmic palette
  cosmic: {
    primary: '#6B4EFF',    // Deep cosmic purple
    secondary: '#FF4E8C',  // Nebula pink
    tertiary: '#4EFFD1',   // Stellar teal
    accent: '#FFD700',     // Golden stardust
  },
  
  // Background gradients
  backgrounds: {
    main: '#0A0A1F',       // Deep space
    card: '#151530',       // Cosmic dust
    modal: '#1A1A3A',      // Nebula cloud
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',    // Pure starlight
    secondary: '#B4B4D4',  // Cosmic mist
    accent: '#FFD700',     // Golden stardust
    muted: '#6B6B8B',      // Cosmic dust
  },
  
  // UI elements
  ui: {
    success: '#4EFF8B',    // Growth green
    warning: '#FFB84E',    // Supernova orange
    error: '#FF4E4E',      // Red giant
    info: '#4E8BFF',       // Blue star
  },
  
  // Special effects
  effects: {
    glow: 'rgba(107, 78, 255, 0.2)',  // Cosmic aura
    shadow: 'rgba(0, 0, 0, 0.5)',     // Space shadow
  },
  
  status: {
    success: '#4EFFD1',    // Stellar teal
    warning: '#FFD700',    // Golden stardust
    error: '#FF4E8C',      // Nebula pink
  },
  
  gradients: {
    primary: ['#6B4EFF', '#4EFFD1'],
    secondary: ['#FF4E8C', '#FFD700'],
    background: ['#0A0A1F', '#151530'],
  },
} as const;

export type ColorTheme = typeof colors;
