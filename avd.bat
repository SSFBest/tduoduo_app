@echo off
d:
cd D:\Users\lenovo\AppData\Local\Android\sdk\emulator
echo 目录已定位...
emulator -avd Nexus_5X_API_23_1
echo emulator -avd Nexus_9_API_25_1

echo 模拟器已启动，欢迎使用！
echo D:\Users\lenovo\AppData\Local\Android\sdk/platform-tools/adb -s emulator-5554 shell am start -n com.tduoduo_app/com.tduoduo_app.MainActivity
echo D:\Users\lenovo\AppData\Local\Android\sdk/platform-tools/adb -s emulator-5554 shell am start -n com.elm/.MainActivity
echo D:\Users\lenovo\AppData\Local\Android\sdk/platform-tools/adb -s emulator-5554 shell am start -n com.react_native_demo/com.react_native_demo
