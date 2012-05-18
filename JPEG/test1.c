#include <stdio.h>
#include "jpeglib.h"

extern JSAMPLE * image_buffer;	/* Points to large array of R,G,B-order data */

main(int argc, char **argv)
{
	struct jpeg_error_mgr pub;	/* "public" fields */

	struct jpeg_decompress_struct cinfo;

	FILE * infile;		/* source file */
	JSAMPARRAY buffer;		/* Output row buffer */
	int row_stride;		/* physical row width in output buffer */

	char *filename;

	if(argc < 2) exit(0);
	filename = argv[1];
	printf("argc=%d, filename=%s\n",argc,filename);
	

	if ((infile = fopen(filename, "rb")) == NULL) {
		fprintf(stderr, "can't open %s\n", filename);
		return 0;
	}

	cinfo.err = jpeg_std_error(&pub);

	jpeg_create_decompress(&cinfo); 

	/* Step 2: specify data source (eg, a file) */
	
	jpeg_stdio_src(&cinfo, infile);

	/* Step 3: read file parameters with jpeg_read_header() */

	(void) jpeg_read_header(&cinfo, TRUE);

	printf("width = %d\n",cinfo.image_width);

	(void) jpeg_start_decompress(&cinfo);

	row_stride = cinfo.output_width * cinfo.output_components;
	printf("row_stride = %d\n",row_stride);

	/* Make a one-row-high sample array that will go away when done with image */
	buffer = (*cinfo.mem->alloc_sarray)
		((j_common_ptr) &cinfo, JPOOL_IMAGE, row_stride, 1);

	/* Step 6: while (scan lines remain to be read) */
	/*           jpeg_read_scanlines(...); */

	/* Here we use the library's state variable cinfo.output_scanline as the
	 * loop counter, so that we don't have to keep track ourselves.
	 */
	while (cinfo.output_scanline < cinfo.output_height) {
		/* jpeg_read_scanlines expects an array of pointers to scanlines.
		 * Here the array is only one element long, but you could ask for
		 * more than one scanline at a time if that's more convenient.
		 */
		(void) jpeg_read_scanlines(&cinfo, buffer, 1);
		/* Assume put_scanline_someplace wants a pointer and sample count. */
		// put_scanline_someplace(buffer[0], row_stride);
	}
	/* Step 7: Finish decompression */
	
	(void) jpeg_finish_decompress(&cinfo);

	jpeg_destroy_decompress(&cinfo);

	fclose(infile);
}






