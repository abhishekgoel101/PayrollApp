/**
 * File handling utilities for downloading and opening payslip files
 */

import { Platform, Alert, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import { PERMISSIONS, BUTTONS } from './constants';
import { FileType } from '../store';

// Get the appropriate directory for saving files
export const getDownloadDirectory = (): string => {
  if (Platform.OS === 'android') {
    return RNFS.DownloadDirectoryPath;
  }
  return RNFS.DocumentDirectoryPath;
};

/**
 * Request storage permissions on Android
 * @returns Promise<boolean> - Whether permission was granted
 */
export async function requestStoragePermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  // Android 13+ (API 33+) doesn't need WRITE_EXTERNAL_STORAGE for app-specific directories
  const apiLevel = Platform.Version;
  if (typeof apiLevel === 'number' && apiLevel >= 33) {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: PERMISSIONS.storage.title,
        message: PERMISSIONS.storage.message,
        buttonNeutral: BUTTONS.askMeLater,
        buttonNegative: BUTTONS.cancel,
        buttonPositive: BUTTONS.ok,
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

interface DownloadResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

/**
 * Downloads a bundled asset to device storage
 * @param assetName - Name of the bundled asset file
 * @param payslipId - ID of the payslip for file naming
 * @param fromDate - Start date for file naming
 * @param toDate - End date for file naming
 * @param fileType - Type of file (pdf or image)
 * @returns Promise with download result
 */
export async function downloadPayslipFile(
  assetName: string,
  payslipId: string,
  fromDate: string,
  toDate: string,
  fileType: FileType,
): Promise<DownloadResult> {
  try {
    // Request permission first
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return {
        success: false,
        error: 'Storage permission denied. Please grant permission in settings.',
      };
    }

    const downloadDir = getDownloadDirectory();
    const extension = fileType === 'pdf' ? 'pdf' : 'png';
    const fileName = `payslip_${payslipId}_${fromDate}_to_${toDate}.${extension}`;
    const destPath = `${downloadDir}/${fileName}`;

    // Check if file already exists
    const exists = await RNFS.exists(destPath);
    if (exists) {
      // File already downloaded
      return {
        success: true,
        filePath: destPath,
      };
    }

    // For bundled assets, we need to copy from the assets folder
    if (Platform.OS === 'android') {
      // On Android, copy from assets
      await RNFS.copyFileAssets(assetName, destPath);
      // Trigger media scanner so file appears in Files app
      await RNFS.scanFile(destPath);
    } else {
      // On iOS, copy from the main bundle
      const sourcePath = `${RNFS.MainBundlePath}/${assetName}`;
      await RNFS.copyFile(sourcePath, destPath);
    }

    return {
      success: true,
      filePath: destPath,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      error: `Failed to download file: ${errorMessage}`,
    };
  }
}

/**
 * Opens a file using the native file viewer
 * @param filePath - Path to the file to open
 */
export async function openFile(filePath: string): Promise<void> {
  try {
    await FileViewer.open(filePath, {
      showOpenWithDialog: true,
      showAppsSuggestions: true,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Alert.alert('Error', `Unable to open file: ${errorMessage}`);
  }
}

/**
 * Gets a human-readable file type label
 */
export function getFileTypeLabel(fileType: FileType): string {
  return fileType === 'pdf' ? 'PDF Document' : 'Image File';
}

/**
 * Gets the file extension from type
 */
export function getFileExtension(fileType: FileType): string {
  return fileType === 'pdf' ? '.pdf' : '.png';
}
