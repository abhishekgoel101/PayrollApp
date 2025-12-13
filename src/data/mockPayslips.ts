/**
 * Mock payslip data for the application
 */

import { Payslip, FileType } from '../store/models/Payslip';

export const mockPayslips: Payslip[] = [
  {
    id: 'PS-2024-001',
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    file: {
      name: 'payslip_january_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2024-002',
    fromDate: '2024-02-01',
    toDate: '2024-02-29',
    file: {
      name: 'payslip_february_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2024-003',
    fromDate: '2024-03-01',
    toDate: '2024-03-31',
    file: {
      name: 'payslip_march_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2024-004',
    fromDate: '2024-04-01',
    toDate: '2024-04-30',
    file: {
      name: 'payslip_april_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2024-005',
    fromDate: '2024-05-01',
    toDate: '2024-05-31',
    file: {
      name: 'payslip_may_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2024-006',
    fromDate: '2024-06-01',
    toDate: '2024-06-30',
    file: {
      name: 'payslip_june_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2023-011',
    fromDate: '2023-11-01',
    toDate: '2023-11-30',
    file: {
      name: 'payslip_november_2023.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2023-012',
    fromDate: '2023-12-01',
    toDate: '2023-12-31',
    file: {
      name: 'payslip_december_2023.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2024-007',
    fromDate: '2024-07-01',
    toDate: '2024-07-31',
    file: {
      name: 'payslip_july_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
  {
    id: 'PS-2024-008',
    fromDate: '2024-08-01',
    toDate: '2024-08-31',
    file: {
      name: 'payslip_august_2024.pdf',
      type: FileType.PDF,
      uri: 'mock_payslip.pdf',
    },
  },
];
