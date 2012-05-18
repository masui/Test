# $Date: 2004/07/13 10:14:41 $
# $Revision: 1.5 $
#
# SDL, SDL_gfx 

CC = gcc

CFLAGS = -mno-cygwin -I/usr/local/include/SDL -I/usr/local/mingw32/include
MINGLIB = -lmingw32 -mwindows
SDLLIB = -L/usr/local/lib -lmingw32 -mwindows -lSDLmain -lSDL -lSDL_gfx

test1: test1.o
	$(CC) $(CFLAGS) $(LDFLAGS) -o test1 test1.c $(MINGLIB) $(SDLLIB)
test2: test2.o
	$(CC) $(CFLAGS) $(LDFLAGS) -o test2 test2.c $(MINGLIB) $(SDLLIB)


