# PayrollApp - React Native Payslip Management

A React Native application (TypeScript) for managing and viewing payslips with native file handling, clean architecture, accessibility support, and polished mobile UX.

## 📱 Features

### Payslip List Screen
- Scrollable list displaying payslips with date range ("fromDate – toDate")
- **Sorting**: Toggle between newest first / oldest first
- **Year Filter**: Filter payslips by year
- **Text Search**: Search by payslip ID, date, or filename (with debounce)
- Pull-to-refresh support
- Empty state handling

### Payslip Details Screen
- Displays payslip ID, date range (fromDate, toDate), and file type indicator (PDF/Image)
- **Download Action**: Saves payslip to device storage with success/failure alerts
- **Preview Action**: Opens file using native viewer (PDF reader, image viewer)

### Native File Handling
- Saves files to platform-appropriate directories:
  - **Android**: Public Downloads directory
  - **iOS**: App Documents directory
- Android runtime permissions handling (for API < 33)
- Native file viewer integration via `react-native-file-viewer`
- Media scanner trigger on Android so files appear in Files app

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React Native (CLI) | 0.83.0 |
| **Language** | TypeScript | 5.8.3 |
| **Runtime** | Node.js | >= 20 |
| **Navigation** | React Navigation (Native Stack) | 7.x |
| **State Management** | Zustand | 5.0.9 |
| **File System** | react-native-fs | 2.20.0 |
| **File Viewer** | react-native-file-viewer | 2.1.5 |
| **Testing** | Jest + Testing Library | 29.x |
| **Linting** | ESLint | 8.x |
| **Formatting** | Prettier | 2.8.8 |

### Why Zustand?
Chose Zustand over Redux/Context for state management because:
- Minimal boilerplate with excellent TypeScript support
- No provider wrappers needed
- Built-in support for computed/derived state
- Simple API that's easy to test
- Lightweight (~1KB)

---

## 📂 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AppBar/          # Navigation header
│   ├── Button/          # Custom button component
│   ├── Card/            # Card container
│   ├── EmptyState/      # Empty list state
│   └── ...
├── data/                # Mock payslip data
├── hooks/               # Custom hooks (useDebounce)
├── navigation/          # Navigation configuration & types
├── screens/
│   ├── PayslipListScreen/
│   │   ├── components/  # Screen-specific components
│   │   ├── utils/       # Constants, types
│   │   └── index.tsx
│   └── PayslipDetailsScreen/
│       ├── components/
│       ├── utils/
│       └── index.tsx
├── store/               # Zustand store
│   ├── models/          # TypeScript interfaces
│   └── payslipStore.ts
├── theme/               # Colors, spacing, typography
└── utils/               # Utilities (dateUtils, fileUtils, constants)

__tests__/               # Test files (mirrors src structure)
├── components/
├── screens/
├── state/
└── utils/

android/app/src/main/assets/   # Bundled PDF for Android
ios/PayrollApp/                # Bundled PDF for iOS
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20 (check with `node -v`)
- **npm** or **yarn**
- **Xcode** 15+ (for iOS, macOS only)
- **Android Studio** with SDK 34+ (for Android)
- **CocoaPods** (for iOS dependencies)
- **Watchman** (recommended for macOS)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd PayrollApp

# 2. Install JavaScript dependencies
npm install

# 3. Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

### Running the App

#### iOS (macOS only)
```bash
# Run on default simulator
npm run ios

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 16 Pro"

# Run on physical device (requires signing)
npx react-native run-ios --device
```

#### Android
```bash
# Start Android emulator first, or connect a device
npm run android

# Or explicitly
npx react-native run-android
```

#### Metro Bundler
```bash
# Start Metro (auto-starts with run commands)
npm start

# Clear cache if needed
npm start -- --reset-cache
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- dateUtils.test.ts

# Watch mode (re-runs on file changes)
npm test -- --watch
```

### Test Coverage

