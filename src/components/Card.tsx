/**
 * Card component for consistent container styling
 */

import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  AccessibilityProps,
} from 'react-native';
import { colors, spacing } from '../theme';

interface CardProps extends AccessibilityProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  testID?: string;
}

export function Card({
  children,
  style,
  onPress,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...accessibilityProps
}: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        {...accessibilityProps}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[styles.card, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...accessibilityProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.n4,
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
