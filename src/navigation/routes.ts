/**
 * Route configuration and constants
 */

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { PayslipListScreen } from '../screens/PayslipListScreen';
import { PayslipDetailsScreen } from '../screens/PayslipDetailsScreen';
import { RootStackParamList } from './types';

/**
 * Route names as constants for type-safe navigation
 */
export const ROUTES = {
  PAYSLIP_LIST: 'PayslipList',
  PAYSLIP_DETAILS: 'PayslipDetails',
} as const;

/**
 * Route configuration type
 */
export interface RouteConfig {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

/**
 * All route configurations
 * 
 * headerShown: false - Each screen manages its own AppBar for flexibility
 */
export const routeConfigs: RouteConfig[] = [
  {
    name: ROUTES.PAYSLIP_LIST,
    component: PayslipListScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTES.PAYSLIP_DETAILS,
    component: PayslipDetailsScreen,
    options: {
      headerShown: false,
    },
  },
];

/**
 * Initial route name
 */
export const INITIAL_ROUTE = ROUTES.PAYSLIP_LIST;