| Test Suite | Tests | Description |
|------------|-------|-------------|
| `dateUtils.test.ts` | 12 | Date formatting, year extraction, range formatting |
| `payslipStore.test.ts` | 18 | Zustand store actions, filtering, sorting |
| `PayslipListScreen.test.tsx` | 7 | Screen rendering, search, empty states |
| `PayslipListItem.test.tsx` | 5 | Component rendering, tap handling |
| `App.test.tsx` | 1 | App renders without crashing |
| **Total** | **42** | |

---

## 🔍 Linting & Type Checking

```bash
# Run ESLint
npm run lint

# Run TypeScript compiler (type check only)
npx tsc --noEmit
```

---

## 🏗 Architecture Decisions

### State Management (Zustand)
- Single store with payslips, filters, and sort order
- Derived `filteredPayslips` computed on state changes
- Actions: `setSortOrder`, `setFilters`
- No provider needed - components subscribe directly

### File Handling Strategy
- **Android**: Uses `RNFS.copyFileAssets()` to copy from bundled assets to Downloads
- **iOS**: Uses `RNFS.copyFile()` from MainBundle to Documents
- Permissions requested at runtime for Android < 13
- `RNFS.scanFile()` triggers media scanner so files appear in Android Files app

### Component Architecture
- **Screen components**: Handle navigation, state subscription, layout
- **Feature components**: Screen-specific (PayslipListItem, PayslipDetailCard)
- **Common components**: Reusable UI primitives (Button, Card, AppBar, EmptyState)

### Navigation
- Native Stack Navigator for performant screen transitions
- Typed route parameters with `RootStackParamList`
- Centralized route constants

---

## ⚠️ Known Limitations

1. **Mock Data Only**: No backend integration; uses hardcoded payslip data
2. **Single PDF Asset**: Same `mock_payslip.pdf` reused across all payslips for demo purposes
3. **No Image Payslip Asset**: Image file type defined but PNG not bundled (PDF works)
4. **No Offline Caching**: Downloaded files are saved, but metadata isn't cached
5. **No Authentication**: No user login or authorization
6. **Basic Error Handling**: Errors shown via alerts; no retry mechanisms
7. **No Localization**: English only; dates formatted for US locale

---

## 🔮 Future Improvements

Given more time, I would implement:

### High Priority
- **Bundle image assets**: Add PNG payslip examples for image file type
- **Enhanced error handling**: Retry mechanisms, better error messages
- **Offline support**: Cache payslip metadata with AsyncStorage/MMKV

### Medium Priority
- **E2E tests**: Add Detox tests for critical user flows
- **Accessibility audit**: Full VoiceOver/TalkBack testing
- **Performance optimization**: FlatList `getItemLayout`, memo optimization
- **Share functionality**: Share downloaded files via native share sheet

### Nice to Have
- **Multiple selection**: Bulk download payslips
- **Push notifications**: Alert when new payslips available
- **Biometric auth**: Secure access with Face ID / fingerprint
- **Dark mode toggle**: In-app theme switching
- **CI/CD**: GitHub Actions for automated testing and builds

---

## 📝 API Reference

### Payslip Model
```typescript
interface Payslip {
  id: string;              // Unique identifier (e.g., "PS-2024-001")
  fromDate: string;        // ISO date string ("2024-01-01")
  toDate: string;          // ISO date string ("2024-01-31")
  file: {
    name: string;          // Display name
    type: FileType;        // 'pdf' | 'image'
    uri: string;           // Asset filename
  };
}

enum FileType {
  PDF = 'pdf',
  IMAGE = 'image',
}

enum SortOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}
```

### Zustand Store
```typescript
interface PayslipState {
  // State
  payslips: Payslip[];
  sortOrder: SortOrder;
  filters: { year?: number; searchQuery?: string };
  
  // Derived
  filteredPayslips: Payslip[];
  availableYears: number[];
  
  // Actions
  setSortOrder: (order: SortOrder) => void;
  setFilters: (filters: Partial<PayslipFilters>) => void;
}
```

---

## 📄 License

This project is for assessment purposes only.
