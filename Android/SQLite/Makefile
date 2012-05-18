all:
	ant debug
install:
	adb install -r bin/SQLite-debug.apk
uninstall:
	adb uninstall com.pitecan.sqlite
debug:
	adb logcat | grep SQLite
clean:
	/bin/rm -r -f bin/classes

