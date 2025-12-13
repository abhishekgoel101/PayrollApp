/**
 * Constants for PayslipDetailsScreen
 */

export const PAYSLIP_DETAILS_STRINGS = {
  screen: {
    title: (id: string) => `Payslip ${id}`,
  },
  card: {
    title: 'Payslip Details',
    labels: {
      payslipId: 'Payslip ID',
      fromDate: 'From Date',
      toDate: 'To Date',
      fileType: 'File Type',
      fileName: 'File Name',
    },
  },
  buttons: {
    download: 'Download Payslip',
    downloading: 'Downloading...',
    preview: 'Preview Payslip',
    opening: 'Opening...',
  },
  notFound: {
    title: 'Payslip Not Found',
    message: 'The requested payslip could not be found. It may have been removed or the ID is incorrect.',
  },
  alerts: {
    downloadComplete: {
      title: 'Download Complete',
      message: (path: string) => `Payslip saved successfully to:\n${path}`,
    },
    downloadFailed: {
      title: 'Download Failed',
      messageDefault: 'An unknown error occurred while downloading the file.',
      messageUnexpected: 'An unexpected error occurred. Please try again.',
    },
    fileNotDownloaded: {
      title: 'File Not Downloaded',
      message: 'Please download the payslip first before opening it.',
    },
    unableToOpen: {
      title: 'Unable to Open File',
      message: 'The file could not be opened. Please make sure you have an app installed that can view this file type.',
    },
    previewFailed: {
      title: 'Preview Failed',
      messageDefault: 'Could not download the file for preview.',
      messageUnexpected: 'An unexpected error occurred. Please try again.',
    },
  },
} as const;
