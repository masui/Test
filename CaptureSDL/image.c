//
// 簡単な画像処理ライブラリ
//
// $Date: 2004/07/22 16:33:34 $
// $Revision: 1.5 $
//

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "image.h"
#include "shape.h"

#define POS(x,y) ((y)*(srcimage->width)+(x))
#define P1(x,y) p1[POS(x,y)]
#define P2(x,y) p2[POS(x,y)]

Image *image_new(int w, int h)
{
	Image *image;
	image = (Image*)malloc(sizeof(Image));
	image->width = w;
	image->height = h;
	image->pixel = (unsigned long*)malloc(w * h * sizeof(unsigned long));
	return image;
}

void image_copy(Image *srcimage, Image *dstimage)
{
	int i;
	unsigned long *src,*dst;

	if(srcimage->width != dstimage->width ||
	   srcimage->height != dstimage->height) return;
	src = srcimage->pixel;
	dst = dstimage->pixel;
	for(i=0;i<srcimage->width * srcimage->height;i++){
		*dst++ = *src++;
	}
}

void image_invert(Image *srcimage, Image *dstimage)
{
	int i;
	unsigned long color;
	unsigned long *src,*dst;

	if(srcimage->width != dstimage->width ||
	   srcimage->height != dstimage->height) return;
	src = srcimage->pixel;
	dst = dstimage->pixel;
	for(i=0;i<srcimage->width * srcimage->height;i++){
		color = *src++;
		*dst++ = COLOR(0xff-RED(color),0xff-GREEN(color),0xff-BLUE(color));
	}
}

// 二値画像を得る
void get_bright_area(Image *srcimage, Image *dstimage)
{
	int i;
	unsigned long color;
	unsigned long *src,*dst;

	if(srcimage->width != dstimage->width ||
	   srcimage->height != dstimage->height) return;
	src = srcimage->pixel;
	dst = dstimage->pixel;
	for(i=0;i<srcimage->width * srcimage->height;i++){
		color = *src++;
		*dst++ = (BRIGHTP(color) ? 1 : 0);
	}
}

// 二値画像に色をつける
void color_binary(Image *srcimage, Image *dstimage,
		  unsigned long fgcolor, unsigned long bgcolor)
{
	int i;
	unsigned long color;
	unsigned long *src,*dst;

	if(srcimage->width != dstimage->width ||
	   srcimage->height != dstimage->height) return;
	src = srcimage->pixel;
	dst = dstimage->pixel;
	for(i=0;i<srcimage->width * srcimage->height;i++){
		*dst++ = (*src++ ? fgcolor : bgcolor);
	}
}

// 二値画像p1を領域に分けて領域番号をp2に格納
// 領域番号は1から
//
//             ■ v1
//        v2 ■□ ← これのラベルを計算
//
void label_area(Image *srcimage, Image *dstimage)
{
	int i,x,y;
	int *lut;
	int v,v1,v2;
	int label;
	unsigned long *p;
	
	unsigned long *p1,*p2;

	if(srcimage->width != dstimage->width ||
	   srcimage->height != dstimage->height) return;
	p1 = srcimage->pixel;
	p2 = dstimage->pixel;

	lut = (int*)calloc(srcimage->width * srcimage->height, sizeof(int));
	
	label = 1;
	
	for(p=p2,i=0;i<srcimage->height * srcimage->width;i++,p++){ // p2を0で初期化
		*p = 0;
	}
	for(y=0;y<srcimage->height;y++){
		for(x=0;x<srcimage->width;x++){
			if(P1(x,y) == 1){
				v1 = v2 = 0;
				if(y > 0) v1 = P2(x,y-1);
				if(x > 0) v2 = P2(x-1,y);
				if(v1 == 0 && v2 == 0){
					v = label++;
					lut[v] = v;
				}
				else if(v1 == 0 || v2 == 0){
					v = v1 + v2;
				}
				else {
					v = v1;
					if(v1 != v2){
						if(v2 < v1){ // 小さい方の番号にあわせる
							v = v2;
							v2 = v1;
							v1 = v;
						}
						for(i=0;i<label;i++){
							if(lut[i] == v2){
								lut[i] = v1;
							}
						}
					}
				}
				P2(x,y) = v;
			}
		}
	}

	free(lut);
}

