debug:
	ant debug
install: debug
	adb install -r bin/*-debug.apk

#
# build.xmlを作成
# target == 3 は Android2.1
#
setup:
	android update project --path `pwd` --target 3

clean:
	ant clean
