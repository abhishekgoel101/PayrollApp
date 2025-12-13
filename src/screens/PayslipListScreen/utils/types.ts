/**
 * PayslipListScreen navigation types
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

export type PayslipListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PayslipList'
>;
