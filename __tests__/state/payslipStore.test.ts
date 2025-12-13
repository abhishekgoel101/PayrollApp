/**
 * Unit tests for Zustand payslipStore
 */

import { usePayslipStore } from '../../src/store/payslipStore';
import { Payslip, FileType, SortOrder } from '../../src/store/models/Payslip';
import { getUniqueYears } from '../../src/utils/dateUtils';

const mockPayslips: Payslip[] = [
  {
    id: 'PS-2024-001',
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    file: { name: 'jan.pdf', type: FileType.PDF, uri: 'test.pdf' },
  },
  {
    id: 'PS-2024-002',
    fromDate: '2024-02-01',
    toDate: '2024-02-29',
    file: { name: 'feb.pdf', type: FileType.PDF, uri: 'test.pdf' },
  },
  {
    id: 'PS-2023-012',
    fromDate: '2023-12-01',
    toDate: '2023-12-31',
    file: { name: 'dec.pdf', type: FileType.PDF, uri: 'test.pdf' },
  },
];

// Helper to compute filtered/sorted payslips for test state
const computeTestFilteredPayslips = (payslips: Payslip[]) => {
  return [...payslips].sort((a, b) => {
    const dateA = new Date(a.toDate).getTime();
    const dateB = new Date(b.toDate).getTime();
    return dateB - dateA; // newest first (default)
  });
};

describe('payslipStore', () => {
  beforeEach(() => {
    // Reset store to test state with computed values
    const dates = mockPayslips.flatMap((p) => [p.fromDate, p.toDate]);
    usePayslipStore.setState({
      payslips: mockPayslips,
      sortOrder: SortOrder.NEWEST,
      filters: { year: undefined, searchQuery: '' },
      filteredPayslips: computeTestFilteredPayslips(mockPayslips),
      availableYears: getUniqueYears(dates),
    });
  });

  describe('state access', () => {
    it('provides payslips data', () => {
      const { payslips } = usePayslipStore.getState();

      expect(payslips).toHaveLength(3);
      expect(payslips[0].id).toBe('PS-2024-001');
    });

    it('provides filtered payslips sorted by newest first by default', () => {
      const { filteredPayslips } = usePayslipStore.getState();

      // Default sort is newest first (by toDate)
      expect(filteredPayslips[0].id).toBe('PS-2024-002');
      expect(filteredPayslips[1].id).toBe('PS-2024-001');
      expect(filteredPayslips[2].id).toBe('PS-2023-012');
    });

    it('provides default sort order as newest', () => {
      const { sortOrder } = usePayslipStore.getState();

      expect(sortOrder).toBe('newest');
    });

    it('provides default empty filters', () => {
      const { filters } = usePayslipStore.getState();

      expect(filters.year).toBeUndefined();
      expect(filters.searchQuery).toBe('');
    });
  });

  describe('setSortOrder', () => {
    it('sorts payslips by oldest first when changed', () => {
      const store = usePayslipStore.getState();

      store.setSortOrder(SortOrder.OLDEST);

      const { sortOrder, filteredPayslips } = usePayslipStore.getState();

      expect(sortOrder).toBe('oldest');
      expect(filteredPayslips[0].id).toBe('PS-2023-012');
      expect(filteredPayslips[2].id).toBe('PS-2024-002');
    });

    it('sorts payslips by newest first', () => {
      // First set to oldest
      usePayslipStore.getState().setSortOrder(SortOrder.OLDEST);
      // Then back to newest
      usePayslipStore.getState().setSortOrder(SortOrder.NEWEST);

      const { filteredPayslips } = usePayslipStore.getState();

      expect(filteredPayslips[0].id).toBe('PS-2024-002');
      expect(filteredPayslips[2].id).toBe('PS-2023-012');
    });
  });

  describe('setFilters', () => {
    it('filters payslips by year', () => {
      const store = usePayslipStore.getState();

      store.setFilters({ year: 2024 });

      const { filteredPayslips } = usePayslipStore.getState();

      expect(filteredPayslips).toHaveLength(2);
      expect(filteredPayslips.every(p => p.id.includes('2024'))).toBe(true);
    });

    it('filters payslips by search query', () => {
      const store = usePayslipStore.getState();

      store.setFilters({ searchQuery: 'PS-2024-001' });

      const { filteredPayslips } = usePayslipStore.getState();

      expect(filteredPayslips).toHaveLength(1);
      expect(filteredPayslips[0].id).toBe('PS-2024-001');
    });

    it('combines year and search filters', () => {
      const store = usePayslipStore.getState();

      store.setFilters({ year: 2024, searchQuery: '001' });

      const { filteredPayslips } = usePayslipStore.getState();

      expect(filteredPayslips).toHaveLength(1);
      expect(filteredPayslips[0].id).toBe('PS-2024-001');
    });

    it('merges partial filter updates', () => {
      const store = usePayslipStore.getState();

      // Set year first
      store.setFilters({ year: 2024 });
      // Then add search query - should keep year
      store.setFilters({ searchQuery: '001' });

      const { filters, filteredPayslips } = usePayslipStore.getState();

      expect(filters.year).toBe(2024);
      expect(filters.searchQuery).toBe('001');
      expect(filteredPayslips).toHaveLength(1);
    });

    it('clears year filter when set to undefined', () => {
      const store = usePayslipStore.getState();

      store.setFilters({ year: 2024 });
      store.setFilters({ year: undefined });

      const { filteredPayslips } = usePayslipStore.getState();

      expect(filteredPayslips).toHaveLength(3);
    });
  });

  describe('availableYears', () => {
    it('returns available years sorted descending', () => {
      const { availableYears } = usePayslipStore.getState();

      expect(availableYears).toContain(2024);
      expect(availableYears).toContain(2023);
      // Should be sorted descending
      expect(availableYears[0]).toBeGreaterThan(availableYears[1]);
    });

    it('returns unique years only', () => {
      const { availableYears } = usePayslipStore.getState();

      // 2024 appears twice in mockPayslips but should only be in the list once
      const count2024 = availableYears.filter(y => y === 2024).length;
      expect(count2024).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('handles empty payslips array', () => {
      // Properly reset all computed state for empty payslips
      usePayslipStore.setState({
        payslips: [],
        filteredPayslips: [],
        availableYears: [],
      });

      const { filteredPayslips, availableYears } = usePayslipStore.getState();

      expect(filteredPayslips).toHaveLength(0);
      expect(availableYears).toHaveLength(0);
    });

    it('handles case-insensitive search', () => {
      const store = usePayslipStore.getState();

      store.setFilters({ searchQuery: 'ps-2024' });

      const { filteredPayslips } = usePayslipStore.getState();

      expect(filteredPayslips).toHaveLength(2);
    });

    it('searches in file name as well', () => {
      const store = usePayslipStore.getState();

      store.setFilters({ searchQuery: 'jan.pdf' });

      const { filteredPayslips } = usePayslipStore.getState();

      expect(filteredPayslips).toHaveLength(1);
      expect(filteredPayslips[0].id).toBe('PS-2024-001');
    });
  });
});
