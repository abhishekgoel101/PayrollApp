/**
 * Payslip domain models and related types
 */

export enum FileType {
  PDF = 'pdf',
  IMAGE = 'image',
}

export interface Payslip {
  id: string;
  fromDate: string; // ISO format: YYYY-MM-DD
  toDate: string; // ISO format: YYYY-MM-DD
  file: {
    name: string;
    type: FileType;
    /**
     * For bundled assets, this is the require() path
     */
    uri: string;
  };
}

export enum SortOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export interface PayslipFilters {
  year?: number;
  searchQuery?: string;
}
