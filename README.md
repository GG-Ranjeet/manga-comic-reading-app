# Manga Comic Reading App

A modern, cross-platform mobile application for reading manga and comics, built with React Native and Expo.

## Features

### Project
- **Cross-Platform:** Runs on both iOS and Android.
- **Modern UI:** Built with React Native and standard UI components.
- **Fast Development:** Powered by Expo and React Native Reanimated.
- **Removed Authentication:** For now.

### Application
- **Offline Reading:** Download chapters to read anywhere, anytime without an internet connection.

## Features To be Implemented
- **Extensive Library:**  Where we can browse and search through a massive collection of manga titles.
- **Customizable Reader:** Adjust reading direction (left-to-right, right-to-left, vertical scroll), brightness, and page scaling.
- **Progress Tracking:** Automatically save your reading progress and bookmark your favorite series. (make it work).
- **Personalized Recommendations:** Discover new manga based on your reading history and preferences.
- **Better UI:** Make sorting work, change the view and grid of the library.
- **Different Reading View:** Different kind of view for different types of manga like comic, manga, doujinshi, manhwa, etc.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- React Native environment (Android Studio / Xcode)

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npx expo start
   ```

### Troubleshooting

#### Android Build Issues (react-native-screens)

If you encounter C++ compilation errors related to `react-native-screens` when building for Android, clear the CMake cache:

```powershell
Remove-Item -Recurse -Force node_modules\react-native-screens\android\.cxx
```

After clearing the cache, try building again:
```powershell
cd android
.\gradlew.bat app:assembleDebug
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

