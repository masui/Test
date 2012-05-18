//
//	$Date: 2004/07/22 16:33:34 $
//	$Revision: 1.3 $
//

#ifndef _IMAGE_H_
#define _IMAGE_H_

#include "shape.h"

typedef struct {
	int width;
	int height;
	unsigned long *pixel;
} Image;

Image *image_new(int w, int h);

void image_invert(Image *src, Image *dst);
void image_copy(Image *src, Image *dst);
void get_bright_area(Image *src, Image *dst);
void color_binary(Image *src, Image *dst,
		  unsigned long color1, unsigned long color2);
void label_area(Image *p1, Image *p2);
void get_largest_area(Image *p1, Image *p2);
void remove_hollow(Image *p1, Image *p2);
Rectangle recognize_rectangle(Image *p);

#define RED(x) (((x) >> 16) & 0xff)
#define GREEN(x) (((x) >> 8) & 0xff)
#define BLUE(x) ((x) & 0xff)
#define COLOR(r,g,b) ((r) << 16 | (g) << 8 | (b))

#define BRIGHTP(color) (RED(color) > 120 && GREEN(color) > 120 && BLUE(color) > 120)
#define BLUEP(color) (BLUE(color) > GREEN(color)+20 && BLUE(color) >> RED(color)+20)

#endif



