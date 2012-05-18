// nervousTV
// Copyright (c) 2002 Edo Tannenbaum
// ported and arranged by Kentaro Fukuchi
// This code is released under the GNU General Public License.

// PImageにしてみた版

import processing.video.*;

final int W = 160;
final int H = 120;
final int PLANES = 128;
boolean newFrame = false;
PImage[] buffer = new PImage[PLANES];
int bufferIdx = 0;
float noiseX = 0.0;

Capture video;

void setup()
{
    int i;
    
    size(W, H);
    // beginVideo(W, H, 30);
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

//void loop()
void draw()
{
    int i, x, y;
    if(newFrame) {
	buffer[bufferIdx].copy(video, 0, 0, W, H, 0, 0, W, H);
	//buffer[bufferIdx].replicate(video, 0, 0, W, H, 0, 0, W, H);
	bufferIdx++;
	newFrame = false;
	if(bufferIdx == PLANES) {
	    bufferIdx = 0;
	}
	i = int(noise(noiseX)*PLANES)+bufferIdx;
	noiseX += 0.2;
	image(buffer[i % PLANES], 0, 0);
	// updatePixels(); 
    }
}
