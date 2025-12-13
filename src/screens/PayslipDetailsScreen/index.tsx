/**
 * PayslipDetailsScreen - Displays payslip details with download and preview actions
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';
import { usePayslipStore } from '../../store/payslipStore';
import { PayslipDetailsScreenProps } from './utils/types';
import { AppBar } from '../../components/AppBar';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { PayslipDetailCard } from './components/PayslipDetailCard';
import { downloadPayslipFile, openFile } from '../../utils/fileUtils';
import { PAYSLIP_DETAILS_STRINGS } from './utils/constants';
import { BUTTONS, ICONS } from '../../utils/constants';

export function PayslipDetailsScreen({
  route,
  navigation,
}: PayslipDetailsScreenProps) {
  const { payslipId } = route.params;
  const insets = useSafeAreaInsets();


  const payslip = usePayslipStore((state) =>
    state.payslips.find((p) => p.id === payslipId),
  );

  const [isDownloading, setIsDownloading] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [downloadedFilePath, setDownloadedFilePath] = useState<string | null>(
    null,
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDownload = useCallback(async () => {
    if (!payslip) return;

    setIsDownloading(true);
    try {
      const result = await downloadPayslipFile(
        payslip.file.uri,
        payslip.id,
        payslip.fromDate,
        payslip.toDate,
        payslip.file.type,
      );

      if (result.success && result.filePath) {
        setDownloadedFilePath(result.filePath);
        Alert.alert(
          PAYSLIP_DETAILS_STRINGS.alerts.downloadComplete.title,
          PAYSLIP_DETAILS_STRINGS.alerts.downloadComplete.message(result.filePath),
          [
            { text: BUTTONS.ok, style: 'default' },
            {
              text: BUTTONS.openFile,
              onPress: () => handleOpenFile(result.filePath!),
            },
          ],
        );
      } else {
        Alert.alert(
          PAYSLIP_DETAILS_STRINGS.alerts.downloadFailed.title,
          result.error || PAYSLIP_DETAILS_STRINGS.alerts.downloadFailed.messageDefault,
          [{ text: BUTTONS.ok, style: 'default' }],
        );
      }
    } catch {
      Alert.alert(
        PAYSLIP_DETAILS_STRINGS.alerts.downloadFailed.title,
        PAYSLIP_DETAILS_STRINGS.alerts.downloadFailed.messageUnexpected,
        [{ text: BUTTONS.ok, style: 'default' }],
      );
    } finally {
      setIsDownloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payslip]);

  const handleOpenFile = useCallback(async (filePath?: string) => {
    const pathToOpen = filePath || downloadedFilePath;
    if (!pathToOpen) {
      Alert.alert(
        PAYSLIP_DETAILS_STRINGS.alerts.fileNotDownloaded.title,
        PAYSLIP_DETAILS_STRINGS.alerts.fileNotDownloaded.message,
        [{ text: BUTTONS.ok, style: 'default' }],
      );
      return;
    }

    setIsOpening(true);
    try {
      await openFile(pathToOpen);
    } catch {
      Alert.alert(
        PAYSLIP_DETAILS_STRINGS.alerts.unableToOpen.title,
        PAYSLIP_DETAILS_STRINGS.alerts.unableToOpen.message,
        [{ text: BUTTONS.ok, style: 'default' }],
      );
    } finally {
      setIsOpening(false);
    }
  }, [downloadedFilePath]);

  const handlePreview = useCallback(async () => {
    if (!payslip) return;

    // If file is already downloaded, open it directly
    if (downloadedFilePath) {
      await handleOpenFile(downloadedFilePath);
      return;
    }

    // Otherwise, download first then open
    setIsDownloading(true);
    try {
      const result = await downloadPayslipFile(
        payslip.file.uri,
        payslip.id,
        payslip.fromDate,
        payslip.toDate,
        payslip.file.type,
      );

      if (result.success && result.filePath) {
        setDownloadedFilePath(result.filePath);
        await handleOpenFile(result.filePath);
      } else {
        Alert.alert(
          PAYSLIP_DETAILS_STRINGS.alerts.previewFailed.title,
          result.error || PAYSLIP_DETAILS_STRINGS.alerts.previewFailed.messageDefault,
          [{ text: BUTTONS.ok, style: 'default' }],
        );
      }
    } catch {
      Alert.alert(
        PAYSLIP_DETAILS_STRINGS.alerts.previewFailed.title,
        PAYSLIP_DETAILS_STRINGS.alerts.previewFailed.messageUnexpected,
        [{ text: BUTTONS.ok, style: 'default' }],
      );
    } finally {
      setIsDownloading(false);
    }
  }, [payslip, downloadedFilePath, handleOpenFile]);

  if (!payslip) {
    return (
      <View style={styles.container}>
        <AppBar
          title={PAYSLIP_DETAILS_STRINGS.card.title}
          showBackButton
          onBack={handleGoBack}
        />
        <EmptyState
          title={PAYSLIP_DETAILS_STRINGS.notFound.title}
          message={PAYSLIP_DETAILS_STRINGS.notFound.message}
          icon={ICONS.error}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar
        title={PAYSLIP_DETAILS_STRINGS.screen.title(payslip.id)}
        showBackButton
        onBack={handleGoBack}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + spacing.n6 },
        ]}
        showsVerticalScrollIndicator={false}
        testID="payslip-details-screen">
      <PayslipDetailCard payslip={payslip} />

      <View style={styles.actionsContainer}>
        <Button
          title={isDownloading ? PAYSLIP_DETAILS_STRINGS.buttons.downloading : PAYSLIP_DETAILS_STRINGS.buttons.download}
          onPress={handleDownload}
          variant="primary"
          size="large"
          loading={isDownloading}
          disabled={isDownloading || isOpening}
          style={styles.actionButton}
          testID="download-button"
          accessibilityLabel="Download payslip to device"
        />

        <Button
          title={isOpening ? PAYSLIP_DETAILS_STRINGS.buttons.opening : PAYSLIP_DETAILS_STRINGS.buttons.preview}
          onPress={handlePreview}
          variant="outline"
          size="large"
          loading={isOpening}
          disabled={isDownloading || isOpening}
          style={styles.actionButton}
          testID="preview-button"
          accessibilityLabel="Preview payslip"
        />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.n4,
  },
  actionsContainer: {
    gap: spacing.n3,
  },
  actionButton: {
    width: '100%',
  },
  downloadedInfo: {
    marginTop: spacing.n4,
    padding: spacing.n3,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  downloadedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkContainer: {
    marginRight: spacing.n2,
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
});
