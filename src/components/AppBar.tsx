/**
 * AppBar - Reusable header component for screens
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fontSize } from '../theme';
import { ChevronLeft } from './ChevronLeft';

export interface AppBarProps {
  /** Main title text */
  title: string;
  /** Show back button - requires onBack handler */
  showBackButton?: boolean;
  /** Handler for back button press */
  onBack?: () => void;
  /** Custom style for container */
  style?: ViewStyle;
}

export function AppBar({
  title,
  showBackButton = false,
  onBack,
  style,
}: AppBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }, style]}
      testID="app-bar">
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        {showBackButton && onBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ChevronLeft size={22} color={colors.primary} />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
            accessibilityRole="header">
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: spacing.n4,
    paddingVertical: spacing.n2,
  },
  backButton: {
    marginLeft: -8,
    marginRight: spacing.n3,
    padding: spacing.n2,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: colors.text,
    fontSize: fontSize.xl,
  },
});
