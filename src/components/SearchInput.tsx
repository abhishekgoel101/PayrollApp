/**
 * SearchInput component for filtering payslips
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  AccessibilityProps,
} from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { useDebouncedCallback } from '../hooks/useDebounce';

interface SearchInputProps extends AccessibilityProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** Debounce delay in ms. Default: 300. Set to 0 to disable. */
  debounceMs?: number;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search...',
  accessibilityLabel,
  debounceMs = 300,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const { debouncedCallback, cancel } = useDebouncedCallback(
    onChangeText,
    debounceMs,
  );

  // Sync local value when parent value changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    setLocalValue(text);
    debouncedCallback(text);
  };

  const handleClear = () => {
    setLocalValue('');
    cancel();
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={localValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        testID="search-input"
        accessibilityLabel={accessibilityLabel || 'Search input'}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {localValue.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          accessibilityRole="button">
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    height: 44,
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.border,
    paddingHorizontal: spacing.n3,
  },
  searchIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing.n2,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.lg,
    paddingVertical: spacing.n2,
  },
  clearButton: {
    padding: spacing.n1,
  },
  clearIcon: {
    fontWeight: '600',
    color: colors.textSecondary,
    fontSize: fontSize.lg,
  },
});
