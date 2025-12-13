/**
 * PayslipListScreen - Displays a scrollable list of payslips with sorting and filtering
 */

import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';
import { usePayslipStore } from '../../store/payslipStore';
import { Payslip } from '../../store/models/Payslip';
import { PayslipListScreenProps } from './utils/types';
import { AppBar } from '../../components/AppBar';
import { SearchInput } from '../../components/SearchInput';
import { SortSelector } from '../../components/SortSelector';
import { YearFilter } from '../../components/YearFilter';
import { EmptyState } from '../../components/EmptyState';
import { PayslipListItem } from './components/PayslipListItem';
import { PAYSLIP_LIST_STRINGS } from './utils/constants';
import { ICONS } from '../../utils/constants';
import { ROUTES } from '../../navigation/routes';

export function PayslipListScreen(props: PayslipListScreenProps) {
  const insets = useSafeAreaInsets();

  const filteredPayslips = usePayslipStore((state) => state.filteredPayslips);
  const sortOrder = usePayslipStore((state) => state.sortOrder);
  const filters = usePayslipStore((state) => state.filters);
  const availableYears = usePayslipStore((state) => state.availableYears);
  const setSortOrder = usePayslipStore((state) => state.setSortOrder);
  const setFilters = usePayslipStore((state) => state.setFilters);

  const [refreshing, setRefreshing] = React.useState(false);

  const handlePayslipPress = useCallback(
    (payslipId: string) => {
      props.navigation.navigate(ROUTES.PAYSLIP_DETAILS, { payslipId });
    },
    [props.navigation],
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      setFilters({ searchQuery: text });
    },
    [setFilters],
  );

  const handleYearChange = useCallback(
    (year: number | undefined) => {
      setFilters({ year });
    },
    [setFilters],
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Payslip }) => (
      <PayslipListItem
        payslip={item}
        onPress={handlePayslipPress}
      />
    ),
    [handlePayslipPress],
  );

  const keyExtractor = useCallback((item: Payslip) => item.id, []);

  const renderEmptyState = useCallback(
    () => (
      <EmptyState
        title={PAYSLIP_LIST_STRINGS.emptyState.title}
        message={
          filters.searchQuery || filters.year
            ? PAYSLIP_LIST_STRINGS.emptyState.messageWithFilters
            : PAYSLIP_LIST_STRINGS.emptyState.messageDefault
        }
        icon={ICONS.clipboard}
      />
    ),
    [filters],
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <SearchInput
          value={filters.searchQuery || ''}
          onChangeText={handleSearchChange}
          placeholder={PAYSLIP_LIST_STRINGS.search.placeholder}
          accessibilityLabel="Search payslips"
        />
        <View style={styles.filtersRow}>
          <SortSelector
            value={sortOrder}
            onChange={setSortOrder}
          />
        </View>
        <YearFilter
          years={availableYears}
          selectedYear={filters.year}
          onSelectYear={handleYearChange}
        />
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      filters.year,
      sortOrder,
      availableYears,
      handleSearchChange,
      setSortOrder,
      handleYearChange,
    ],
  );

  return (
    <View style={styles.container}>
      <AppBar
        title={PAYSLIP_LIST_STRINGS.screen.title}
      />
      <FlatList
        data={filteredPayslips}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.n4 },
          filteredPayslips.length === 0 && styles.emptyContainer,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        style={styles.list}
        testID="payslip-list"
        accessibilityLabel="List of payslips"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: spacing.n4,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: spacing.n4,
    gap: spacing.n3,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
