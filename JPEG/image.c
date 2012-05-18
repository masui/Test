#include <stdio.h>
#include <stdlib.h>
#include "image.h"

Image *image_new(int w, int h)
{
	Image *image;
	image = (Image*)malloc(sizeof(Image));
	image->width = w;
	image->height = h;
	image->pixel = (unsigned long*)malloc(w * h * sizeof(unsigned long));
	return image;
}
