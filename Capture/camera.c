//
// Video for Windowsを使ったカメラキャプチャ
//
// $Date: 2004/07/15 07:32:29 $
// $Revision: 1.3 $
//

#include <stdio.h>
#include "windows.h"
#include "wingdi.h"

#define USE_CLIPBOARD
#undef  USE_CALLBACK

#define NOMMREG		// vfw.hの不要部を使わないようにするため
#define NOMSACM		// vfw.hの不要部を使わないようにするため
#include "./vfw.h"	// MS VC++から持ってきたもの

#include "camera.h"

static HWND hWnd;
static LPBITMAPINFOHEADER lpInfo;     // BITMAPINFOHEADER構造体のポインタ

static int camera_width = 0, camera_height = 0;
static unsigned char *camera_buf;

int camera_open(int width, int height)
{
	camera_width = width;
	camera_height = height;
	camera_buf = (unsigned char*)malloc(width*height*3);

	hWnd = capCreateCaptureWindow("VfW",
				      // WS_OVERLAPPEDWINDOW | WS_VISIBLE, // 表示する
				      WS_OVERLAPPEDWINDOW, // 表示しない
				      0, 0, width, height,
				      0, // 親ウィンドウ
				      0);
	if(hWnd == NULL) {
		fprintf(stderr,"capCreateCaptureWindow fail\n");
		return FALSE;
	}
	
	WORD driver = 0;
	if(!capDriverConnect(hWnd, driver)) {
		fprintf(stderr,"capDriveConnect() failn");
		return FALSE;
	}
	/*
	CAPDRIVERCAPS drvcaps;
	capDriverGetCaps(hWnd, &drvcaps, sizeof(CAPDRIVERCAPS));
	if(drvcaps.fHasOverlay) {
		if(!capOverlay(hWnd, FALSE)) {
			return FALSE;
		}
	}
	fprintf(stderr, "disabledverlay\n");
	
	if(!capPreview(hWnd, FALSE)) {
		return FALSE;
	}
	fprintf(stderr, "disabled preview\n");
	*/

	BITMAPINFO bmi;
	memset(&bmi, 0, sizeof(BITMAPINFO));
	bmi.bmiHeader.biSize = sizeof(BITMAPINFOHEADER);
	bmi.bmiHeader.biWidth = width;
	bmi.bmiHeader.biHeight = height;
	bmi.bmiHeader.biPlanes = 1;
	bmi.bmiHeader.biBitCount = 24;
	bmi.bmiHeader.biCompression = BI_RGB;
	if(!capSetVideoFormat(hWnd, &bmi, sizeof(BITMAPINFO))) {
		fprintf(stderr, "%s: %d: cannot set video format\n", __FILE__, __LINE__);
		return FALSE;
	}
	fprintf(stderr, "set video capture format\n");
       
	lpInfo = (LPBITMAPINFOHEADER)malloc(sizeof(BITMAPINFOHEADER));  // メモリ確保
	lpInfo->biSize = sizeof(BITMAPINFOHEADER);   // これは決まり文句
	lpInfo->biWidth = camera_width;    // 画像の幅
	lpInfo->biHeight = camera_height;  // 画像の高さ
	lpInfo->biPlanes = 1;          // 1らしい
	lpInfo->biBitCount = 24;       // 1ドットを表すためのビット数
	lpInfo->biCompression = 0;     // 圧縮はなし

	return TRUE;
}

#ifdef USE_CLIPBOARD
// クリップボードを利用してデータ取得する版
int camera_capture(unsigned long *buf)
{
	HDC hDC;
	hDC = GetDC(NULL);         // 画面のデバイスコンテキストを取得

	HBITMAP bmHandle;
	BITMAP bmBitmap;

	capGrabFrame(hWnd);	// 1フレームキャプチャ
	capEditCopy(hWnd);	// クリップボードにコピー
	if(IsClipboardFormatAvailable(CF_BITMAP)){ 
		if(OpenClipboard(NULL)){ // これをやらないとクリップボードのデータがとれない!
			bmHandle = (HBITMAP)GetClipboardData(CF_BITMAP);
			GetObject(bmHandle, sizeof (BITMAP) , (LPSTR)&bmBitmap);
			GetDIBits(
				  hDC,                   // デバイスコンテキスト（参照）
				  bmHandle,              // HBITMAP型、ビットマップ（入力）
				  1,                     // データ取得を開始する行（参照）
				  bmBitmap.bmHeight,     // データを取得する行数（参照）
				  camera_buf,            // void*型、バッファ（出力）
				  (LPBITMAPINFO)lpInfo,  // 出力形式の指定（参照）
				  DIB_RGB_COLORS         // 今は特に意味ない
				  );
			int i;
			unsigned char *p = camera_buf;
			unsigned long *q = buf;

			int x,y;
			for(y=0;y<camera_height;y++){
				// p = camera_buf + (camera_height-1-y) * camera_width * 3;
				q = buf + (camera_height-1-y) * camera_width;
				for(x=0;x<camera_width;x++){
					*q++ = (*(p+2) << 16 | *(p+1) << 8 | *p);
					p += 3;
				}
			}
			/*
			printf("p = %x\n",p);
			for(i=0;i<camera_width * camera_height;i++){
				*q++ = (*(p+2) << 16 | *(p+1) << 8 | *p);
				p += 3;
			}
			*/
			CloseClipboard();
		}
	}
	UpdateWindow(hWnd);	// これがないと表示されない
	return TRUE;
}
#endif

#ifdef USE_CALLBACK
#endif

int camera_close()
{
	if(!capDriverDisconnect(hWnd)) {
		fprintf(stderr, "can not disconnect\n");
		return FALSE;
	}
	fprintf(stderr, "disconnected\n");
	return TRUE;
}

#define WIDTH 320
#define HEIGHT 240

#ifdef TEST
main()
{
	unsigned char *buf;
	buf = malloc(WIDTH * HEIGHT * sizeof(long));   // メモリ確保
	camera_open(WIDTH,HEIGHT);
	while(1){
		camera_capture(buf);
		printf("%x %x %x\n",buf[0],buf[1],buf[2],buf[3]);
	}
	camera_close();
}
#endif


