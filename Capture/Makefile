CC = gcc
CPPFLAGS = -mno-cygwin -I/usr/local/include/SDL
#CPPFLAGS = -mno-cygwin -O2 -I/usr/local/include/SDL -Dmain=SDL_main
LIBS = -L/usr/local/lib -L. -lmingw32 -mwindows -lvfw32 -lSDL
#LIBS = -L/usr/local/lib -lmingw32 -mwindows -L. -lvfw32
TARGET = test9

#CPPFLAGS = -mno-cygwin -O2 -I/usr/local/include/SDL -Dmain=SDL_main
#LIBS = -L/usr/local/lib -lmingw32 -lSDLmain -lSDL -mwindows -L. -lvfw32
#LIBS = -L/usr/local/lib -lmingw32  -L. -lvfw32

#CPPFLAGS = -mno-cygwin -O2 -I/usr/local/include/SDL -Dmain=SDL_main
CPPFLAGS = -mno-cygwin -O2 -I/usr/local/include/SDL
LIBS = -L/usr/local/lib -lmingw32 -lSDLmain -lSDL
#LIBS = -L/usr/local/lib -lmingw32 -lSDLmain -lSDL -mwindows -L. -lvfw32


test1: test1.o
	gcc -DTEST -mno-cygwin -o test1 test1.o -L/usr/local/lib -L. -lvfw32 -lvfw_cap32 -lgdi32
test1.o: test1.c
	gcc -mno-cygwin -c test1.c

vfwtest: vfwtest.c
	gcc -mno-cygwin -o vfwtest vfwtest.c -L/usr/local/lib -L. -lvfw32 -lvfw_cap32 -lgdi32

cameratest: camera.c
	gcc -DTEST -mno-cygwin -o cameratest camera.c -L/usr/local/lib -L. -lvfw32 -lvfw_cap32 -lgdi32
camera.o: camera.c
	gcc -mno-cygwin -c camera.c


