/**
 * Mock for react-native-file-viewer
 */

const mockFileViewer = {
  open: jest.fn().mockResolvedValue(undefined),
};

module.exports = mockFileViewer;
