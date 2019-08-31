Document links: http://passionui.com/docs/felix-travel

Suport ticket: https://github.com/passionui/support/issues

React Native Doc : https://facebook.github.io/react-native/docs/getting-started

Run IOS :
- npm install (if not starting yet)
- cd ios/
- pod update
- pod install
- cd ..
- npm start, then open IDE xcode
- react-native run-ios (alternative)

Run Android :
- Open Android Studio, go to folder android, find the button "AVD Manager", run one of them by click button "play" on the list
- npm install (if not starting yet)
- react-native link
- react-native run-android

Notes:
- adb not recognize : 
	- export PATH=$PATH:~/Library/Android/sdk/platform-tools/
	- export PATH=$PATH:~/Library/Android/sdk/emulator/
	- export PATH=$PATH:~/Library/Android/sdk/tools/
	- export PATH=$PATH:~/Library/Android/sdk/tools/bin/
- adb close emulator : adb emu kill
- if not exists file "debug.keystore" folder "./android/app" : cd android/app > keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
