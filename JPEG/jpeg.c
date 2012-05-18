//
// JPEGファイル読み込みライブラリ libjpeg使用。
//
// $Date: 2004/07/21 09:11:08 $
// $Revision: 1.2 $
//

#include <stdio.h>
#include "jpeglib.h"

#include "image.h"
#include "jpeg.h"

//
// JPEG画像ファイルをImageデータ構造に読み込む。 libjpegのサンプルをもとにしている。
//
Image *jpeg_read(char *filename)
{
	struct jpeg_error_mgr pub;
	struct jpeg_decompress_struct cinfo;

	FILE *f;
	JSAMPARRAY buffer;	/* Output row buffer */
	int row_stride;		/* physical row width in output buffer */

	Image *image;
	int x,y,ind;

	if ((f = fopen(filename, "rb")) == NULL) {
		fprintf(stderr, "can't open %s\n", filename);
		return FALSE;
	}

	cinfo.err = jpeg_std_error(&pub);

	jpeg_create_decompress(&cinfo); 
	
	jpeg_stdio_src(&cinfo, f);

	(void) jpeg_read_header(&cinfo, TRUE);

	image = image_new(cinfo.image_width,cinfo.image_height);
	if(image == NULL) return NULL;

	(void) jpeg_start_decompress(&cinfo);

	row_stride = cinfo.output_width * cinfo.output_components;

	/* Make a one-row-high sample array that will go away when done with image */
	buffer = (*cinfo.mem->alloc_sarray)((j_common_ptr) &cinfo, JPOOL_IMAGE, row_stride, 1);

	/* Step 6: while (scan lines remain to be read) */
	/*           jpeg_read_scanlines(...); */

	/* Here we use the library's state variable cinfo.output_scanline as the
	 * loop counter, so that we don't have to keep track ourselves.
	 */
	y = 0;
	while (cinfo.output_scanline < cinfo.output_height) {
		/* jpeg_read_scanlines expects an array of pointers to scanlines.
		 * Here the array is only one element long, but you could ask for
		 * more than one scanline at a time if that's more convenient.
		 */
		(void) jpeg_read_scanlines(&cinfo, buffer, 1);

		for(x=0;x<cinfo.image_width;x++){
			ind = x * 3;
			image->pixel[y * cinfo.image_width + x] =
				COLOR((int)buffer[0][ind],(int)buffer[0][ind+1],(int)buffer[0][ind+2]);
		}
		// put_scanline_someplace(buffer[0], row_stride);
		y++;
	}
	/* Step 7: Finish decompression */
	
	(void) jpeg_finish_decompress(&cinfo);

	jpeg_destroy_decompress(&cinfo);

	fclose(f);

	return image;
}





