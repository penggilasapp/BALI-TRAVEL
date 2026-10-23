# Bali Travel Calculator — Android packaging project

This project wraps the already-tested web app in a native Android WebView.

## Included
- Existing `travel_PENGGILAS.zip` web app copied unchanged into `app/src/main/assets/www/`
- Transparent 1024px master app icon
- Android launcher density icons
- Adaptive icon configuration
- Android Back handling
- Internet permission for live currency rates / future ad SDK integration

## Build
Open this folder in Android Studio with an installed Android SDK.
Then use:
Build > Build APK(s)

For Google Play, use:
Build > Generate Signed Bundle / APK > Android App Bundle

Note: this environment does not contain the Android SDK/Gradle toolchain, so the APK binary itself is not generated here.
