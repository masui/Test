all:
	ant debug
install:
	adb install -r bin/IME-debug.apk
uninstall:
	adb uninstall com.pitecan.ime
debug:
	adb logcat | grep IME
clean:
	/bin/rm -r -f bin/classes
