#ifndef _IMAGE_H_
#define _IMAGE_H_

typedef struct {
	int width;
	int height;
	unsigned long *pixel;
} Image;

Image *image_new(int w, int h);

#define RED(x) (((x) >> 16) & 0xff)
#define GREEN(x) (((x) >> 8) & 0xff)
#define BLUE(x) ((x) & 0xff)
#define COLOR(r,g,b) ((r) << 16 | (g) << 8 | (b))

#endif

