//
// test3.cをもとに、とりあえず動くようにしたもの。
//
#include <stdio.h>
#include "windows.h"
#include "wingdi.h"

#define NOMMREG
#define NOMSACM

#include "./vfw.h"	// MS VC++から持ってきたもの

HWND hWnd;

#define WIDTH 320
#define HEIGHT 240

int vfw_init()
{
	hWnd = capCreateCaptureWindow("VfW",
				      // WS_CHILD | WS_VISIBLE, // 親ウィンドウがないと動かない
				      // WS_POPUP | WS_VISIBLE,
				      WS_OVERLAPPEDWINDOW | WS_VISIBLE,
				      0, 0, WIDTH, HEIGHT,
				      0, // 親ウィンドウ
				      0);
	if(hWnd == NULL) {
		return FALSE;
	}
	
	char name[256], version[256];
	WORD driver = 0;
	if(!capGetDriverDescription(driver, name, 256, version, 256)) {
		fprintf(stderr, "can not get driver description\n");
		return FALSE;
	}
	fprintf(stderr, "VfW driver name: %s\n", name);
	fprintf(stderr, " version : %s\n", version);
	
	if(!capDriverConnect(hWnd, driver)) {
		hWnd = NULL;
		fprintf(stderr, "can not connect\n");
		return FALSE;
	}
	fprintf(stderr, "connected\n");
	
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

	BITMAPINFO bmi;
	memset(&bmi, 0, sizeof(BITMAPINFO));
	bmi.bmiHeader.biSize = sizeof(BITMAPINFOHEADER);
	bmi.bmiHeader.biWidth = WIDTH;
	bmi.bmiHeader.biHeight = HEIGHT;
	bmi.bmiHeader.biPlanes = 1;
	bmi.bmiHeader.biBitCount = 24;
	bmi.bmiHeader.biCompression = BI_RGB;
	if(!capSetVideoFormat(hWnd, &bmi, sizeof(BITMAPINFO))) {
		fprintf(stderr, "%s: %d: cannot set video format\n", __FILE__, __LINE__);
		return FALSE;
	}
	fprintf(stderr, "set video capture format\n");

	capGrabFrame(hWnd);

	//capPreviewRate( hWnd, 1 );			//プレビューレートの設定
	//capPreview( hWnd, TRUE );

	//capOverlay( hWnd, TRUE );    //	オーバーレイモードで動作

	//ShowWindowAsync( hWnd, SW_SHOW );
	//ShowWindow(hWnd, SW_SHOW);

	// http://cutie.dip.jp/pc/image/3.php の記述を参考に。

	unsigned char *colorBuf;       // バッファを宣言
	colorBuf = (unsigned char *)malloc(WIDTH * HEIGHT * 3);   // メモリ確保

	LPBITMAPINFOHEADER lpInfo;     // BITMAPINFOHEADER構造体のポインタ
	lpInfo = (LPBITMAPINFOHEADER)malloc(sizeof(BITMAPINFOHEADER));  // メモリ確保
	lpInfo->biSize = sizeof(BITMAPINFOHEADER);   // これは決まり文句
	lpInfo->biWidth = WIDTH;    // 画像の幅
	lpInfo->biHeight = HEIGHT;  // 画像の高さ
	lpInfo->biPlanes = 1;          // 1らしい
	lpInfo->biBitCount = 24;       // 1ドットを表すためのビット数
	lpInfo->biCompression = 0;     // 圧縮はなし

	HDC hDC;
	hDC = GetDC(NULL);         // 画面のデバイスコンテキストを取得

	while(1){
		HBITMAP bmHandle;
		BITMAP bmBitmap;
		capGrabFrame(hWnd);	// 1フレームキャプチャ
		
		//capFileSaveDIB(hWnd,"junk.bmp"); これは動くのだが

		capEditCopy(hWnd);	// クリップボードにコピー
		if(IsClipboardFormatAvailable(CF_BITMAP)){ 
			printf("Bitmap Available\n");
			if(OpenClipboard(NULL)){ // これをやらないとクリップボードのデータがとれない!
				bmHandle = (HBITMAP)GetClipboardData(CF_BITMAP);
				if(bmHandle){
					GetObject(bmHandle, sizeof (BITMAP) , (LPSTR)&bmBitmap);
					/*
					printf("bmWidth = %d\n",bmBitmap.bmWidth);
					printf("bmHeight = %d\n",bmBitmap.bmHeight);
					printf("bmType = %x\n",bmBitmap.bmType);
					printf("bmWidthBytes = %x\n",bmBitmap.bmWidthBytes);
					printf("bmPlanes = %x\n",bmBitmap.bmPlanes);
					printf("bmBitsPixel = %x\n",bmBitmap.bmBitsPixel);
					printf("bmBits = %lx\n",bmBitmap.bmBits);
					*/
					GetDIBits(
						  hDC,                       // デバイスコンテキスト（参照）
						  bmHandle,                 // HBITMAP型、ビットマップ（入力）
						  1,                         // データ取得を開始する行（参照）
						  bmBitmap.bmHeight,                 // データを取得する行数（参照）
						  colorBuf,                  // void*型、バッファ（出力）
						  (LPBITMAPINFO)lpInfo,      // 出力形式の指定（参照）
						  DIB_RGB_COLORS             // 今は特に意味ない
						  );
					printf("%x %x %x\n",colorBuf[0],colorBuf[1],colorBuf[2]);
				}
				CloseClipboard();
			}
		}
		UpdateWindow(hWnd);	// これがないと表示されない
	}
	
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
	//_sleep(4000);
	sleep(3);
	ret = vfw_quit();
}
