#ifndef _CAMERA_H_
#define _CAMERA_H_

// $Date: 2004/07/13 00:01:57 $
// $Revision: 1.1 $

int camera_open(int width, int height);
int camera_capture(unsigned long *buf);
int camera_close();

#endif

