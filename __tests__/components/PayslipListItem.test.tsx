/**
 * Component tests for PayslipListItem
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PayslipListItem } from '../../src/screens/PayslipListScreen/components/PayslipListItem';
import { Payslip, FileType } from '../../src/store/models/Payslip';

const mockPayslip: Payslip = {
  id: 'PS-2024-001',
  fromDate: '2024-01-01',
  toDate: '2024-01-31',
  file: {
    name: 'payslip_january_2024.pdf',
    type: FileType.PDF,
    uri: 'sample.pdf',
  },
};

describe('PayslipListItem', () => {
  it('renders payslip date range correctly', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PayslipListItem payslip={mockPayslip} onPress={onPress} />,
    );

    // Check that the date range is displayed
    expect(getByText(/Jan 1, 2024 – Jan 31, 2024/)).toBeTruthy();
  });

  it('renders payslip ID', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PayslipListItem payslip={mockPayslip} onPress={onPress} />,
    );

    expect(getByText(/PS-2024-001/)).toBeTruthy();
  });

  it('renders file type indicator', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PayslipListItem payslip={mockPayslip} onPress={onPress} />,
    );

    expect(getByText(/PDF Document/)).toBeTruthy();
  });

  it('calls onPress with payslip id when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <PayslipListItem
        payslip={mockPayslip}
        onPress={onPress}
      />,
    );

    fireEvent.press(getByTestId(`payslip-item-${mockPayslip.id}`));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(mockPayslip.id);
  });

  it('displays image icon for image file type', () => {
    const imagePayslip: Payslip = {
      ...mockPayslip,
      file: {
        name: 'payslip.png',
        type: FileType.IMAGE,
        uri: 'sample.png',
      },
    };
    const onPress = jest.fn();
    const { getByText } = render(
      <PayslipListItem payslip={imagePayslip} onPress={onPress} />,
    );

    expect(getByText(/Image File/)).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <PayslipListItem payslip={mockPayslip} onPress={onPress} />,
    );

    // Updated to match new i18n format: "Payslip {id}, {dateRange}, {fileType}"
    expect(getByLabelText(/Payslip PS-2024-001/)).toBeTruthy();
  });
});
