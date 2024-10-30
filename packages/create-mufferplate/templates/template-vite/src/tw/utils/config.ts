import type { DefineConfig } from './types';

export default {
  isMobileFirst: true,
  breakpoints: {
    xs: '0',
    sm: '576',
    md: '768',
    lg: '992',
    xl: '1200',
    xxl: '1400',
  },
  containerMaxWidths: {
    xs: false,
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
    xxl: 1320,
  },
  fontFamily: 'Inter',
  gridGutter: 24,
  numberOfColumns: 12,
  enableRtl: false,
  disableDefaultColors: false,
  customColors: {
    primary: '#ff0000',
    secondary: '#00ff00',
    light: '#f2f2f2',
    dark: '#dddddd',
  },
  spacingUpperLimit: 200,
  spacingInterval: 2,
  zIndexLimit: 12
} satisfies DefineConfig;
