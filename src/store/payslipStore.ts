/**
 * Zustand store for payslip state management
 */

import { create } from 'zustand';
import { Payslip, SortOrder, PayslipFilters } from './models/Payslip';
import { mockPayslips } from '../data';
import { getYearFromDate, getUniqueYears } from '../utils/dateUtils';

interface PayslipState {
  // State
  payslips: Payslip[];
  sortOrder: SortOrder;
  filters: PayslipFilters;

  // Computed (derived state)
  availableYears: number[];
  filteredPayslips: Payslip[];

  // Actions
  setSortOrder: (order: SortOrder) => void;
  setFilters: (filters: Partial<PayslipFilters>) => void;
}

/**
 * Computes filtered and sorted payslips based on current state
 */
const computeFilteredPayslips = (
  payslips: Payslip[],
  sortOrder: SortOrder,
  filters: PayslipFilters,
): Payslip[] => {
  let result = [...payslips];

  // Apply year filter
  if (filters.year) {
    result = result.filter((p) => {
      const fromYear = getYearFromDate(p.fromDate);
      const toYear = getYearFromDate(p.toDate);
      return fromYear === filters.year || toYear === filters.year;
    });
  }

  // Apply search filter
  if (filters.searchQuery && filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter((p) => {
      return (
        p.id.toLowerCase().includes(query) ||
        p.fromDate.includes(query) ||
        p.toDate.includes(query) ||
        p.file.name.toLowerCase().includes(query)
      );
    });
  }

  // Apply sorting
  result.sort((a, b) => {
    const dateA = new Date(a.toDate).getTime();
    const dateB = new Date(b.toDate).getTime();
    return sortOrder === SortOrder.NEWEST ? dateB - dateA : dateA - dateB;
  });

  return result;
};

/**
 * Payslip store using Zustand
 */
export const usePayslipStore = create<PayslipState>((set, get) => {
  // Initial computed values
  const initialPayslips = mockPayslips;
  const initialSortOrder: SortOrder = SortOrder.NEWEST;
  const initialFilters: PayslipFilters = {};
  const dates = initialPayslips.flatMap((p) => [p.fromDate, p.toDate]);

  return {
    // Initial state
    payslips: initialPayslips,
    sortOrder: initialSortOrder,
    filters: initialFilters,
    availableYears: getUniqueYears(dates),
    filteredPayslips: computeFilteredPayslips(
      initialPayslips,
      initialSortOrder,
      initialFilters,
    ),

    // Actions
    setSortOrder: (order: SortOrder) => {
      const { payslips, filters } = get();
      set({
        sortOrder: order,
        filteredPayslips: computeFilteredPayslips(payslips, order, filters),
      });
    },

    setFilters: (newFilters: Partial<PayslipFilters>) => {
      const { payslips, sortOrder, filters } = get();
      // Merge with existing filters
      const mergedFilters = { ...filters, ...newFilters };
      set({
        filters: mergedFilters,
        filteredPayslips: computeFilteredPayslips(payslips, sortOrder, mergedFilters),
      });
    },
  };
});
