/**
 * Navigation type definitions
 */

export type RootStackParamList = {
  PayslipList: undefined;
  PayslipDetails: {
    payslipId: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
