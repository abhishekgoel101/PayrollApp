module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-fs|react-native-file-viewer)/)',
  ],
  moduleNameMapper: {
    '^react-native-fs$': '<rootDir>/__mocks__/react-native-fs.js',
    '^react-native-file-viewer$': '<rootDir>/__mocks__/react-native-file-viewer.js',
  },
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
};
