/**
 * Integration tests for PayslipListScreen
 *
 * Uses Zustand store for state management
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PayslipListScreen } from '../../src/screens/PayslipListScreen';
import { usePayslipStore } from '../../src/store/payslipStore';
import { Payslip, FileType, SortOrder } from '../../src/store/models/Payslip';
import { RootStackParamList } from '../../src/navigation/types';
import { getUniqueYears } from '../../src/utils/dateUtils';

const mockPayslips: Payslip[] = [
  {
    id: 'PS-2024-001',
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    file: { name: 'jan.pdf', type: FileType.PDF, uri: 'test.pdf' },
  },
  {
    id: 'PS-2024-002',
    fromDate: '2024-02-01',
    toDate: '2024-02-29',
    file: { name: 'feb.pdf', type: FileType.PDF, uri: 'test.pdf' },
  },
  {
    id: 'PS-2023-012',
    fromDate: '2023-12-01',
    toDate: '2023-12-31',
    file: { name: 'dec.pdf', type: FileType.PDF, uri: 'test.pdf' },
  },
];

// Helper to compute filtered/sorted payslips for test state
const computeTestFilteredPayslips = (payslips: Payslip[]) => {
  return [...payslips].sort((a, b) => {
    const dateA = new Date(a.toDate).getTime();
    const dateB = new Date(b.toDate).getTime();
    return dateB - dateA; // newest first (default)
  });
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Mock component for PayslipDetails screen (not under test)
const MockPayslipDetailsScreen = () => null;

// Helper to reset and initialize Zustand store before each test
const initializeStore = (payslips: Payslip[] = mockPayslips) => {
  const dates = payslips.flatMap((p) => [p.fromDate, p.toDate]);
  usePayslipStore.setState({
    payslips,
    sortOrder: SortOrder.NEWEST,
    filters: { year: undefined, searchQuery: '' },
    filteredPayslips: computeTestFilteredPayslips(payslips),
    availableYears: payslips.length > 0 ? getUniqueYears(dates) : [],
  });
};

const renderScreen = () => {
  return render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}>
      {/* No ThemeProvider needed - using direct static imports */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PayslipList" component={PayslipListScreen} />
          <Stack.Screen
            name="PayslipDetails"
            component={MockPayslipDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>,
  );
};

describe('PayslipListScreen', () => {
  beforeEach(() => {
    initializeStore(mockPayslips);
  });

  it('renders all payslips in the list', () => {
    const { getByTestId } = renderScreen();

    expect(getByTestId('payslip-item-PS-2024-001')).toBeTruthy();
    expect(getByTestId('payslip-item-PS-2024-002')).toBeTruthy();
    expect(getByTestId('payslip-item-PS-2023-012')).toBeTruthy();
  });

  it('renders search input', () => {
    const { getByTestId } = renderScreen();

    expect(getByTestId('search-input')).toBeTruthy();
  });

  it('renders sort selector', () => {
    const { getByTestId } = renderScreen();

    expect(getByTestId('sort-selector')).toBeTruthy();
  });

  it('renders year filter', () => {
    const { getByTestId } = renderScreen();

    expect(getByTestId('year-filter')).toBeTruthy();
  });

  it('filters payslips when search text is entered', async () => {
    const { getByTestId, queryByTestId } = renderScreen();

    const searchInput = getByTestId('search-input');
    fireEvent.changeText(searchInput, 'PS-2024-001');

    await waitFor(() => {
      expect(getByTestId('payslip-item-PS-2024-001')).toBeTruthy();
      expect(queryByTestId('payslip-item-PS-2024-002')).toBeNull();
      expect(queryByTestId('payslip-item-PS-2023-012')).toBeNull();
    });
  });

  it('shows empty state when no payslips match filter', async () => {
    const { getByTestId, getByText } = renderScreen();

    const searchInput = getByTestId('search-input');
    fireEvent.changeText(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(getByTestId('empty-state')).toBeTruthy();
      expect(getByText('No Payslips Found')).toBeTruthy();
    });
  });

  it('shows empty state message when no payslips exist', () => {
    initializeStore([]);
    const { getByTestId, getByText } = renderScreen();

    expect(getByTestId('empty-state')).toBeTruthy();
    expect(getByText('No Payslips Found')).toBeTruthy();
  });
});
