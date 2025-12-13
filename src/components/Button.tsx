/**
 * Button component with accessibility support
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  AccessibilityProps,
} from 'react-native';
import { colors, spacing, fontSize } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends AccessibilityProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

/**
 * Returns the container style for a button variant
 */
const getVariantStyle = (
  variant: ButtonVariant,
  disabled: boolean,
): ViewStyle => {
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: disabled ? colors.textLight : colors.primary,
    },
    secondary: {
      backgroundColor: disabled ? colors.border : colors.backgroundSecondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? colors.textLight : colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };
  return variantStyles[variant];
};

/**
 * Returns the text style for a button variant
 */
const getTextVariantStyle = (
  variant: ButtonVariant,
  disabled: boolean,
): TextStyle => {
  const variantStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: colors.white,
    },
    secondary: {
      color: colors.text,
    },
    outline: {
      color: disabled ? colors.textLight : colors.primary,
    },
    ghost: {
      color: disabled ? colors.textLight : colors.primary,
    },
  };
  return variantStyles[variant];
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...accessibilityProps
}: ButtonProps) {
  const sizeStyle = sizeStyles[size];
  const textSizeStyle = textSizeStyles[size];

  return (
    <TouchableOpacity
      style={[styles.button, sizeStyle, getVariantStyle(variant, disabled), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      {...accessibilityProps}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary}
          style={styles.loader}
        />
      ) : null}
      <Text
        style={[
          styles.buttonText,
          textSizeStyle,
          getTextVariantStyle(variant, disabled),
          loading && styles.loadingText,
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const sizeStyles = StyleSheet.create({
  small: {
    paddingVertical: spacing.n2,
    paddingHorizontal: spacing.n3,
  },
  medium: {
    paddingVertical: spacing.n3,
    paddingHorizontal: spacing.n4,
  },
  large: {
    paddingVertical: spacing.n4,
    paddingHorizontal: spacing.n6,
  },
});

const textSizeStyles = StyleSheet.create({
  small: {
    fontSize: fontSize.md,
  },
  medium: {
    fontSize: fontSize.lg,
  },
  large: {
    fontSize: fontSize.xxl,
  },
});

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loader: {
    marginRight: 8,
  },
  loadingText: {
    marginLeft: 4,
  },
  buttonText: {
    fontWeight: '600',
  },
});
