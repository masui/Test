//
// 線をひく実験 SDL_gfx を使う
//
#include <stdio.h>
#include <SDL.h>
#include <SDL_endian.h>	/* エンディアンに依存しない 24bpp モードの時に使われる */
#include "SDL_gfxPrimitives.h"

#define BPP 32
#define SCREEN_WIDTH 1024
#define SCREEN_HEIGHT 768

int windowMode = 0; // FullScreen
static SDL_Surface *video;
static SDL_Rect screenRect;

void DrawPixel(SDL_Surface *screen, int x, int y, Uint8 R, Uint8 G, Uint8 B)
{
	Uint32 color = SDL_MapRGB(screen->format, R, G, B);
	if ( SDL_MUSTLOCK(screen) ) {
		if ( SDL_LockSurface(screen) < 0 ) {
			return;
		}
	}
	switch (screen->format->BytesPerPixel) {
        case 1: { /* 8-bpp と仮定 */
		Uint8 *bufp;
		
		bufp = (Uint8 *)screen->pixels + y*screen->pitch + x;
		*bufp = color;
        }
        break;
	
        case 2: { /* たぶん 15-bpp か 16-bpp */
		Uint16 *bufp;
		
		bufp = (Uint16 *)screen->pixels + y*screen->pitch/2 + x;
		*bufp = color;
        }
        break;
	
        case 3: { /* 遅い 24-bpp モード、普通は使われない */
		Uint8 *bufp;
		
		bufp = (Uint8 *)screen->pixels + y*screen->pitch + x * 3;
		bufp = (Uint8 *)screen->pixels + y * 100 + x * 3; /////////////////////
		if(SDL_BYTEORDER == SDL_LIL_ENDIAN) {
			bufp[0] = color;
			bufp[1] = color >> 8;
			bufp[2] = color >> 16;
		} else {
			bufp[2] = color;
			bufp[1] = color >> 8;
			bufp[0] = color >> 16;
		}
        }
        break;
	
        case 4: { /* たぶん 32-bpp */
		Uint32 *bufp;
		
		bufp = (Uint32 *)screen->pixels + y*screen->pitch/4 + x;
		*bufp = color;
        }
        break;
	}
	if ( SDL_MUSTLOCK(screen) ) {
		SDL_UnlockSurface(screen);
	}
	SDL_UpdateRect(screen, x, y, 1, 1);
}

void putpixel(SDL_Surface *surface, int x, int y, Uint32 pixel)
{
	int bpp = surface->format->BytesPerPixel;
	/* Here p is the address to the pixel we want to set */
	Uint8 *p = (Uint8 *)surface->pixels + y * surface->pitch + x * bpp;

	printf("bpp = %d\n",bpp);
	
	switch(bpp) {
	case 1:
		*p = pixel;
		break;
		
	case 2:
		*(Uint16 *)p = pixel;
		break;
		
	case 3:
		if(SDL_BYTEORDER == SDL_BIG_ENDIAN) {
			p[0] = (pixel >> 16) & 0xff;
			p[1] = (pixel >> 8) & 0xff;
			p[2] = pixel & 0xff;
		} else {
			p[0] = pixel & 0xff;
			p[1] = (pixel >> 8) & 0xff;
			p[2] = (pixel >> 16) & 0xff;
		}
		break;
		
	case 4:
		*(Uint32 *)p = pixel;
		break;
	}
}

void initSDL(int window) {
	Uint8 videoBpp;
	Uint32 videoFlags;
	
	if ( SDL_Init(SDL_INIT_VIDEO) < 0 ) {
		fprintf(stderr, "Unable to initialize SDL: %s\n", SDL_GetError());
		exit(1);
	}
	atexit(SDL_Quit);
	
	videoBpp = BPP;
	videoFlags = SDL_DOUBLEBUF | SDL_HWSURFACE | SDL_HWPALETTE;
	if ( !window ) videoFlags |= SDL_FULLSCREEN;
	
	if ( (video = SDL_SetVideoMode(SCREEN_WIDTH, SCREEN_HEIGHT, videoBpp, videoFlags)) == NULL ) {
		fprintf(stderr, "Unable to create SDL screen: %s\n", SDL_GetError());
		SDL_Quit();
		exit(1);
	}
	screenRect.x = screenRect.y = 0;
	screenRect.w = SCREEN_WIDTH; screenRect.h = SCREEN_HEIGHT;
	
	SDL_WM_SetCaption("test", NULL);
}

int main(int argc, char *argv[]) {
	initSDL(windowMode);
	int done = 0;
	int i,j;
	for(i=0; i<256; i++){
		SDL_Event event;
		while ( SDL_PollEvent(&event) ) {
			switch ( event.type ) {
			case SDL_QUIT:
				done = 1;
				break;
			case SDL_KEYDOWN:
				if ( event.key.keysym.sym == SDLK_ESCAPE ) {
					done = 1;
				}
				break;
			}
		}
		if (done != 0)
			break;
		
		SDL_FillRect(video, &screenRect, i<<16 | i<<8 | i);
		/*
		for(j=0;j<400;j++){
			//putpixel(video,j+i,j,0x0000ff); 
			DrawPixel(video,j,j,0x00,0x00,0xff);
		}
		*/

		for(j=0; j<400; j++) {
			lineColor(video,0,0,400,j,0x0000ffff);
		}

		SDL_Flip(video);
		//SDL_Delay(100/60);
	}



	SDL_Quit();
}

