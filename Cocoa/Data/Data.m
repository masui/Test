//
// Cocoaή�˥ե�������ɤ�Ǥ��ƥХ�����Ȥ��ƽ�������
// 2006/10/18 ����
//
// /tmp/data �Ȥ����Х��ʥ�ե�������ɤ߽Ф���
//


#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    NSData *nsdata = [NSData dataWithContentsOfFile:@"/tmp/data"];
    NSLog(@"%d",[nsdata length]);

    unsigned char *data = malloc([nsdata length]);
    NSCAssert(data != NULL, @"alloc fail"); // �����C�ؿ���Υ���������󡣥᥽�å������NSAssert��Ȥ�
    [nsdata getBytes:data]; // data[]��/tmp/data�����Ƥ����ԡ������

    printf("%c\n",data[2]);

    [pool release];
    return 0;
}
