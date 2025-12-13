/**
 * Typography styles
 */

import { TextStyle, Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

/**
 * Font size scale
 */
export const fontSize = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 17,
  xxl: 18,
  xxxl: 20,
  h3: 20,
  h2: 24,
  h1: 28,
  display: 34,
} as const;

export type FontSizeKey = keyof typeof fontSize;

/**
 * Typography presets - complete text styles
 */
export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily,
    fontSize: fontSize.h1,
    fontWeight: '700',
    lineHeight: 34,
  },
  h2: {
    fontFamily,
    fontSize: fontSize.h2,
    fontWeight: '600',
    lineHeight: 30,
  },
  h3: {
    fontFamily,
    fontSize: fontSize.h3,
    fontWeight: '600',
    lineHeight: 26,
  },
  body: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: '600',
    lineHeight: 24,
  },
  caption: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: '400',
    lineHeight: 20,
  },
  captionBold: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: '600',
    lineHeight: 20,
  },
  small: {
    fontFamily,
    fontSize: fontSize.xs,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: '600',
    lineHeight: 20,
  },
  buttonSm: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: '600',
    lineHeight: 18,
  },
  buttonLg: {
    fontFamily,
    fontSize: fontSize.xxl,
    fontWeight: '600',
    lineHeight: 22,
  },
};

export type TypographyKey = keyof typeof typography;
