/**
 * PayslipListItem component for displaying a payslip in the list
 *
 * This component is specific to PayslipListScreen and should not be shared.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../../../theme';
import { Payslip, FileType } from '../../../store/models/Payslip';
import { formatDateRange } from '../../../utils/dateUtils';
import { getFileTypeLabel } from '../../../utils/fileUtils';
import { Card } from '../../../components/Card';
import { ICONS } from '../../../utils/constants';

interface PayslipListItemProps {
  payslip: Payslip;
  onPress: (id: string) => void;
}

export const PayslipListItem = React.memo(function PayslipListItem({
  payslip,
  onPress,
}: PayslipListItemProps) {
  const dateRange = formatDateRange(payslip.fromDate, payslip.toDate);
  const fileTypeLabel = getFileTypeLabel(payslip.file.type);

  const handlePress = () => onPress(payslip.id);

  return (
    <Card
      style={styles.container}
      onPress={handlePress}
      testID={`payslip-item-${payslip.id}`}
      accessibilityLabel={`Payslip ${payslip.id}, ${dateRange}, ${fileTypeLabel}`}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {payslip.file.type === FileType.PDF ? ICONS.pdf : ICONS.image}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.dateRange} numberOfLines={1}>
            {dateRange}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            ID: {payslip.id} • {fileTypeLabel}
          </Text>
        </View>
        <View style={styles.chevronContainer}>
          <Text style={styles.chevron}>›</Text>
        </View>
      </View>
    </Card>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.n3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.n3,
  },
  icon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  dateRange: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.n1,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  chevronContainer: {
    paddingLeft: spacing.n2,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.textLight,
  },
});
