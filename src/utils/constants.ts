/**
 * Common/shared constants used across the app
 */

export const BUTTONS = {
  ok: 'OK',
  cancel: 'Cancel',
  openFile: 'Open File',
  askMeLater: 'Ask Me Later',
} as const;

export const LABELS = {
  sortBy: 'Sort by:',
  filterByYear: 'Filter by year:',
  all: 'All',
} as const;

export const SORTING = {
  newestFirst: 'Newest First',
  oldestFirst: 'Oldest First',
} as const;

export const ICONS = {
  pdf: '📄',
  image: '🖼️',
  clipboard: '📋',
  error: '❌',
} as const;

export const PERMISSIONS = {
  storage: {
    title: 'Storage Permission Required',
    message: 'This app needs access to your storage to download payslip files.',
  },
} as const;
