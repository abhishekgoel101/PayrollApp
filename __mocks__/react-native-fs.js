/**
 * Mock for react-native-fs
 */

const mockRNFS = {
  DocumentDirectoryPath: '/mock/documents',
  DownloadDirectoryPath: '/mock/downloads',
  MainBundlePath: '/mock/bundle',
  exists: jest.fn().mockResolvedValue(false),
  copyFile: jest.fn().mockResolvedValue(undefined),
  copyFileAssets: jest.fn().mockResolvedValue(undefined),
  writeFile: jest.fn().mockResolvedValue(undefined),
  readFile: jest.fn().mockResolvedValue('mock content'),
  unlink: jest.fn().mockResolvedValue(undefined),
  mkdir: jest.fn().mockResolvedValue(undefined),
  readDir: jest.fn().mockResolvedValue([]),
};

module.exports = mockRNFS;
