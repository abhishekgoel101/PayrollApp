/**
 * YearFilter component for filtering by year
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { LABELS } from '../utils/constants';

interface YearFilterProps {
  years: number[];
  selectedYear?: number;
  onSelectYear: (year: number | undefined) => void;
}

export function YearFilter({
  years,
  selectedYear,
  onSelectYear,
}: YearFilterProps) {
  return (
    <View style={styles.container} testID="year-filter">
      <Text style={styles.label} accessibilityRole="text">
        {LABELS.filterByYear}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[
            styles.yearChip,
            selectedYear === undefined
              ? styles.chipSelected
              : styles.chipUnselected,
          ]}
          onPress={() => onSelectYear(undefined)}
          accessibilityRole="button"
          accessibilityLabel="Show all years"
          accessibilityState={{ selected: selectedYear === undefined }}>
          <Text
            style={[
              styles.yearText,
              selectedYear === undefined
                ? styles.yearTextSelected
                : styles.yearTextUnselected,
            ]}>
            {LABELS.all}
          </Text>
        </TouchableOpacity>
        {years.map((year) => {
          const isSelected = selectedYear === year;
          return (
            <TouchableOpacity
              key={year}
              style={[
                styles.yearChip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
              ]}
              onPress={() => onSelectYear(year)}
              accessibilityRole="button"
              accessibilityLabel={`Filter by year ${year}`}
              accessibilityState={{ selected: isSelected }}>
              <Text
                style={[
                  styles.yearText,
                  isSelected ? styles.yearTextSelected : styles.yearTextUnselected,
                ]}>
                {year}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  scrollContent: {
    flexDirection: 'row',
    gap: spacing.n2,
    paddingRight: spacing.n4,
  },
  yearChip: {
    paddingVertical: 6,
    paddingHorizontal: spacing.n3,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipUnselected: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.border,
  },
  yearText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  yearTextSelected: {
    color: colors.white,
  },
  yearTextUnselected: {
    color: colors.text,
  },
});
