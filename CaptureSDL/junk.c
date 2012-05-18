//
// Video for Windows��SDL��g�݂��킹��MinGW�Ŏg������
//

#include <stdio.h>
#include <SDL.h>
// SDL���g���ƁAstdout��stdout.txt�Ƃ������t�@�C���ɏ�����Ă��܂��B�ǂ��Ȃ��Ă���̂��B

#define BPP 32
#define SCREEN_WIDTH 640
#define SCREEN_HEIGHT 480
#define CAMERA_WIDTH 640
#define CAMERA_HEIGHT 480

#include "camera.h"
#include "image.h"
#include "shape.h"

//void putpixel(SDL_Surface *video, int x, int y, unsigned long color)
//{
//	Uint8 *p;
//	p = (Uint8 *)video->pixels + (SCREEN_HEIGHT-1-y) * video->pitch + x * 4;
//	*(Uint32*)p = color;
//}
//#define putpixel(video,x,y,color) (*(Uint32*)((Uint8 *)video->pixels + (SCREEN_HEIGHT-1-y) * video->pitch + x * 4) = color)
#define putpixel(video,x,y,color) (*(Uint32*)((Uint8 *)video->pixels + (y) * video->pitch + (x) * 4) = color)

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

void display_rectangle (SDL_Surface *dst, Rectangle rect)
{
	double c,s,w2,h2;
	Sint16 vx[4],vy[4];

	c = cos(rect.theta);
	s = sin(rect.theta);
	w2 = rect.w / 2.0;
	h2 = rect.h / 2.0;

	vx[0] = (int)(w2 * c + h2 * s + rect.centerx);
	vy[0] = (int)(w2 * -s + h2 * c + rect.centery);
	vx[1] = (int)(w2 * c + -h2 * s + rect.centerx);
	vy[1] = (int)(w2 * -s + -h2 * c + rect.centery);
	vx[2] = (int)(-w2 * c + -h2 * s + rect.centerx);
	vy[2] = (int)(-w2 * -s + -h2 * c + rect.centery);
	vx[3] = (int)(-w2 * c + h2 * s + rect.centerx);
	vy[3] = (int)(-w2 * -s + h2 * c + rect.centery);
	polygonColor(dst,vx,vy,4,0xffffff);
}

void get_rectangle_colors(unsigned long *src, Rectangle rect, unsigned long *result)
// src���̋�`�̈�̐F���擾
{
	int x,y;
	int i,j;
	int hh = 100;
	int ww = 100;
	double x1,y1;
	double x2,y2;
	double c,s;
	double w2,h2;
	double r,g,b;
	int xx, yy;
	unsigned long col;
	
	c = cos(rect.theta);
	s = sin(rect.theta);
	
	for(y=0;y<10;y++){
		for(x=0;x<10;x++){
			r = 0.0;
			g = 0.0;
			b = 0.0;
			for(i=0;i<10;i++){
				for(j=0;j<10;j++){
					yy = y * 10 + i;
					xx = x * 10 + j;
					w2 = rect.w * 0.95;
					h2 = rect.h * 0.95;
					x1 = xx * w2 / ww - w2 / 2.0;
					y1 = yy * h2 / hh - h2 / 2.0;
					x2 = c * x1 + s * y1 + rect.centerx;
					y2 = -s * x1 + c * y1 + rect.centery;
					if(x2 < 0) x2 = 0;
					if(x2 >= CAMERA_WIDTH) x2 = CAMERA_WIDTH-1;
					if(y2 < 0) y2 = 0;
					if(y2 >= CAMERA_HEIGHT) y2 = CAMERA_HEIGHT-1;
					col = src[(int)y2*CAMERA_WIDTH+(int)x2];
					r += RED(col);
					g += GREEN(col);
					b += BLUE(col);
				}
			}
			r /= 100.0;
			g /= 100.0;
			b /= 100.0;
			result[y*10+x] = COLOR((int)r,(int)g,(int)b);
		}
	}
}

