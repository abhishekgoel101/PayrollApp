/**
 * Unit tests for date utilities
 */

import {
  formatDate,
  formatDateRange,
  getYearFromDate,
  getUniqueYears,
} from '../../src/utils/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats a valid ISO date string correctly', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBe('Jan 15, 2024');
    });

    it('formats February date correctly', () => {
      const result = formatDate('2024-02-29');
      expect(result).toBe('Feb 29, 2024');
    });

    it('formats December date correctly', () => {
      const result = formatDate('2023-12-31');
      expect(result).toBe('Dec 31, 2023');
    });

    it('returns the original string for invalid date', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('invalid-date');
    });

    it('handles empty string gracefully', () => {
      const result = formatDate('');
      expect(result).toBe('');
    });
  });

  describe('formatDateRange', () => {
    it('formats a date range correctly', () => {
      const result = formatDateRange('2024-01-01', '2024-01-31');
      expect(result).toBe('Jan 1, 2024 – Jan 31, 2024');
    });

    it('formats a date range spanning different months', () => {
      const result = formatDateRange('2024-01-15', '2024-02-15');
      expect(result).toBe('Jan 15, 2024 – Feb 15, 2024');
    });

    it('formats a date range spanning different years', () => {
      const result = formatDateRange('2023-12-01', '2024-01-31');
      expect(result).toBe('Dec 1, 2023 – Jan 31, 2024');
    });
  });

  describe('getYearFromDate', () => {
    it('extracts year from ISO date string', () => {
      expect(getYearFromDate('2024-01-15')).toBe(2024);
      expect(getYearFromDate('2023-12-31')).toBe(2023);
      expect(getYearFromDate('2022-06-01')).toBe(2022);
    });
  });

  describe('getUniqueYears', () => {
    it('returns unique years sorted in descending order', () => {
      const dates = [
        '2024-01-01',
        '2023-06-15',
        '2024-06-01',
        '2022-12-31',
        '2023-01-01',
      ];
      const result = getUniqueYears(dates);
      expect(result).toEqual([2024, 2023, 2022]);
    });

    it('handles empty array', () => {
      const result = getUniqueYears([]);
      expect(result).toEqual([]);
    });

    it('handles single date', () => {
      const result = getUniqueYears(['2024-01-01']);
      expect(result).toEqual([2024]);
    });
  });
});
