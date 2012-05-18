//
// Video for Windows���g�����J�����L���v�`��
//
// $Date: 2004/07/15 07:32:29 $
// $Revision: 1.3 $
//

#include <stdio.h>
#include "windows.h"
#include "wingdi.h"

#define USE_CLIPBOARD
#undef  USE_CALLBACK

#define NOMMREG		// vfw.h�̕s�v�����g��Ȃ��悤�ɂ��邽��
#define NOMSACM		// vfw.h�̕s�v�����g��Ȃ��悤�ɂ��邽��
#include "./vfw.h"	// MS VC++���玝���Ă�������

#include "camera.h"

static HWND hWnd;
static LPBITMAPINFOHEADER lpInfo;     // BITMAPINFOHEADER�\���̂̃|�C���^

static int camera_width = 0, camera_height = 0;
static unsigned char *camera_buf;

int camera_open(int width, int height)
{
	camera_width = width;
	camera_height = height;
	camera_buf = (unsigned char*)malloc(width*height*3);

	hWnd = capCreateCaptureWindow("VfW",
				      // WS_OVERLAPPEDWINDOW | WS_VISIBLE, // �\������
				      WS_OVERLAPPEDWINDOW, // �\�����Ȃ�
				      0, 0, width, height,
				      0, // �e�E�B���h�E
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
       
	lpInfo = (LPBITMAPINFOHEADER)malloc(sizeof(BITMAPINFOHEADER));  // �������m��
	lpInfo->biSize = sizeof(BITMAPINFOHEADER);   // ����͌��܂蕶��
	lpInfo->biWidth = camera_width;    // �摜�̕�
	lpInfo->biHeight = camera_height;  // �摜�̍���
	lpInfo->biPlanes = 1;          // 1�炵��
	lpInfo->biBitCount = 24;       // 1�h�b�g��\�����߂̃r�b�g��
	lpInfo->biCompression = 0;     // ���k�͂Ȃ�

	return TRUE;
}

#ifdef USE_CLIPBOARD
// �N���b�v�{�[�h�𗘗p���ăf�[�^�擾�����
int camera_capture(unsigned long *buf)
{
	HDC hDC;
	hDC = GetDC(NULL);         // ��ʂ̃f�o�C�X�R���e�L�X�g���擾

	HBITMAP bmHandle;
	BITMAP bmBitmap;

	capGrabFrame(hWnd);	// 1�t���[���L���v�`��
	capEditCopy(hWnd);	// �N���b�v�{�[�h�ɃR�s�[
	if(IsClipboardFormatAvailable(CF_BITMAP)){ 
		if(OpenClipboard(NULL)){ // ��������Ȃ��ƃN���b�v�{�[�h�̃f�[�^���Ƃ�Ȃ�!
			bmHandle = (HBITMAP)GetClipboardData(CF_BITMAP);
			GetObject(bmHandle, sizeof (BITMAP) , (LPSTR)&bmBitmap);
			GetDIBits(
				  hDC,                   // �f�o�C�X�R���e�L�X�g�i�Q�Ɓj
				  bmHandle,              // HBITMAP�^�A�r�b�g�}�b�v�i���́j
				  1,                     // �f�[�^�擾���J�n����s�i�Q�Ɓj
				  bmBitmap.bmHeight,     // �f�[�^���擾����s���i�Q�Ɓj
				  camera_buf,            // void*�^�A�o�b�t�@�i�o�́j
				  (LPBITMAPINFO)lpInfo,  // �o�͌`���̎w��i�Q�Ɓj
				  DIB_RGB_COLORS         // ���͓��ɈӖ��Ȃ�
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
	UpdateWindow(hWnd);	// ���ꂪ�Ȃ��ƕ\������Ȃ�
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
	buf = malloc(WIDTH * HEIGHT * sizeof(long));   // �������m��
	camera_open(WIDTH,HEIGHT);
	while(1){
		camera_capture(buf);
		printf("%x %x %x\n",buf[0],buf[1],buf[2],buf[3]);
	}
	camera_close();
}
#endif