void display_rectangle_colors(SDL_Surface *video, unsigned long *p)
{
	int x,y;
	int i,j;
 
	for(y=0;y<10;y++){
		for(x=0;x<10;x++){
			for(i=0;i<10;i++){
				for(j=0;j<10;j++){
					putpixel(video,x*10+j,y*10+i,p[y*10+x]);
					// pixels[(y*10+i)*width+(x*10+j)] = p[y][x];
				}
			}
		}
	}
}

void normalize(unsigned long *pat)
//
// ���K�������B�e�X�̐F�����ɂ��čs�Ȃ��̂ł͂Ȃ��A���x�ɂ���
// �v�Z���ׂ��ł��낤�B
//
{
	double rmin, gmin, bmin;
	double rmax, gmax, bmax;
	double rdif, gdif, bdif;
	int i,j;
	unsigned int c;
	
	rmin = gmin = bmin = 255;
	rmax = gmax = bmax = 0;
	
	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			c = pat[i*10+j];
			if(RED(c) < rmin) rmin = RED(c);
			if(GREEN(c) < gmin) gmin = GREEN(c);
			if(BLUE(c) < bmin) bmin = BLUE(c);
			if(RED(c) > rmax) rmax = RED(c);
			if(GREEN(c) > gmax) gmax = GREEN(c);
			if(BLUE(c) > bmax) bmax = BLUE(c);
		}
	}
	rdif = rmax - rmin;
	gdif = gmax - gmin;
	bdif = bmax - bmin;
	
	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			double r,g,b;
			c = pat[i*10+j];
			r = ((RED(c)-rmin)/(rmax-rmin))*255;
			g = ((GREEN(c)-gmin)/(gmax-gmin))*255;
			b = ((BLUE(c)-bmin)/(bmax-bmin))*255;
			pat[i*10+j] = COLOR((int)r,(int)g,(int)b);
		}
	}
}

void display_image(SDL_Surface *video, Image *image, int xpos, int ypos)
{
	int x,y;
	for(y=0;y<image->height;y++){
		for(x=0;x<image->width;x++){
			putpixel(video,x+xpos,y+ypos,camerapixel(image->pixel,x,y));
		}
	}
}

int main(int argc, char *argv[]) {
	int i;
	int x,y;
	//
	// �J�����L���v�`���̃Z�b�g�A�b�v
	// SDL_Init()���O�Ɏ��s���Ȃ���΂Ȃ�Ȃ��B
	//
	unsigned long *p;
	camera_open(CAMERA_WIDTH,CAMERA_HEIGHT);
	p = (unsigned long*)malloc(CAMERA_WIDTH * CAMERA_HEIGHT * sizeof(Uint32));

	Image *imagecamera, *image1, *image2, *image10;
	imagecamera = image_new(CAMERA_WIDTH,CAMERA_HEIGHT);
	image1 = image_new(CAMERA_WIDTH,CAMERA_HEIGHT);
	image2 = image_new(CAMERA_WIDTH,CAMERA_HEIGHT);
	image10 = image_new(10,10);

	//unsigned long *col10;
	//col10 = (unsigned long*)malloc(10 * 10 * sizeof(Uint32));

	//
	// SDL�������Ȃ�
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

	for(i=0; i<600; i++){
		int done = 0;
		SDL_Event event;
		Rectangle rect;

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
		
		camera_capture(p);
		imagecamera->pixel = p;
		image_copy(imagecamera,image1);
		get_bright_area(image1,image2);
		label_area(image2,image1);
		get_largest_area(image1,image2);
		remove_hollow(image2,image1);
		display_image(video,imagecamera,0,0);

		rect = recognize_rectangle(image1);
		/*
		for(y=0;y<SCREEN_HEIGHT;y++){
			for(x=0;x<SCREEN_WIDTH;x++){
				putpixel(video,x,y,camerapixel(image1->pixel,x,y));
			}
		}
		*/
		/*
		for(y=0;y<SCREEN_HEIGHT;y++){
			for(x=0;x<SCREEN_WIDTH;x++){
				putpixel(video,x,y,camerapixel(p,x,y));
			}
		}
		*/
		display_rectangle(video,rect);

		get_rectangle_colors(p,rect,image10->pixel);
		normalize(image10->pixel);
		display_rectangle_colors(video,image10->pixel);

		SDL_Flip(video);
	}

	SDL_Quit();
}