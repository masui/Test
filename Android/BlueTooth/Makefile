all: clean
	/bin/rm -r -f gen
	ant debug
install: uninstall
	adb install -r bin/BlueTooth-debug.apk
uninstall:
	adb uninstall com.pitecan.bluetooth
debug:
	adb logcat | grep BlueTooth
clean:
	/bin/rm -r -f bin
