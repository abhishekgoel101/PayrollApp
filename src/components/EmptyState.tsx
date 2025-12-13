/**
 * Empty state component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
}

export function EmptyState({
  title,
  message,
  icon = '📄',
}: EmptyStateProps) {
  return (
    <View
      style={styles.container}
      testID="empty-state"
      accessibilityRole="text"
      accessibilityLabel={`${title}. ${message}`}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.n6,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.n4,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
    fontSize: fontSize.xxl,
    marginBottom: spacing.n2,
  },
  message: {
    textAlign: 'center',
    lineHeight: 20,
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});
