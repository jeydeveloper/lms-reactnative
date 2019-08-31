Document links: http://passionui.com/docs/felix-travel

Suport ticket: https://github.com/passionui/support/issues

Run IOS :
- npm install (if not starting yet)
- cd ios/
- pod update
- pod install
- cd ..
- npm start (Open IDE xcode)
- react-native run-ios (alternative)

Run Android :
- npm install (if not starting yet)
- react-native link
- react-native run-android

Notes:
- adb not recognize : export PATH=$PATH:~/Library/Android/sdk/platform-tools/
- adb close emulator : adb emu kill
- if not exists file "debug.keystore" folder "./android/app" : cd android/app > keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
