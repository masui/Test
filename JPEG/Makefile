CFLAGS = -mno-cygwin -I/usr/local/include/SDL -I../SDL -I/home/masui/Systems/jpeg-6b
SDLLIB = -L/usr/local/lib -lSDLmain -lSDL -lSDL_gfx
#JPEGLIB = /home/masui/Systems/jpeg-6b/libjpeg.a
JPEGLIB = -L/usr/local/mingw32/lib -ljpeg
MINGLIB = -lmingw32 -mwindows

test1: test1.o
	$(CC) -o test1 test1.o $(SDLLIB) $(JPEGLIB)

test2: test2.o image.o jpeg.o
	$(CC) -mno-cygwin -o test2 test2.o jpeg.o image.o  $(MINGLIB) $(SDLLIB) $(JPEGLIB)
