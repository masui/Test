// 江渡氏のソース ほぼそのまま
// http://eto.com/d/0210.html#eKUl0DxOYt_7Ea4Y43eaOw

/*#define NOAVICAP*/
#include <stdio.h>
#include "windows.h"

#define NOMMREG
#define NOMSACM

#include "./vfw.h"

HWND hWnd;

int vfw_init()
{
	WORD driver = 0;
	int zoom_denom = 1;
	char name[256], version[256];
	CAPDRIVERCAPS drvcaps;
	BITMAPINFO bmi;
	
	hWnd = capCreateCaptureWindow("VfW",
				      // WS_CHILD | WS_VISIBLE, // 親ウィンドウがないと動かない
				      // WS_POPUP | WS_VISIBLE,
				      WS_OVERLAPPEDWINDOW | WS_VISIBLE,
				      0, 0, 640 / zoom_denom, 480 / zoom_denom,
				      0, // 親ウィンドウ
				      0);
	if(hWnd == NULL) {
		return FALSE;
	}
	
	if(!capGetDriverDescription(driver, name, 256, version, 256)) {
		fprintf(stderr, "can not get driver description\n");
		return FALSE;
	}
	fprintf(stderr, "VfW driver name : %s\n", name);
	fprintf(stderr, " version : %s\n", version);
	
	if(!capDriverConnect(hWnd, driver)) {
		hWnd = NULL;
		fprintf(stderr, "can not connect\n");
		return FALSE;
	}
	fprintf(stderr, "connected\n");
	
	capDriverGetCaps(hWnd, &drvcaps, sizeof(CAPDRIVERCAPS));
	if(drvcaps.fHasOverlay) {
		if(!capOverlay(hWnd, FALSE)) {
			return FALSE;
		}
	}
	fprintf(stderr, "disabledverlay\n");
	
	//	if(!capPreview(hWnd, FALSE)) {
	//		return FALSE;
	//	}
	//	fprintf(stderr, "disabled preview\n");

	memset(&bmi, 0, sizeof(BITMAPINFO));
	bmi.bmiHeader.biSize = sizeof(BITMAPINFOHEADER);
	bmi.bmiHeader.biWidth = 640 / zoom_denom;
	bmi.bmiHeader.biHeight = 480 / zoom_denom;
	bmi.bmiHeader.biPlanes = 1;
	bmi.bmiHeader.biBitCount = 24;
	bmi.bmiHeader.biCompression = BI_RGB;
	if(!capSetVideoFormat(hWnd, &bmi, sizeof(BITMAPINFO))) {
		fprintf(stderr, "%s: %d: cannot set video format (zoom_denom=%d)\n", __FILE__, __LINE__, zoom_denom);
		return FALSE;
	}
	fprintf(stderr, "set video capture format\n");

	capGrabFrame(hWnd);

	//capPreviewRate( hWnd, 1 );			//プレビューレートの設定
	//capPreview( hWnd, TRUE );

	//capOverlay( hWnd, TRUE );    //	オーバーレイモードで動作

	//ShowWindowAsync( hWnd, SW_SHOW );
	//ShowWindow(hWnd, SW_SHOW);

	while(1){
		capGrabFrame(hWnd);
		UpdateWindow(hWnd);
	}
	
	/* if(!capSetUserData(hWnd, this)) {
	   return FALSE;
	   }
	   fprintf(stderr, "set user data\n");
	*/
	
	return TRUE;
}

int vfw_quit()
{
	if(!capDriverDisconnect(hWnd)) {
		fprintf(stderr, "can not disconnect\n");
		return FALSE;
	}
	fprintf(stderr, "disconnected\n");
	return TRUE;
}

main()
{
	int ret = vfw_init();
	_sleep(4000);
	ret = vfw_quit();
}






