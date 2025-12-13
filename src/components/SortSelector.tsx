/**
 * SortSelector component for changing sort order
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AccessibilityProps,
} from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { SortOrder } from '../store/models/Payslip';
import { LABELS, SORTING } from '../utils/constants';

interface SortSelectorProps extends AccessibilityProps {
  value: SortOrder;
  onChange: (order: SortOrder) => void;
}

export function SortSelector({
  value,
  onChange,
}: SortSelectorProps) {
  const options: { key: SortOrder; label: string }[] = [
    { key: SortOrder.NEWEST, label: SORTING.newestFirst },
    { key: SortOrder.OLDEST, label: SORTING.oldestFirst },
  ];

  return (
    <View style={styles.container} testID="sort-selector">
      <Text style={styles.label} accessibilityRole="text">
        {LABELS.sortBy}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = value === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.option,
                isSelected ? styles.optionSelected : styles.optionUnselected,
              ]}
              onPress={() => onChange(option.key)}
              accessibilityRole="button"
              accessibilityLabel={`Sort by ${option.label}`}
              accessibilityState={{ selected: isSelected }}>
              <Text
                style={[
                  styles.optionText,
                  isSelected ? styles.optionTextSelected : styles.optionTextUnselected,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSize.md,
    marginRight: spacing.n2,
    color: colors.textSecondary,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: spacing.n2,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: spacing.n3,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionUnselected: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.border,
  },
  optionText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: colors.white,
  },
  optionTextUnselected: {
    color: colors.text,
  },
});
