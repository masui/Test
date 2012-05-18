//
// http://eto.com/d/0210.html#eKUl0DxOYt_7Ea4Y43eaOw より.
// MinGWでSDLを使うテスト
//
#include <stdio.h>
#include <SDL.h>

#define BPP 24
#define SCREEN_WIDTH 1024
#define SCREEN_HEIGHT 768

int windowMode = 0; // FullScreen
static SDL_Surface *video;
static SDL_Rect screenRect;

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
	int i;
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
		SDL_Flip(video);
		SDL_Delay(100/60);
	}
	SDL_Quit();
}

