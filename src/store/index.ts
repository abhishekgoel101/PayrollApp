/**
 * Store exports
 *
 * Using Zustand instead of Context API or Redux because:
 * - Better performance via selective subscriptions
 * - Minimal boilerplate, no Provider needed
 * - Tiny bundle size (~1KB vs Redux ~11KB)
 * - Clean API with excellent TypeScript support
 *
 * See payslipStore.ts for detailed rationale.
 */

export { usePayslipStore } from './payslipStore';

// Re-export models for convenience
export * from './models/Payslip';
