//
// test3.c�����ƂɁA�Ƃ肠���������悤�ɂ������́B
//
#include <stdio.h>
#include "windows.h"
#include "wingdi.h"

#define NOMMREG
#define NOMSACM

#include "./vfw.h"	// MS VC++���玝���Ă�������

HWND hWnd;

#define WIDTH 320
#define HEIGHT 240

int vfw_init()
{
	hWnd = capCreateCaptureWindow("VfW",
				      // WS_CHILD | WS_VISIBLE, // �e�E�B���h�E���Ȃ��Ɠ����Ȃ�
				      // WS_POPUP | WS_VISIBLE,
				      WS_OVERLAPPEDWINDOW | WS_VISIBLE,
				      0, 0, WIDTH, HEIGHT,
				      0, // �e�E�B���h�E
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

	//capPreviewRate( hWnd, 1 );			//�v���r���[���[�g�̐ݒ�
	//capPreview( hWnd, TRUE );

	//capOverlay( hWnd, TRUE );    //	�I�[�o�[���C���[�h�œ���

	//ShowWindowAsync( hWnd, SW_SHOW );
	//ShowWindow(hWnd, SW_SHOW);

	// http://cutie.dip.jp/pc/image/3.php �̋L�q���Q�l�ɁB

	unsigned char *colorBuf;       // �o�b�t�@��錾
	colorBuf = (unsigned char *)malloc(WIDTH * HEIGHT * 3);   // �������m��

	LPBITMAPINFOHEADER lpInfo;     // BITMAPINFOHEADER�\���̂̃|�C���^
	lpInfo = (LPBITMAPINFOHEADER)malloc(sizeof(BITMAPINFOHEADER));  // �������m��
	lpInfo->biSize = sizeof(BITMAPINFOHEADER);   // ����͌��܂蕶��
	lpInfo->biWidth = WIDTH;    // �摜�̕�
	lpInfo->biHeight = HEIGHT;  // �摜�̍���
	lpInfo->biPlanes = 1;          // 1�炵��
	lpInfo->biBitCount = 24;       // 1�h�b�g��\�����߂̃r�b�g��
	lpInfo->biCompression = 0;     // ���k�͂Ȃ�

	HDC hDC;
	hDC = GetDC(NULL);         // ��ʂ̃f�o�C�X�R���e�L�X�g���擾

	while(1){
		HBITMAP bmHandle;
		BITMAP bmBitmap;
		capGrabFrame(hWnd);	// 1�t���[���L���v�`��
		
		//capFileSaveDIB(hWnd,"junk.bmp"); ����͓����̂���

		capEditCopy(hWnd);	// �N���b�v�{�[�h�ɃR�s�[
		if(IsClipboardFormatAvailable(CF_BITMAP)){ 
			printf("Bitmap Available\n");
			if(OpenClipboard(NULL)){ // ��������Ȃ��ƃN���b�v�{�[�h�̃f�[�^���Ƃ�Ȃ�!
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
						  hDC,                       // �f�o�C�X�R���e�L�X�g�i�Q�Ɓj
						  bmHandle,                 // HBITMAP�^�A�r�b�g�}�b�v�i���́j
						  1,                         // �f�[�^�擾���J�n����s�i�Q�Ɓj
						  bmBitmap.bmHeight,                 // �f�[�^���擾����s���i�Q�Ɓj
						  colorBuf,                  // void*�^�A�o�b�t�@�i�o�́j
						  (LPBITMAPINFO)lpInfo,      // �o�͌`���̎w��i�Q�Ɓj
						  DIB_RGB_COLORS             // ���͓��ɈӖ��Ȃ�
						  );
					printf("%x %x %x\n",colorBuf[0],colorBuf[1],colorBuf[2]);
				}
				CloseClipboard();
			}
		}
		UpdateWindow(hWnd);	// ���ꂪ�Ȃ��ƕ\������Ȃ�
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
