Marvelapp :
- https://marvelapp.com/i702e2j
- https://marvelapp.com/5h61426

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
- emulator -avd Nexus_5X_API_24
- adb close emulator : adb emu kill
- if not exists file "debug.keystore" folder "./android/app" : cd android/app > keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

Generate APK Android :
Follow this

1. Go to your project directory and check if this folder exists android/app/src/main/assets
i) If it exists then delete two files viz index.android.bundle and index.android.bundle.meta
ii) If the folder assets doesn’t exist then create the assets directory there.

2. From your root project directory do
cd android
./gradlew clean

3. Finally, navigate back to the root directory and check

i) If there is only one file i.e. index.js then run following command
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

NOTE: That is one single command.

ii) If there are two files i.e index.android.js and index.ios.js then run this
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
This is a single command too!

4. Now run react-native run-android

check emulator :
avdmanager list avd

if get error "Exception in thread "main" java.lang.NoClassDefFoundError: javax/xml/bind/annotation/XmlSchema"
on mac : export JAVA_OPTS='-XX:+IgnoreUnrecognizedVMOptions --add-modules java.se.ee'

5. For IOS : react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

6. react-native run-ios

react-native link react-native-youtube

Create new react-native :
react-native init netpolitan_apps_lms --version 0.60.4


