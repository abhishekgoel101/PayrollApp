/**
 * App color palette
 */

export const colors = {
  // Primary colors
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#3B82F6',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundDark: '#1E293B',
  backgroundDarkSecondary: '#0F172A',

  // Text colors
  text: '#1E293B',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  textDark: '#F8FAFC',
  textDarkSecondary: '#CBD5E1',

  // Border colors
  border: '#E2E8F0',
  borderDark: '#334155',

  // Status colors
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Card colors
  card: '#FFFFFF',
  cardDark: '#1E293B',
};

export type ColorKey = keyof typeof colors;
