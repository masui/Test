all:
	ant debug
install:
	adb install -r bin/SQLiteDict-debug.apk
uninstall:
	adb uninstall com.pitecan.sqlitedict
debug:
	adb logcat | grep SQLite
clean:
	/bin/rm -r -f bin/classes

