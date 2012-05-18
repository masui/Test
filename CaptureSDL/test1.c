//
// Video for WindowsとSDLを組みあわせてMinGWで使う実験
//

#include <stdio.h>
#include <SDL.h>
// SDLを使うと、stdoutがstdout.txtとかいうファイルに書かれてしまう。どうなっているのか。

#define BPP 32
#define SCREEN_WIDTH 640
#define SCREEN_HEIGHT 480

#include "camera.h"

#define CAMERA_WIDTH 640
#define CAMERA_HEIGHT 480

//void putpixel(SDL_Surface *video, int x, int y, unsigned long color)
//{
//	Uint8 *p;
//	p = (Uint8 *)video->pixels + (SCREEN_HEIGHT-1-y) * video->pitch + x * 4;
//	*(Uint32*)p = color;
//}
#define putpixel(video,x,y,color) (*(Uint32*)((Uint8 *)video->pixels + (SCREEN_HEIGHT-1-y) * video->pitch + x * 4) = color)

//unsigned long camerapixel(unsigned long *buf, int x, int y)
//{
//	/*
//	Uint8 *p;
//	p = buf + (y * CAMERA_WIDTH + x) * 3;
//	return *(p+2) << 16 | *(p+1) << 8 | *p;
//	*/
//	return *(buf + y * CAMERA_WIDTH + x);
//}

#define camerapixel(buf,x,y) (*(buf + y * CAMERA_WIDTH + x))

#define red(x) (((x) >> 16) & 0xff)
#define green(x) (((x) >> 8) & 0xff)
#define blue(x) ((x) & 0xff)
#define color(r,g,b) ((r) << 16 | (g) << 8 | (b))

int main(int argc, char *argv[]) {
	//
	// カメラキャプチャのセットアップ
	// SDL_Init()より前に実行しなければならない。
	//
	unsigned long *camerabuf;
	camera_open(CAMERA_WIDTH,CAMERA_HEIGHT);
	camerabuf = (unsigned long*)malloc(CAMERA_WIDTH * CAMERA_HEIGHT * sizeof(Uint32));

	unsigned long *dst;
	dst = (unsigned long*)malloc(CAMERA_WIDTH * CAMERA_HEIGHT * sizeof(Uint32));

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

	int i;
	for(i=0; i<60; i++){
		int done = 0;
		SDL_Event event;

		while(SDL_PollEvent(&event)){
			switch (event.type){
			case SDL_QUIT:
				done = 1;
				break;
			case SDL_KEYDOWN:
				if(event.key.keysym.sym == SDLK_ESCAPE){
					done = 1;
				}
				break;
			}
		}
		if (done != 0)
			break;
		
		camera_capture(camerabuf);

		int x,y;
		for(y=0;y<SCREEN_HEIGHT;y++){
			for(x=0;x<SCREEN_WIDTH;x++){
				unsigned int color;
				color = camerapixel(camerabuf,x,y);
				putpixel(video,x,y,color);
			}
		}

		SDL_Flip(video);
	}

	SDL_Quit();
}
