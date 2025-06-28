export const fonts = {
  primary: {
    regular: 'SpaceGrotesk-Regular',
    medium: 'SpaceGrotesk-Medium',
    bold: 'SpaceGrotesk-Bold',
    mono: 'SpaceGrotesk-Regular'
  },
  secondary: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold'
  },
  decorative: {
    regular: 'Orbitron-Regular',
    bold: 'Orbitron-Bold'
  }
} as const;

export type FontTheme = typeof fonts;
