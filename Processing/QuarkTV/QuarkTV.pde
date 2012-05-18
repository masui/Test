// QuarkTV
// Copyright (c) 2001-2004 Kentaro Fukuchi
import processing.video.*;

final static int W = 320;
final static int H = 240;
final static int PLANES = 16;

boolean newFrame = false;
PImage[] buffer = new PImage[PLANES];
int bufferIdx = 0;
int fastrand_val;

// Variable for capture device
Capture video;

void setup()
{
    int i;
    
    size(W, H);
    //beginVideo(W, H, 30);
    video = new Capture(this, W, H, 30);
    for(i=0; i<PLANES; i++) {
	buffer[i] = new PImage(W, H);
    }
}

//void videoEvent()
void captureEvent(Capture camera)
{
    camera.read();
    newFrame = true;
}

//for Alpha version
//void loop()
void draw()
{
    int i, cf;
    
    loadPixels();
    if(newFrame) {
	buffer[bufferIdx].copy(video, 0, 0, W, H, 0, 0, W, H);
	//buffer[bufferIdx].replicate(video, 0, 0, W, H, 0, 0, W, H);
	bufferIdx++;
	newFrame = false;
	if(bufferIdx == PLANES) {
	    bufferIdx = 0;
	}
	for(i=W*H-1; i>=0; i--) {
	    fastrand_val = fastrand_val * 1103515245 + 12345;
	    cf = (fastrand_val >> 24) & (PLANES - 1);
	    pixels[i] = buffer[cf].pixels[i];
	}
	updatePixels(); 
    }
}
