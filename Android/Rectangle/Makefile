all:
	ruby tangle AndroidRectangle Index
	ant debug
install:
	adb install -r bin/Rectangle-debug.apk
uninstall:
	adb uninstall com.pitecan.rectangle
clean:
	/bin/rm -r -f bin gen src

