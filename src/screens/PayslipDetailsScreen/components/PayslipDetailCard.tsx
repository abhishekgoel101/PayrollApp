/**
 * PayslipDetailCard component for displaying payslip information
 *
 * This component is specific to PayslipDetailsScreen and should not be shared.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../../../theme';
import { Payslip, FileType } from '../../../store/models/Payslip';
import { formatDate } from '../../../utils/dateUtils';
import { getFileTypeLabel } from '../../../utils/fileUtils';
import { Card } from '../../../components/Card';
import { PAYSLIP_DETAILS_STRINGS } from '../utils/constants';
import { ICONS } from '../../../utils/constants';

interface PayslipDetailCardProps {
  payslip: Payslip;
}

export function PayslipDetailCard({ payslip }: PayslipDetailCardProps) {
  const detailRows = [
    { label: PAYSLIP_DETAILS_STRINGS.card.labels.payslipId, value: payslip.id },
    { label: PAYSLIP_DETAILS_STRINGS.card.labels.fromDate, value: formatDate(payslip.fromDate) },
    { label: PAYSLIP_DETAILS_STRINGS.card.labels.toDate, value: formatDate(payslip.toDate) },
    { label: PAYSLIP_DETAILS_STRINGS.card.labels.fileType, value: getFileTypeLabel(payslip.file.type) },
    { label: PAYSLIP_DETAILS_STRINGS.card.labels.fileName, value: payslip.file.name },
  ];

  return (
    <Card
      style={styles.container}
      testID="payslip-detail-card"
      accessibilityLabel={`Payslip details for ID ${payslip.id}`}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>
          {payslip.file.type === FileType.PDF ? ICONS.pdf : ICONS.image}
        </Text>
        <Text style={styles.headerTitle}>
          {PAYSLIP_DETAILS_STRINGS.card.title}
        </Text>
      </View>

      <View >
        {detailRows.map((row, index) => (
          <View
            key={row.label}
            style={[
              styles.detailRow,
              index < detailRows.length - 1 && styles.detailRowBorder,
            ]}
            accessibilityLabel={`${row.label}: ${row.value}`}>
            <Text style={styles.detailLabel}>{row.label}</Text>
            <Text style={styles.detailValue} numberOfLines={2}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.n4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.n4,
    paddingBottom: spacing.n3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerIcon: {
    fontSize: 28,
    marginRight: spacing.n3,
  },
  headerTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: '600',
    color: colors.text,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.n3,
  },
  detailRowBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  detailLabel: {
    fontSize: fontSize.md,
    flex: 1,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: fontSize.md,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    color: colors.text,
  },
});