// 最大の領域を求める
void get_largest_area(Image *srcimage, Image *dstimage)
{
	int i,x,y,l;
	unsigned int *labelcount;
	int nlabels;
	int max, maxlabel;
	unsigned long *p;
	unsigned long *p1,*p2;

	if(srcimage->width != dstimage->width ||
	   srcimage->height != dstimage->height) return;
	p1 = srcimage->pixel;
	p2 = dstimage->pixel;

	labelcount = (unsigned int*)calloc(srcimage->width * srcimage->height, sizeof(unsigned int));

	nlabels = 0;

	for(p=p1,i=0;i<srcimage->width * srcimage->height;i++,p++){
		l = *p;
		if(l > nlabels){
			nlabels = l;
		}
		labelcount[l]++;
	}
	//
	// ただし、画像の縁を含むものは除く...
	//
	for(y=0;y<srcimage->height;y++){
		labelcount[P1(0,y)] = 0;
		labelcount[P1(srcimage->width-1,y)] = 0;
	}
	for(x=0;x<srcimage->width;x++){
		labelcount[P1(x,0)] = 0;
		labelcount[P1(x,srcimage->height-1)] = 0;
	}
	max = 0;
	maxlabel = 0;
	for(i=1;i<=nlabels;i++){ // 領域番号は1から
		if(labelcount[i] > max){
			max = labelcount[i];
			maxlabel = i;
		}
	}
	for(y=0;y<srcimage->height;y++){
		for(x=0;x<srcimage->width;x++){
			P2(x,y) = ((P1(x,y) == maxlabel) ? 1 : 0);
		}
	}
	
	free(labelcount);
}

//void select_label(unsigned long *src, unsigned long *dst, int label)
//{
//	int i;
//	unsigned long color;
//	
//	for(i=0;i<width*height;i++){
//		color = *src++;
//		*dst++ = (color == label ? 1 : 0);
//	}
//}

void remove_hollow(Image *srcimage, Image *dstimage)
{
	// 求めた領域は中空かもしれないので、この領域の外側の領域を
	// 求めてからその反転領域を計算する。
	//
	int i,j;
	unsigned long *q1, *q2;
	unsigned long *p1,*p2;

	if(srcimage->width != dstimage->width ||
	   srcimage->height != dstimage->height) return;
	p1 = srcimage->pixel;
	p2 = dstimage->pixel;

	for(q1=p1,q2=p2,i=0;i<srcimage->width * srcimage->height;i++,q1++,q2++){
		*q2 = (*q1 == 0 ? 1 : 0);
	}
	label_area(dstimage,srcimage);
	for(q1=p1,q2=p2,i=0;i<srcimage->width * srcimage->height;i++,q1++,q2++){
		*q2 = (*q1 == 1 ? 0 : 1);
	}
}

Rectangle recognize_rectangle(Image *srcimage)
{
	int x,y;
	double xtotal, ytotal;
	double size;
	double m;
	double r;
	Rectangle rect;
	unsigned long *p;

	p = srcimage->pixel;

	// 重心と面積を求める
	xtotal = 0.0;
	ytotal = 0.0;
	size = 0.0;
	for(y=0;y<srcimage->height;y++){
		for(x=0;x<srcimage->width;x++){
			if(p[POS(x,y)] == 1){
				size += 1.0;
				xtotal += x;
				ytotal += y;
			}
		}
	}
	printf("[0,0] = %d\n",p[0]);
	printf("size = %f\n",size);
	rect.centerx = xtotal / size;
	rect.centery = ytotal / size;
	printf("%f:%f\n",rect.centerx,rect.centery);
    
	// 2次モーメント計算
	m = 0.0;
	for(y=0;y<srcimage->height;y++){
		for(x=0;x<srcimage->width;x++){
			if(p[POS(x,y)]==1){
				m += ((x-rect.centerx)*(x-rect.centerx) + (y-rect.centery)*(y-rect.centery));
			}
		}
	}
	//
	//
	// w * h の矩形だとすpると、
	//   面積             size = w * h
	//   回転モーメント   m = 1/12 * w * h * (w*w + h*h)
	// となる。これらから導出される2次方程式を解けば
	// w と h が計算されることになる。微妙にルートの中身がマイナスになったりすることがあるので
	// それに注意して解けば割と正確な値を計算することができる。
	//
	r = (6.0*m)*(6.0*m) - size*size*size*size;
	if(r < 0.0) r = 0.0;
	rect.w = sqrt(((6.0*m) + sqrt(r)) / size);
	rect.h = size / rect.w;
	
	//
	// 回転計算  ... 以下の説明を読んで計算しているが原理を理解していない。
	// いろいろなモーメントを計算するらしいが...
	// http://mikilab.doshisha.ac.jp/dia/research/person/shuto/research/0605/tokutyo.html
	//
	double m02,m20,m11;
	m20 = 0.0;
	m02 = 0.0;
	m11 = 0.0;
	for(y=0;y<srcimage->height;y++){
		for(x=0;x<srcimage->width;x++){
			if(p[POS(x,y)]==1){
				m20 += (x-rect.centerx)*(x-rect.centerx);
				m02 += (y-rect.centery)*(y-rect.centery);
				m11 += (x-rect.centerx)*(y-rect.centery);
			}
		}
	}
	rect.theta = 0.5 * atan2(-2.0*m11,(m20-m02));

	return rect;
}
