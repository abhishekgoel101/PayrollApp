/**
 * Spacing constants for consistent layout
 * Numeric scale: n1 = 4px, n2 = 8px, etc.
 */

export const spacing = {
  n0: 0,
  n1: 4,
  n2: 8,
  n3: 12,
  n4: 16,
  n5: 20,
  n6: 24,
  n8: 32,
  n10: 40,
  n12: 48,
  n16: 64,
} as const;

export type SpacingKey = keyof typeof spacing;
