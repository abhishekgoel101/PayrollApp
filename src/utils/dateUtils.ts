/**
 * Date formatting utilities
 */

/**
 * Formats a date string to a user-friendly format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Formats a date range for display
 * @param fromDate - Start date in ISO format
 * @param toDate - End date in ISO format
 * @returns Formatted date range (e.g., "Jan 1, 2024 – Jan 31, 2024")
 */
export function formatDateRange(fromDate: string, toDate: string): string {
  return `${formatDate(fromDate)} – ${formatDate(toDate)}`;
}

/**
 * Extracts the year from a date string
 * @param dateString - ISO date string
 * @returns Year as a number
 */
export function getYearFromDate(dateString: string): number {
  const date = new Date(dateString);
  return date.getFullYear();
}

/**
 * Gets unique years from a list of payslips
 * @param dates - Array of date strings
 * @returns Array of unique years sorted in descending order
 */
export function getUniqueYears(dates: string[]): number[] {
  const years = dates.map(getYearFromDate);
  const uniqueYears = [...new Set(years)];
  return uniqueYears.sort((a, b) => b - a);
}
