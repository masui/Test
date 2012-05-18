#include <stdio.h>
#include <stdlib.h>

typedef struct {
	int width;
	int height;
	unsigned long *pixel;
} Image;

Image *newimage(int w, int h)
{
	Image *image;
	image = (Image*)malloc(sizeof(Image));
	image->width = w;
	image->height = h;
	image->pixel = (unsigned long*)malloc(w * h * sizeof(unsigned long));
	return image;
}

main()
{
	//	Image *image;
	//	image = new Image();
	Image *image;
	image = newimage(100,100);
	printf("weight = %d\n",image->width);
	printf("p = %d\n",image->pixel);
}
