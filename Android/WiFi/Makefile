all: clean
	ant debug
install:
	adb install -r bin/WiFi-debug.apk
uninstall:
	adb uninstall com.pitecan.wifi
debug:
	adb logcat | grep WiFi
clean:
	/bin/rm -r -f bin
