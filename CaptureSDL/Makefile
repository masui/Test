# $Date: 2004/07/22 16:33:34 $
# $Revision: 1.4 $

CFLAGS = -mno-cygwin -I/usr/local/include/SDL -I../SDL -I../Capture
MINGLIB = -lmingw32 -mwindows
SDLLIB = -L/usr/local/lib -lSDLmain -lSDL -lSDL_gfx
VFWLIB = -L/usr/local/lib -L. -lvfw32 -lvfw_cap32 -lgdi32
CAMERALIB = ../Capture/camera.o
IMAGELIB = image.o

test1: test1.o image.o
	gcc $(CFLAGS) -o test1 test1.o $(MINGLIB) $(CAMERALIB) $(IMAGELIB) $(VFWLIB) $(SDLLIB)
test1.o: test1.c
	gcc $(CFLAGS) -c test1.c

test2: test2.o image.o
	gcc $(CFLAGS) -o test2 test2.o $(MINGLIB) $(CAMERALIB) $(IMAGELIB) $(VFWLIB) $(SDLLIB)
test2.o: test2.c
	gcc $(CFLAGS) -c test2.c
image.o: image.c
	gcc $(CFLAGS) -c image.c


