/**
 * Constants for PayslipListScreen
 */

export const PAYSLIP_LIST_STRINGS = {
  screen: {
    title: 'My Payslips',
  },
  search: {
    placeholder: 'Search by ID, date, or filename...',
  },
  emptyState: {
    title: 'No Payslips Found',
    messageWithFilters: "Try adjusting your search or filters to find what you're looking for.",
    messageDefault: 'Your payslips will appear here once they are available.',
  },
} as const;
