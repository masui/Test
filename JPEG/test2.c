//
//	JPEGファイルを読み込んでSDLで表示するテスト
//	$Date: 2004/07/22 07:23:36 $
//	$Revision: 1.2 $
//
#include <stdio.h>
#include <SDL.h>
#include "image.h"
#include "jpeg.h"

#define BPP 32
#define SCREEN_WIDTH 320
#define SCREEN_HEIGHT 240

#define putpixel(video,x,y,color) (*(Uint32*)((Uint8 *)video->pixels + (SCREEN_HEIGHT-1-y) * video->pitch + x * 4) = color)

int main(int argc, char *argv[])
{
	Image *image;
	image = jpeg_read("masui01.jpg");
	printf("width = %d\n",image->width);
	printf("height = %d\n",image->height);

	//
	// SDL初期化など
	//
	if(SDL_Init(SDL_INIT_VIDEO) < 0){
		fprintf(stderr, "Unable to initialize SDL: %s\n", SDL_GetError());
		exit(1);
	}
	atexit(SDL_Quit);
	
	SDL_Surface *video;
	if((video = SDL_SetVideoMode(SCREEN_WIDTH,
				     SCREEN_HEIGHT,
				     BPP,
				     SDL_DOUBLEBUF | SDL_HWSURFACE | SDL_HWPALETTE // | SDL_FULLSCREEN
				     )) == NULL){
		fprintf(stderr, "Unable to create SDL screen: %s\n", SDL_GetError());
		SDL_Quit();
		exit(1);
	}
	SDL_WM_SetCaption("SDL Capture Window", NULL);

	int x,y,yy;
	for(y=0;y<image->height;y++){
		yy = image->height - y - 1;
		for(x=0;x<image->width;x++){
			putpixel(video,x,yy,image->pixel[y*image->width+x]);
		}
	}

	SDL_Flip(video);
	SDL_Delay(10000);

	SDL_Quit();
}
